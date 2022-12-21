import React, {useContext} from 'react';
import modalStyles from "../../../assets/scss/modal.module.scss";
import {Context} from "../../../store";
import usdcImg from "../../../assets/img/tokens/usdc.png";
import usdtImg from "../../../assets/img/tokens/usdt.png";
import busdImg from "../../../assets/img/tokens/busd.png";
import daiImg from "../../../assets/img/tokens/dai.png";
import xusdImg from "../../../assets/img/tokens/xusd.png";
import docImg from "../../../assets/img/tokens/doc.png";

const FormTokens = ({selectedToken, setSelectedToken}) => {
    const [{user}] = useContext(Context);

    const availableTokens = () => {
        switch (user?.provider) {
            case 1:
            case 3:
            case 4:
            case 5:
                return [
                    {
                        img: usdcImg,
                        name: "USDC"
                    },
                    {
                        img: usdtImg,
                        name: "USDT"
                    },
                    {
                        img: busdImg,
                        name: "BUSD"
                    },
                    {
                        img: daiImg,
                        name: "DAI"
                    },
                ];

            case 137:
            case 80001:
                return [
                    {
                        img: usdcImg,
                        name: "USDC"
                    },
                    {
                        img: usdtImg,
                        name: "USDT"
                    },
                ];

            case 30:
            case 31:
                return [
                    {
                        img: xusdImg,
                        name: "XUSD"
                    },
                    {
                        img: docImg,
                        name: "DOC"
                    },
                ];

            case 56:
            case 97:
                return [
                    {
                        img: usdcImg,
                        name: "USDC"
                    },
                    {
                        img: usdtImg,
                        name: "USDT"
                    },
                    {
                        img: busdImg,
                        name: "BUSD"
                    },
                ];

            case 43114:
            case 43113:
                return [
                    {
                        img: usdcImg,
                        name: "USDC"
                    },
                    {
                        img: usdtImg,
                        name: "USDT"
                    },
                ];

            default:
                return [];
        }
    }

    return (
        <div className={modalStyles.upload_modal_choose_token}>
            <span>Choose Token: </span>
            <div className={modalStyles.upload_modal_choose_token_list}>
                {
                    availableTokens()?.map((token, key) => {
                        return (
                            <div
                                className={`${modalStyles.upload_modal_choose_token_list_item} ${selectedToken === token?.name ? modalStyles.active : ""}`}
                                onClick={() => setSelectedToken(token?.name)}
                                key={key}
                            >
                                <img src={token?.img} alt=""/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default FormTokens;