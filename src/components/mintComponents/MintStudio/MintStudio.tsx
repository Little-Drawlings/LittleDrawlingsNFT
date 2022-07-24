import { useLayoutEffect, useState } from 'react';
import cn from 'classnames';

import styles from './MintStudio.module.scss';
import NewMintButton from '../../NewMintButton';

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MintStudio: React.FC = () => {
    const [visibleImagesMap, setVisibleImagesMap] = useState(
        images.reduce((map: any, image) => {
            map[image] = false;
            return map;
        }, {})
    );

    useLayoutEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;

            const newVisibleImagesMap = images.reduce((map: any, image) => {
                map[image] = scrollTop >= image * viewportHeight;
                return map;
            }, {});

            setVisibleImagesMap(newVisibleImagesMap);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cn('mint-wrapper', styles.mint_studio)}>
            <div className={styles.sticky}>
                <h3 className={cn('mint-title', styles.title)}>
                    <span className='title-span'>Studio</span>
                </h3>
                <p className={styles.sub_title}>paint your masterpiece</p>

                <div className={styles.canvas_img_wrap}>
                    {images.map((image) => (
                        <div
                            className={cn(styles.image, styles[`image_${image}`], {
                                image_visible: visibleImagesMap[image],
                            })}
                            key={image}
                        />
                    ))}
                </div>

                <div className={styles.button_wrap}>
                    <NewMintButton />
                </div>
            </div>
        </div>
    );
};

export default MintStudio;
