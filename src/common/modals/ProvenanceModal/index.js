import React from 'react';
import ModalCustom from "../../ModalCustom";
import Provenance from "./Provenance";

const ProvenanceModal = ({isOpen, onRequestClose, callback}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <Provenance
                onRequestClose={onRequestClose}
                callback={callback}
            />
        </ModalCustom>
    );
};

export default ProvenanceModal;