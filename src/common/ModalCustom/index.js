import React, {useEffect} from 'react';
import Modal from 'react-modal';
import defaultModalStyles from "./defaultModalStyles.styles";

const ModalCustom = ({children, isOpen, onRequestClose, style = defaultModalStyles}) => {
    useEffect(() => {
        Modal.setAppElement('body')
    }, [])

    return (
        <Modal style={style} isOpen={isOpen} onRequestClose={onRequestClose}>
            {children}
        </Modal>
    );
};

export default ModalCustom;