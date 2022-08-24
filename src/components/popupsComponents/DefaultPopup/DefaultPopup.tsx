import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import DefaultButton from '../../DefaultButton';
import { DefaultPopupProps } from '../../../redux/types/data';
import { setOpenDefaultPopup } from '../../../redux/actions/mint';
import { AppDispatch } from '../../../redux/store';
import { RootState } from '../../../redux/reducers';

import styles from './DefaultPopup.module.scss';

const DefaultPopup: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const defaultPopupProps = useSelector(
        (state: RootState) => state?.mintReducer.defaultPopupProps
    );
    const [popupProps, setPopupProps] = useState<DefaultPopupProps>(defaultPopupProps);

    useEffect(() => {
        setPopupProps(defaultPopupProps);
    }, [defaultPopupProps]);

    const close = () => {
        dispatch(setOpenDefaultPopup(false));
    };

    return (
        <>
            {popupProps && (
                <div className={cn('overlay')} onClick={close}>
                    <div className={cn('popup-content', styles.popup)} onClick={e => e.stopPropagation()}>
                        <h3 className={styles.popup_title}>{popupProps.title}</h3>
                        {popupProps.desc && <p className={styles.popup_desc}>{popupProps.desc}</p>}
                        <div className={styles.buttons_wrap}>
                            <DefaultButton
                                className={popupProps.cancelClass || 'no_wide_text_small'}
                                title={popupProps.cancelText}
                                onClick={close}
                            />
                            <DefaultButton
                                className={popupProps.approveClass || 'no_wide_text_small'}
                                title={popupProps.approveText}
                                onClick={popupProps.approve}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DefaultPopup;