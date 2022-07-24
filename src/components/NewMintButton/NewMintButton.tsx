import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultButton from "../DefaultButton";
import { contractDrawl, getAllDrawls, setDrawl } from "../../redux/actions/drawl";
import { RootState } from "../../redux/reducers";
import { AppDispatch } from "../../redux/store";
import { dataUrlToFile, FORMATS, WATERMARK } from "../../constants/data";

interface Props {
    className?: string;
}

const NewMintButton: React.FC<Props> = ({ className = 'no_wide_primary_large' }) => {
    const dispatch = useDispatch<AppDispatch>();

    const drawls = useSelector(
        (state: RootState) => state?.drawlReducer.drawls
    );

    const [drawlsList, setDrawlsList] = useState(drawls);

    useEffect(() => {
        dispatch(getAllDrawls())
    }, [dispatch])

    useEffect(() => {
        setDrawlsList(drawls);
    }, [drawls]);

    const mintCanvas = async () => {
        const name = `Drawl #${drawlsList?.length + 1}`
        const imgFile: File = await dataUrlToFile(WATERMARK, 'watermark', 'image/png');
        const data = {
            name: name,
            format: FORMATS.RECTANGLE,
            image: imgFile
        }
        dispatch(setDrawl(data))
            .then(() => {
                contractDrawl();
            })
    }

    return (
        <DefaultButton
            className={className}
            title='Mint Canvas'
            onClick={mintCanvas}
        />
    )
}

export default NewMintButton