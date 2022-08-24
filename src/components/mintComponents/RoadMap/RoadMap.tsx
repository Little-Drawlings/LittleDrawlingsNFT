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
                    <h3 className={styles.phase_title}>Phase 1 MVP</h3>
                    <ul className={styles.phase_list}>
                        <li className={styles.phase_item}>
                            The Artist EnDAOment will vote on and work alongside the Little Drawlings core team concerning further development with initial focus on three pillars of improvement
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cn(styles.phase_wrap, styles.column)}>
                <h3 className={styles.phase_title}>Phase 2</h3>
                <ul className={styles.phase_list}>
                    <li className={styles.phase_item}>
                        Artboard upgrades
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
                <div className={cn(styles.text_wrap, styles.wrap_start)}>
                    <h3 className={styles.phase_title}>Phase 3</h3>
                    <ul className={styles.phase_list}>
                        <li className={styles.phase_item}>
                            Further decentralization
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.phase_wrap}>
                <div className={styles.text_wrap}>
                    <h3 className={styles.phase_title}>Phase 4</h3>
                    <ul className={styles.phase_list}>
                        <li className={styles.phase_item}>Studio game additions</li>
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
