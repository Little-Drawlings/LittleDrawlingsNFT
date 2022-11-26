import React, {useEffect, useState} from 'react';
import Header from "./Header";
import useInitFirstLoad from "../../hooks/useInitFirstLoad";
import Loader from "../../common/Loader";
import CautionModal from "../../common/modals/CautionModal";
import {localStorageGet} from "../../utils/localStorage";

const UserLayout = ({children}) => {
    useInitFirstLoad();

    const [isCautionModalOpen, setIsCautionModalOpen] = useState(false)
    const openCautionModalOpen = () => setIsCautionModalOpen(true)
    const closeCautionModalOpen = () => setIsCautionModalOpen(false)

    useEffect(() => {
        const isCaution = localStorageGet("isCautionAgreed", false)

        if (!isCaution) {
            setTimeout(() => openCautionModalOpen(), 2000)
        }

    }, [])

    return (
        <div id="layout" className={`page`}>
            <Header/>
            {children}
            <Loader/>
            <CautionModal
                isOpen={isCautionModalOpen}
                onRequestClose={closeCautionModalOpen}
            />
        </div>
    );
};

export default UserLayout;