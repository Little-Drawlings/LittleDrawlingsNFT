import cn from 'classnames';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import icons from '../../../constants/icons';

import styles from './MintFooter.module.scss';

const MintFooter: React.FC = () => {
    const [ref, view] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const variants = {
        visible: { top: '-82%' }
    };

    return (
        <div className={cn('mint-wrapper', 'mint-height_auto', styles.mint_footer)} >
            <motion.div className={styles.parallax_bg_wrap} animate={view ? 'visible' : 'hidden'}
                ref={ref}
                transition={{ duration: 2, ease: 'easeOut' }}
                variants={variants}>
                <img className={styles.parallax_bg} src={icons.ParallaxPlan2} alt="Parallax2" />
            </motion.div>
            <img className={styles.footer_bg} src={icons.ParallaxPlan1} alt="Parallax1" />
        </div>
    )
}

export default MintFooter;