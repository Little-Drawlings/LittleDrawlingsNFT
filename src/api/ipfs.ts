import { create, IPFSHTTPClient } from 'ipfs-http-client';

let ipfs: IPFSHTTPClient | undefined;
try {
    ipfs = create({
        url: "http://localhost:5001",
    });
} catch (error) {
    ipfs = undefined;
}
export default ipfs