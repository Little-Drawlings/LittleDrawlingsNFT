import cn from 'classnames';
import icons from '../../../constants/icons';

import styles from './WaitPopup.module.scss';

const WaitPopup: React.FC = () => {

    const close = () => {
        return
    }

    return (
        <div className={cn('overlay', styles.wait_popup_overlay)} onClick={close}>
            <div className={cn('popup-content', styles.wait_popup)} onClick={e => e.stopPropagation()}>
                <img className={styles.popup_img} src={icons.Time} alt="Time" />
                <p className={styles.popup_text}>Please wait up to 3 minutes for the upload to complete.
                    Your wallet will ask for your signature on the next screen.
                    Thank you for your patience.</p>
            </div>
        </div>
    )
}

export default WaitPopup;