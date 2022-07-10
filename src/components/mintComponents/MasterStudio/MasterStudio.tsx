import cn from 'classnames';
import { useParallax } from 'react-scroll-parallax';

import icons from '../../../constants/icons';

import styles from './MasterStudio.module.scss';
import { motion } from 'framer-motion';

const MasterStudio: React.FC = () => {
    const parallaxList = useParallax<HTMLDivElement>({
        easing: 'ease',
        translateX: [50, -50],
    });

    return (
        <div className={cn('mint-wrapper', styles.master_studio)}>
            <h3 className={cn('mint-title', styles.title)}>
                <span className='title-span'>Master the Studio</span>
            </h3>
            <motion.div
                className={styles.image_wrap}
                animate={{ translateY: [0, 20, 0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}>
                <img className={styles.image} src={icons.FlyingGirl} alt='FlyingGirl' />
            </motion.div>
            <div ref={parallaxList.ref}>
                <ul className={styles.clouds_list}>
                    <li className={styles.clouds_item}>draw</li>
                    <li className={styles.clouds_item}>mint</li>
                    <li className={styles.clouds_item}>stake</li>
                </ul>
            </div>
        </div>
    );
};

export default MasterStudio;
