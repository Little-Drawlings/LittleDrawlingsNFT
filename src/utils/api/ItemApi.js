import Base from "./Base";

export default class ItemApi extends Base {
    async getAll() {
        if (!super.getToken()) return null;
        return super.get("drawl/getAll");
    }

    async create(data) {
        if (!super.getToken()) return null;
        return super.post("drawl", data);
    }

    async confirm(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/confirmCreate", data);
    }

    async delete(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/delete", data);
    }

    async updateInfo(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/updateInfo", data);
    }

    async updateInfoConfirm(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/updateInfoConfirm", data);
    }

    async updatePhoto(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/updatePhoto", data);
    }

    async updatePhotoConfirm(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/updatePhotoConfirm", data);
    }

    async getContract(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/getContractData", data);
    }

    async getTokenContract(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/getTokenContract", data);
    }

    async changeOwner(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/changeOwner", data);
    }

    async loadItem(data) {
        if (!super.getToken()) return null;
        return super.post("drawl/loadItem", data);
    }
}