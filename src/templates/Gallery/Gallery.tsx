import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import Header from '../../components/Header';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import DefaultPopup from '../../components/Popups/DefaultPopup';

import { RootState } from '../../redux/reducers';
import { setDefaultPopupProps, setOpenDefaultPopup } from '../../redux/actions/mint';

import styles from './Gallery.module.scss';
import GallerySlider from '../../components/GallerySlider';

const Gallery: React.FC = () => {
    const dispatch = useDispatch();
    const nightModeMint = useSelector(
        (state: RootState) => state?.mintReducer.nightMode
    );
    const openDefaultPopup = useSelector(
        (state: RootState) => state?.mintReducer.openDefaultPopup
    );
    const [nightMode, setNightMode] = useState<boolean>(nightModeMint);
    const [claimValue, setClaimValue] = useState<number | null>(null);
    const [defaultPopup, setDefaultPopup] = useState<boolean>(false);

    useEffect(() => {
        setNightMode(nightModeMint);
    }, [nightModeMint]);

    useEffect(() => {
        setDefaultPopup(openDefaultPopup);
    }, [openDefaultPopup]);


    const claim = async () => {
        dispatch(setOpenDefaultPopup(true));
        dispatch(setDefaultPopupProps({
            title: `Claim ${claimValue} $paints?`,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cancelText: 'Cancel',
            approveText: 'Claim all',
            approve: () => dispatch(setOpenDefaultPopup(false))
        }));
    };

    const claimAll = async () => {
        dispatch(setOpenDefaultPopup(true));
        dispatch(setDefaultPopupProps({
            title: `Claim all $paints?`,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cancelText: 'Cancel',
            approveText: 'Claim all',
            approve: () => dispatch(setOpenDefaultPopup(false))
        }));
    };

    const getClaimValue = (e: { target: { value: string | number; }; }) => {
        let value = +e?.target?.value > 0 ? +e?.target?.value : +e?.target?.value * -1;
        setClaimValue(value);
    }

    return (
        <>
            <Header />
            <div className={cn('content', nightMode && 'night')}>
                <div className={styles.wrapper}>
                    <div className={styles.claim_form_wrap}>
                        <div className={styles.claim_form}>
                            <h3 className={styles.claim_form_title}>Your claim</h3>
                            <div className={styles.claim_form_content}>
                                <div className={styles.form_input_wrap}>
                                    <div className={styles.form_available}>
                                        <p className={styles.form_available_value}>22 012</p>
                                        <span className={styles.form_available_hint}>$PAINT AVAILABLE TO CLAIM</span>
                                    </div>
                                    <DefaultInput
                                        type='number'
                                        value={claimValue?.toString() || ''}
                                        onChange={(e) => getClaimValue(e)}
                                        placeholder="Enter number to claim" />
                                </div>
                                <div className={styles.form_buttons_wrap}>
                                    <DefaultButton
                                        className='no_wide_primary_small m_zero'
                                        title={'Claim all'}
                                        onClick={claimAll}
                                    />
                                    <DefaultButton
                                        disabled={!claimValue}
                                        className='no_wide_primary_small m_bottom_05'
                                        title={'Claim'}
                                        onClick={claim}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <GallerySlider />
                </div>
            </div>
            {defaultPopup && <DefaultPopup />}
        </>
    )
}

export default Gallery;