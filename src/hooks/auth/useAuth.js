import AuthApi from "../../utils/api/AuthApi";
import { useContext } from "react";
import { Context } from "../../store";
import { localStorageRemove } from "../../utils/localStorage";

export default function useAuth() {
  const [, ACTION] = useContext(Context);

  const logout = () => {
    new AuthApi().logout().then((res) => {
      if (res?.status) {
        localStorageRemove("token");
        ACTION.SET_USER(null);
      }
    });
  };

  return {
    logout,
  };
}
