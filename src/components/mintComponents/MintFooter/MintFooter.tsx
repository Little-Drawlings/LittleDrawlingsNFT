import cn from 'classnames';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import icons from '../../../constants/icons';

import styles from './MintFooter.module.scss';

const MintFooter: React.FC = () => {
    const [ref, view] = useInView({
        threshold: 0.5,
        triggerOnce: false,
    });

    const variants = {
        visible: { top: '-82%' },
        hidden: { top: '-90%' }
    };

    return (
        <footer className={cn('mint-wrapper', 'mint-height_auto', styles.mint_footer)} >
            <motion.img className={styles.parallax_bg} src={icons.ParallaxPlan2} alt="Parallax2" animate={view ? 'visible' : 'hidden'}
                transition={{ duration: 2, ease: 'easeOut' }}
                variants={variants} />
            <motion.div ref={ref}>
                <img className={styles.footer_bg} src={icons.ParallaxPlan1} alt="Parallax1" />
            </motion.div>
        </footer>
    )
}

export default MintFooter;