import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cn from 'classnames';

import { getDrawl } from "../../../redux/actions/drawl";
import { setOpenDrawPopup, setTimeMint } from "../../../redux/actions/mint";
import { RootState } from "../../../redux/reducers";
import { AppDispatch } from "../../../redux/store";
import DefaultButton from "../../DefaultButton";
import icons from "../../../constants/icons";

import styles from './Welcome.module.scss';

const Welcome: React.FC = () => {
    const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

    const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);
    const [nightMode, setNightMode] = useState<boolean>(false);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

    const mintCanvas = () => {
		dispatch(getDrawl(''));
		dispatch(setOpenDrawPopup(true));
        dispatch(setTimeMint(1200));
		navigate('/studio/canvas')
	}

    return (
        <div className={cn('mint-wrapper', styles.welcome)}>
            <div className={styles.title_wrap}>
                <div className={cn(styles.welcome_image_wrap ,styles.animated, nightMode && styles.fade_in)}>
                    <h3 className={styles.title}><span className='title-span'>Welcome to</span></h3>
                    <img className={styles.welcome_image} src={icons.WelcomeImg} alt='Welcome' />
                </div>
                <DefaultButton
                    className='no_wide_primary_large'
                    title='Mint Canvas'
                    onClick={mintCanvas}
                />
                <img className={styles.welcome_image} src={icons.Banner} alt="Banner" />
            </div>
            <div className={cn(styles.left_images, styles.fade_in, nightMode && styles.active)}>
                <img className={cn(styles.left_img)} src={icons.AdamImg} alt='Adam' />
            </div>
            <div className={cn(styles.right_images, styles.fade_in, nightMode && styles.active)}>
                <img
                    className={styles.right_img}
                    src={icons.GodImg}
                    alt='God'
                />
            </div>
        </div>
    )
}

export default Welcome;