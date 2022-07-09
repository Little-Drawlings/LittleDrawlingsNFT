import cn from 'classnames';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import icons from '../../../constants/icons';

import styles from './RoadMap.module.scss';

const RoadMap: React.FC = () => {
    const [imageRef1, imageView1] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const [imageRef2, imageView2] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const [imageRef3, imageView3] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const variants = {
        visible: { scale: 1 },
        hidden: {
            scale: 0,
        },
    };

    return (
        <div className={cn('mint-wrapper', 'mint-height_auto', styles.road_map)}>
            <div className={styles.title_wrap}>
                <img src={icons.RoadMap} alt='RoadMap' />
            </div>
            <div className={cn(styles.phase_wrap, styles.first)}>
                <motion.img
                    className={cn(styles.phase_img, styles.end)}
                    src={icons.Phase1}
                    alt='Phase1'
                    ref={imageRef1}
                    animate={imageView1 ? 'visible' : 'hidden'}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    variants={variants}
                />
                <div className={styles.text_wrap}>
                    <h3 className={styles.phase_title}>Phase 1</h3>
                    <ul className={styles.phase_list}>
                        <li className={styles.phase_item}>
                            Canvas dNFT MVP Alpha Mint Access by Donation
                        </li>
                        <li className={styles.phase_item}>
                            Partnership engagement & community exchange fludity optimization
                        </li>
                        <li className={styles.phase_item}>
                            Staking & rewards/Canvas minting
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cn(styles.phase_wrap, styles.column)}>
                <h3 className={styles.phase_title}>Phase 2</h3>
                <ul className={styles.phase_list}>
                    <li className={styles.phase_item}>
                        Initial Mint of Little Drawlings dNfts
                    </li>
                    <li className={styles.phase_item}>
                        Top tier NFT artist contest & charity raffles
                    </li>
                    <li className={styles.phase_item}>
                        dNFT visual attribute and metadata reward boosting upgrades
                    </li>
                </ul>
            </div>
            <div className={cn(styles.phase_wrap, styles.end)}>
                <motion.img
                    className={styles.phase_img}
                    src={icons.Phase2}
                    alt='Phase2'
                    ref={imageRef2}
                    animate={imageView2 ? 'visible' : 'hidden'}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    variants={variants}
                />
                <div className={styles.text_wrap}>
                    <h3 className={styles.phase_title}>Phase 3</h3>
                    <ul className={styles.phase_list}>
                        <li className={styles.phase_item}>
                            Community & Dev Team collaboration of future organization
                            structure
                        </li>
                        <li className={styles.phase_item}>
                            Explore of multi-chain game implementation
                        </li>
                        <li className={styles.phase_item}>Begin DAO development</li>
                        <li className={styles.phase_item}>iOS development begins</li>
                    </ul>
                </div>
            </div>
            <div className={styles.phase_wrap}>
                <div className={styles.text_wrap}>
                    <h3 className={styles.phase_title}>Phase 4</h3>
                    <ul className={styles.phase_list}>
                        <li className={styles.phase_item}>Next Gen NFT drop</li>
                        <li className={styles.phase_item}>Game upgrades/overhaul</li>
                        <li className={styles.phase_item}>
                            DAO tranfer of power; voting begins
                        </li>
                    </ul>
                </div>
                <motion.img
                    className={styles.phase_img}
                    src={icons.Phase3}
                    alt='Phase3'
                    ref={imageRef3}
                    animate={imageView3 ? 'visible' : 'hidden'}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    variants={variants}
                />
            </div>
        </div>
    );
};

export default RoadMap;
