import cn from 'classnames';
import { useParallax } from 'react-scroll-parallax';

import icons from '../../../constants/icons';

import styles from './MasterStudio.module.scss';

const MasterStudio: React.FC = () => {

    const parallaxList = useParallax<HTMLDivElement>({
        easing: 'ease',
        translateX: [50, -50],
    });

    const parallaxImage = useParallax<HTMLDivElement>({
        easing: 'easeInQuad',
        translateY: [0, -20],
    });

    return (
        <div className={cn('mint-wrapper', styles.master_studio)}>
            <h3
                className={cn('mint-title', styles.title)}>
                <span className='title-span'>Master the Studio</span>
            </h3>
            <div
                className={styles.image_wrap} ref={parallaxImage.ref}>
                <img className={styles.image} src={icons.FlyingGirl} alt='FlyingGirl' />
            </div>
            <div ref={parallaxList.ref}>
                <ul
                    className={styles.clouds_list}>
                    <li className={styles.clouds_item}>draw</li>
                    <li className={styles.clouds_item}>mint</li>
                    <li className={styles.clouds_item}>stake</li>
                </ul>
            </div>
        </div>
    );
};

export default MasterStudio;
