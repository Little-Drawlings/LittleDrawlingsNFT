import cn from 'classnames';

import icons from '../../../constants/icons';

import styles from './MasterStudio.module.scss';

const MasterStudio: React.FC = () => {

    return (
        <div className={cn('mint-wrapper', styles.master_studio)}>
            <h3
                className={cn('mint-title', styles.title)}>
                <span className='title-span'>Master the Studio</span>
            </h3>
            <div
                className={styles.image_wrap}>
                <img className={styles.image} src={icons.FlyingGirl} alt='FlyingGirl' />
            </div>
            <ul
                className={styles.clouds_list}>
                <li className={styles.clouds_item}>draw</li>
                <li className={styles.clouds_item}>mint</li>
                <li className={styles.clouds_item}>stake</li>
            </ul>
        </div>
    );
};

export default MasterStudio;
