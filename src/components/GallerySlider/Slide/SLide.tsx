import { useDispatch } from 'react-redux';
import { setDefaultPopupProps, setOpenDefaultPopup } from '../../../redux/actions/mint';
import DefaultButton from '../../DefaultButton';

import styles from './Slide.module.scss';

interface Props {
    title: string;
    image: string;
    paint: number;
}

const Slide: React.FC<Props> = ({ title, image, paint }) => {
    const dispatch = useDispatch();

    const claim = async () => {
        dispatch(setOpenDefaultPopup(true));
        dispatch(setDefaultPopupProps({
            title: `Claim  ${title}?`,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cancelText: 'Cancel',
            approveText: 'Claim',
            approve: () => dispatch(setOpenDefaultPopup(false))
        }));
    };

    const claimUnstake = async () => {
        dispatch(setOpenDefaultPopup(true));
        dispatch(setDefaultPopupProps({
            title: `Claim and Unstake ${title}?`,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cancelText: 'Cancel',
            approveText: 'Claim & Unstake',
            approve: () => dispatch(setOpenDefaultPopup(false))
        }));
    };
    return (
        <div className={styles.slide}>
            <div className={styles.slide_img_wrap}><img className={styles.slide_img} src={image} alt='slide' /></div>
            <h3 className={styles.slide_title}>{title}</h3>
            <p className={styles.paint}>$PAINT collected: {paint}</p>
            <div className={styles.buttons_wrap}>
                <DefaultButton
                    className='no_wide_text_small m_05'
                    title='Claim & Unstake'
                    onClick={claimUnstake}
                />
                <DefaultButton
                    className='no_wide_primary_small m_05'
                    title='Claim'
                    onClick={claim}
                />
            </div>
        </div>
    )
}

export default Slide