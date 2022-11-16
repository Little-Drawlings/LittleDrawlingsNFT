import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '../DefaultButton';
import {
    contractDrawl, deleteDrawl,
    getAllDrawls,
    getContractData,
} from '../../redux/actions/drawl';
import { RootState } from '../../redux/reducers';
import { AppDispatch } from '../../redux/store';
import { dataUrlToFile, FORMATS, WATERMARK } from '../../constants/data';
import { signInMetamask } from '../../redux/actions/auth';
import {getBalance, setLoading} from '../../redux/actions/mint';
import Api from "../../api";

interface Props {
    className?: string;
}

const NewMintButton: React.FC<Props> = ({
    className = 'no_wide_primary_large',
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const metaMaskData = useSelector(
        (state: RootState) => state?.authReducer.metaMaskData
    );

    const drawls = useSelector((state: RootState) => state?.drawlReducer.drawls);

    const [address, setAddress] = useState<string>("");
    const [drawlsList, setDrawlsList] = useState(drawls);


    useEffect(() => {
        if (metaMaskData) {
            setAddress(metaMaskData.user?.publicAddress);
        }
    }, [metaMaskData]);

    useEffect(() => {
        if (address) {
            getContractData().then((res) => {
                dispatch(getAllDrawls(res, address));

            });
        }
    }, [address, dispatch]);

    useEffect(() => {
        setDrawlsList(drawls);
    }, [drawls]);

    const mintCanvas = async () => {
        if (!metaMaskData) {
            connect();
        }
        else {
            dispatch(setLoading(true));
            const name = `Drawl #${drawlsList?.length + 1}`;
            const imgFile: File = await dataUrlToFile(
                WATERMARK,
                'watermark',
                'image/png'
            );
            let data = {
                name: name,
                format: FORMATS.RECTANGLE,
                image: imgFile,
            };


            const formData = new FormData();
            for (let key in data) {
                // @ts-ignore
                formData.append(key, data[key]);
            }

            const createdItem = await Api.post("/drawl", formData)
                .then(res => {
                    if (!res?.data?.status) return null
                    return res?.data?.data
                })

            if (!createdItem) {
                dispatch(setLoading(false));
                return;
            }

            dispatch(contractDrawl(createdItem)).then(async (tx: any) => {
                if (!tx) {
                    await deleteDrawl(createdItem?._id)
                    dispatch(setLoading(false));
                    return;
                }

                await Api.post("drawl/confirmCreate", {...createdItem, tokenId: tx._hex});
                await getContractData().then((res) => {
                    dispatch(getAllDrawls(res, address));

                });
                dispatch(setLoading(false));
            })
        }
    };

    const connect = () => {
        dispatch(signInMetamask()).then(() => {
            dispatch(getBalance());
        });
    };

    return (
        <DefaultButton
            className={className}
            title='Mint Canvas'
            onClick={mintCanvas}
        />
    );
};

export default NewMintButton;
