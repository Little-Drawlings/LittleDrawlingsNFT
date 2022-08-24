import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { signInMetamask } from '../../../redux/actions/auth';
import { getBalance } from '../../../redux/actions/mint';
import { AppDispatch } from '../../../redux/store';
import icons from '../../../constants/icons';
import DefaultButton from '../../DefaultButton';

import styles from './CautionPopup.module.scss';

const CautionPopup: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const [opened, setOpened] = useState<boolean>(false);

    useEffect(() => {
        const openedPopup = !!localStorage.getItem('@caution-viewed');
        setOpened(openedPopup);
    }, []);

    const signIn = () => {
        localStorage.setItem('@caution-viewed', 'true');
        setOpened(true);
        dispatch(signInMetamask()).then(() => {
            dispatch(getBalance());
        });
    };

    return (
        <>
            {!opened && (
                <div className={cn('overlay')}>
                    <div className={cn('popup-content', styles.popup)}>
                        <div className={styles.popup_header}>
                            <img
                                className={styles.popup_header_logo}
                                src={icons.Logo}
                                alt='Logo'
                            />
                            <h3 className={styles.popup_header_title}>Caution</h3>
                        </div>
                        <p className={styles.popup_text}>
                            <span className={styles.bold}>
                                Little Drawlings is an experimental project
                            </span>
                            featuring non-fungible tokens (NFTs) utilizing the mutable IPNS
                            (InterPlanetary Name System) protocol within the IPFS
                            (InterPlanetary File System) Peer-to-Peer (P2P){' '}
                            <span className={styles.bold}>public</span> file sharing network.
                            Under no circumstances have the owners of this website or it’s
                            developers any liability to any person or entity for any loss or
                            damages caused by operations on this website.
                        </p>
                        <p className={styles.popup_text}>
                            There is a minimum donation to mint and recieve a Mutable Canvas
                            NFT into your Web3.0 wallet. Always double check the amount input
                            in your transaction while minting.{' '}
                            <span className={styles.bold}>
                                Only you are responsible for any loss of funds.
                            </span>
                        </p>
                        <p className={styles.popup_text}>
                            We strongly suggest you visit and review our{' '}
                            <a
                                href='https://littledrawlings.gitbook.io'
                                target='_blank'
                                rel='noreferrer'>
                                Litepaper
                            </a>{' '}
                            before making any financial decisions/donations.
                        </p>
                        <p className={styles.popup_text}>
                            Any and every blockchain interaction and/or any interaction on
                            this website (especially with the Artboard) and thereby the
                            InterPlanetary File System is intended to and will be considered
                            public.{' '}
                            <span className={styles.bold}>
                                No rights are assumed by or granted to any user.
                            </span>
                        </p>
                        <p className={styles.popup_text}>
                            <span className={styles.bold}>
                                Under no circumstances have the owners of this website or it’s
                                developers any liability to any person or entity for any loss or
                                damages caused by operations on this website.
                            </span>
                        </p>

                        <p className={styles.caution_prompt}>
                            By continuing to use this website I acknowledge the risks
                            associated with experimental technologies and recognize the public
                            nature and implications of my continued interaction with this
                            domain, the InterPlanetary File System, and distributed ledger
                            technology.
                        </p>
                        <div className={styles.button_wrap}>
                            <DefaultButton
                                className='no_wide_primary_small'
                                title='I Understand'
                                onClick={signIn}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CautionPopup;
