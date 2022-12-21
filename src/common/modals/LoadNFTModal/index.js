import React from 'react';
import ModalCustom from "../../ModalCustom";
import LoadNFT from "./LoadNFT";

const CreatePFPModal = ({isOpen, onRequestClose, callback}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <LoadNFT
                onRequestClose={onRequestClose}
                callback={callback}
            />
        </ModalCustom>
    );
};

export default CreatePFPModal;