import React, {useContext, useEffect} from 'react';
import {Context} from "../store";
import useHandleUser from "./user/useHandleUser";
import useHandleWeb3 from "./web3/useHandleWeb3";
import useAuth from "./auth/useAuth";

const useInitFirstLoad = () => {
    const [{ user }] = useContext(Context);
    const handleUser = useHandleUser()
    const handleWeb3 = useHandleWeb3()
    const auth = useAuth()

    const initUser = async () => {
        if (!user?._id) await handleUser.fetch()
    };
    const initWeb3 = async () => await handleWeb3.loadWeb3(auth.logout);

    useEffect( () => {
        initUser()
    }, [])

    useEffect( () => {
        if (user) initWeb3()
    }, [user])



};

export default useInitFirstLoad;