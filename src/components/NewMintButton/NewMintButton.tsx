import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '../DefaultButton';
import {
    contractDrawl,
    getAllDrawls,
    getContractData,
    setDrawl,
} from '../../redux/actions/drawl';
import { RootState } from '../../redux/reducers';
import { AppDispatch } from '../../redux/store';
import { dataUrlToFile, FORMATS, WATERMARK } from '../../constants/data';
import { signInMetamask } from '../../redux/actions/auth';
import { getBalance } from '../../redux/actions/mint';

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
                tokenId: ''
            };
            dispatch(contractDrawl('')).then(async (tx: any) => {
                let receipt = await tx.wait();
                const tokenId = receipt?.events[0]?.args?.tokenId?._hex
                data = { ...data, tokenId: tokenId }
                if (receipt && tokenId) {
                    dispatch(setDrawl(data))
                }
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
