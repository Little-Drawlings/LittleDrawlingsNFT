import Base from "./Base";

export default class AuthApi extends Base {
  async login(data) {
    return super.post("auth/login", data);
  }

  async loginMetamask(data) {
    return super.post("auth/login-metamask", data);
  }

  async loginLiquality(data) {
    return super.post("auth/login-liquality", data);
  }

  async logout() {
    if (!super.getToken()) return null;
    return super.post("auth/logout");
  }
}
