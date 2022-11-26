import Base from "./Base";

export default class UserApi extends Base {
    async get() {
        if (!super.getToken()) return null;
        return super.get("user");
    }

    async getNonce(account) {
        return super.get(`user/nonce/${account}`);
    }

    async edit(data) {
        if (!super.getToken()) return null;
        return super.put("user", data);
    }

    async getByID(id) {
        return super.get(`user/${id}`);
    }
}
