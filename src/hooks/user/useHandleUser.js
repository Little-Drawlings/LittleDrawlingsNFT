import React, {useContext} from 'react';
import UserApi from "../../utils/api/UserApi";
import {Context} from "../../store";

const useHandleUser = () => {
    const [, ACTION] = useContext(Context);

    const fetch = async () => {
        await new UserApi().get().then((res) => {
            return res?.status ? ACTION.SET_USER(res?.data) : null;
        });
    };

    const getNonce = async (account) => {
        return new UserApi().getNonce(account).then((res) => {
            return res?.status ? res?.data : null;
        });
    };

    return {getNonce, fetch}
};

export default useHandleUser;