import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import icons from '../../../constants/icons';
import { getDrawl } from '../../../redux/actions/drawl';
import { setOpenDrawPopup } from '../../../redux/actions/mint';
import { AppDispatch } from '../../../redux/store';
import DefaultButton from '../../DefaultButton';

import styles from './MintStudio.module.scss';

const MintStudio: React.FC = () => {
    const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

    const mintCanvas = () => {
		dispatch(getDrawl(''));
		dispatch(setOpenDrawPopup(true));
		navigate('/studio/canvas')
	}

    return (
        <div className={cn('mint-wrapper', styles.mint_studio)}>
            <h3 className={cn('mint-title', styles.title)}><span className='title-span'>Studio</span></h3>
            <p className={styles.sub_title}>paint your masterpiece</p>
            <div className={styles.canvas_img_wrap}>
                <img className={styles.canvas_img} src={icons.MintCanvas} alt="MintCanvas" />
            </div>
            <DefaultButton
                    className='no_wide_primary_large'
                    title='Mint Canvas'
                    onClick={mintCanvas}
                />
        </div>
    )
}

export default MintStudio