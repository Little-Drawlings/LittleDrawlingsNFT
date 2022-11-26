import React from 'react';
import ModalCustom from "../../ModalCustom";
import Caution from "./Caution";

const CautionModal = ({isOpen, onRequestClose}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <Caution onRequestClose={onRequestClose}/>
        </ModalCustom>
    );
};

export default CautionModal;