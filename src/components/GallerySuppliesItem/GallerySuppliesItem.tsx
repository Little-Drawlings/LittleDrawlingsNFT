import { useState } from 'react';
import cn from 'classnames';
import DefaultButton from '../DefaultButton';
import styles from './GallerySuppliesItem.module.scss';

interface Props {
    title: string;
    image: string;
    type: string;
    onClick: () => void;
}

const GallerySuppliesItem: React.FC<Props> = ({
    title,
    image,
    type,
    onClick,
}) => {
    const [hover, setHover] = useState<boolean>(false);
    return (
        <div
            className={styles.supplies_item}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}>
            <div className={styles.supplies_wrap}>
                <div className={cn(styles.item_type, hover && styles.item_type_on)}>{type}</div>
                <div className={styles.item_img_wrap}>
                    <img
                        className={styles.item_img}
                        src={image}
                        alt='gallerySuppliesImage'
                    />
                </div>
                <p className={styles.item_title}>{title}</p>
            </div>
            <div className={styles.button_wrap}>
                <DefaultButton
                    style={{ opacity: hover ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                    className='no_wide_primary_small m_zero'
                    title={'Stake'}
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default GallerySuppliesItem;
