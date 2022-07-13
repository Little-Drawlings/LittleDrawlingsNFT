import cn from 'classnames';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import icons from '../../../constants/icons';
import useWindowDimensions from '../../../constants/useWindowDimensions';

import DefaultAccordion from '../../DefaultAccordion';

import styles from './LetsDraw.module.scss';

const LetsDraw = () => {
    const { width } = useWindowDimensions();
    const [firstAccordionRef, firstAccordionView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const [imageRef, imageView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const leftImageVariants = {
        visible: { x: '-30%', y: 0, scale: 0.5 },
        hidden: {
            x: '80%',
            y: '50%',
            scale: 0.7
        },
    };

    const rightImageVariants = {
        visible: { x: '30%', y: 0, scale: 0.5 },
        hidden: {
            x: '-80%',
            y: '50%',
            scale: 0.7
        },
    };

    const jumpAnimate = () => {
        if (width > 1200) {
            return { translateY: [90, 0, 90] }
        }
        else if (width > 768) {
            return { translateY: [40, 0, 40] }
        }
        else if (width > 480) {
            return { translateY: [20, 0, 20] }
        }
        else {
            return { translateY: [-20, -10, -20] }
        }
    }

    return (
        <div className={cn('mint-wrapper', 'mint-height_auto', styles.mint_draw)}>
            <h3 className={cn('mint-title', styles.title)}>
                <span className='title-span'>Let’s draw</span>
            </h3>
            <div className={styles.accordions_wrap}>
                <motion.div ref={firstAccordionRef}>
                    <DefaultAccordion
                        isDefaultOpen={firstAccordionView}
                        title='Stake'
                        text='Stake your NFTs in the Studio to access the Artboard and compete in mini games!'
                        icon={<img src={icons.AccStake} alt='AccStake' />}
                    />
                </motion.div>
                <DefaultAccordion
                    title='Create'
                    text='Create your very own NFT painting masterpiece with the Little Drawlings Artboard'
                    icon={<img src={icons.AccBrush} alt='AccBrush' />}
                />
                <DefaultAccordion
                    title='Touch up'
                    text='Touch up any mistakes or make adjustments to newly received paintings in the artboard!'
                    icon={<img src={icons.AccPallette} alt='AccPallette' />}
                />
            </div>
            <div className={styles.jump_wrap}>
                <div className={styles.clouds_wrap}>
                    <motion.img
                        className={styles.clouds_img}
                        src={icons.LeftClouds}
                        alt='LeftClouds'
                        animate={imageView ? 'visible' : 'hidden'}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        variants={leftImageVariants}
                    />
                    <motion.img
                        className={styles.clouds_img}
                        src={icons.RightClouds}
                        alt='RightClouds'
                        animate={imageView ? 'visible' : 'hidden'}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        variants={rightImageVariants}
                    />
                </div>
                <motion.img
                    className={styles.jump_img}
                    src={icons.JumpGuy}
                    alt='JumpGuy'
                    ref={imageRef}
                    animate={jumpAnimate()}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                <img
                    className={cn(styles.jump_img, styles.jump_img_pallette)}
                    src={icons.JumpGuyPallette}
                    alt='JumpGuyPallette'
                />
            </div>
        </div>
    );
};

export default LetsDraw;
