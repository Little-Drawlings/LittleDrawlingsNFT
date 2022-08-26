import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Option } from "react-dropdown";
import cn from "classnames";

import Header from "../../components/headerComponents/Header";
import Drawl from "../../components/Drawl";
import DefaultDropdown from "../../components/DefaultDropdown";
import { RootState } from "../../redux/reducers";
import {
	getAllDrawls,
	getContractData,
	getDrawl,
} from "../../redux/actions/drawl";
import { AppDispatch } from "../../redux/store";
import { IDrawl } from "../../redux/types/reducers";
import { DRAWLS_SORT_VALUES } from "../../constants/data";
import { setOverMint } from "../../redux/actions/mint";
import NewMintButton from "../../components/NewMintButton";
import { ethers } from "ethers";

import styles from "./Studio.module.scss";

const Studio: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);
	const drawlsList = useSelector(
		(state: RootState) => state?.drawlReducer.drawls
	);
	const metaMaskData = useSelector(
		(state: RootState) => state?.authReducer.metaMaskData
	);

	const [nightMode, setNightMode] = useState<boolean>(false);
	const [drawls, setDrawls] = useState<IDrawl[] | any[]>([]);
	const [contractData, setContractData] = useState<{
		abi: any;
		address: string;
	}>({ abi: {}, address: "" });
	const [, setDropdown] = useState<string>("");
	const [address, setAddress] = useState<string>("");

	useEffect(() => {
		if (metaMaskData) {
			setAddress(metaMaskData.user?.publicAddress);
		}
	}, [metaMaskData]);

	useEffect(() => {
		dispatch(getAllDrawls());
		getContractData().then((res) => {
			setContractData(res);
		});
	}, [dispatch]);

	useEffect(() => {
		const getDrawlData = async () => {
			let drawlData = await Promise.all(drawlsList.map(async drawl => {
				const tokenId = drawl?.tokenId;
				if (tokenId) {
					const owner = await getDrawlOwner(tokenId);
					return address?.toString()?.toLowerCase() === owner?.toString()?.toLowerCase() ? drawl : null
				}
				else {
					return null
				}
			}));
			drawlData = drawlData?.filter(Boolean)
			setDrawls(drawlData);
		}
		getDrawlData();

	}, [address, drawlsList]);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	const getDrawlOwner = async (tokenId?: string) => {
		if (!contractData?.address || !tokenId?.length) {
			return;
		}
		const w: any = window;
		const provider = new ethers.providers.Web3Provider(w.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			contractData.address,
			contractData.abi,
			signer
		);
		return await contract.ownerOf(tokenId);
	};

	const sortDrawls = (option: Option) => {
		setDropdown(option.value);
		drawls.sort((a, b) => {
			const d1 = new Date(a.updatedAt || "").getTime();
			const d2 = new Date(b.updatedAt || "").getTime();
			return option.value === "old" ? d1 - d2 : d2 - d1;
		});
	};

	const openCanvas = (id?: string) => {
		if (id) {
			dispatch(setOverMint(false));
			dispatch(getDrawl(id)).then((res: any) => {
				if (res) {
					navigate("/studio/canvas");
				}
			});
		}
	};

	return (
		<>
			<Header />
			<div className={cn("content", nightMode && "night")}>
				<div className={styles.filters_wrap}>
					<DefaultDropdown
						options={DRAWLS_SORT_VALUES}
						placeholder="Sort by"
						onChange={(e) => sortDrawls(e)}
					/>
					<NewMintButton className="wide_primary_small" />
				</div>
				<div className={styles.nft_list}>
					{drawls?.length
						? drawls.map((drawl, key) => (
							<Drawl
								key={key}
								image={drawl.image || ""}
								title={drawl.name || ""}
								size={drawl.format}
								edited={drawl.updatedAt || ""}
								onClick={() => openCanvas(drawl._id)}
							/>
						))
						: null}
				</div>
			</div>
		</>
	);
};
export default Studio;
