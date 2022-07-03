import cn from 'classnames';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import icons from '../../../constants/icons';

import styles from './MasterStudio.module.scss';

const MasterStudio: React.FC = () => {
    const [listRef, listInView] = useInView({
        triggerOnce: false,
    });

    return (
        <div className={cn('mint-wrapper', styles.master_studio)}>
            <motion.h3
                className={cn('mint-title', styles.title)}
                animate={{ translateY: [0, 2, 0, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}>
                <span className='title-span'>Master the Studio</span>
            </motion.h3>
            <motion.div
                className={styles.image_wrap}
                animate={{ translateY: [0, 10, 0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}>
                <img className={styles.image} src={icons.FlyingGirl} alt='FlyingGirl' />
            </motion.div>
            <motion.ul
                className={styles.clouds_list}
                ref={listRef}
                animate={listInView ? { translateX: ['100%', '-100%', '100%', '100%'] } : 'hidden'}
                transition={{ duration: 40, ease: 'backOut' }}>
                <li className={styles.clouds_item}>draw</li>
                <li className={styles.clouds_item}>mint</li>
                <li className={styles.clouds_item}>stake</li>
            </motion.ul>
        </div>
    );
};

export default MasterStudio;
