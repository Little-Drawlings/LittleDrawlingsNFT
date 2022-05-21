import { ethers } from "ethers";
import API from '../../api';

export const signIn =
    (data: any) => (dispatch: (arg0: { type: string; data: string | boolean }) => void) => {
        return API.post('/auth/login', data)
            .then(async (response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    };
