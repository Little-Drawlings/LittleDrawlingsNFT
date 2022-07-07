import cn from 'classnames';
import {
    Animator,
    ScrollContainer,
    ScrollPage,
    batch,
    Fade,
    FadeIn,
    Move,
    MoveIn,
    MoveOut,
    Sticky,
    StickyIn,
    ZoomIn
} from "react-scroll-motion";

import icons from '../../../constants/icons';

import styles from './MasterStudio.module.scss';

const MasterStudio: React.FC = () => {
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
    const FadeUp = batch(Fade(), Move(), Sticky());

    return (
        <ScrollContainer>
            <ScrollPage page={0}>
                <div className={cn('mint-wrapper', styles.master_studio)}>
                    <h3
                        className={cn('mint-title', styles.title)}>
                        <span className='title-span'>Master the Studio</span>
                    </h3>
                    <Animator animation={ZoomInScrollOut}>
                        <div
                            className={styles.image_wrap}>
                            <img className={styles.image} src={icons.FlyingGirl} alt='FlyingGirl' />
                        </div>
                    </Animator>
                    <ul
                        className={styles.clouds_list}>
                        <li className={styles.clouds_item}>draw</li>
                        <li className={styles.clouds_item}>mint</li>
                        <li className={styles.clouds_item}>stake</li>
                    </ul>
                </div>
            </ScrollPage>
        </ScrollContainer>
    );
};

export default MasterStudio;
