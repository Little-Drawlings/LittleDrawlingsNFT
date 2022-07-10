import { useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getDrawl } from '../../../redux/actions/drawl';
import { setOpenDrawPopup, setTimeMint } from '../../../redux/actions/mint';
import { AppDispatch } from '../../../redux/store';
import DefaultButton from '../../DefaultButton';

import styles from './MintStudio.module.scss';

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const MintStudio: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
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

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const mintCanvas = () => {
        dispatch(getDrawl(''));
        dispatch(setOpenDrawPopup(true));
        dispatch(setTimeMint(1200));
        navigate('/studio/canvas')
    }

    return (
        <div className={cn('mint-wrapper', styles.mint_studio)}>
            <div className={styles.sticky}>
                <h3 className={cn('mint-title', styles.title)}><span className='title-span'>Studio</span></h3>
                <p className={styles.sub_title}>paint your masterpiece</p>

                <div className={styles.canvas_img_wrap}>
                    {images.map((image) => (
                        <div
                            className={cn(styles.image, styles[`image_${image}`], {
                                image_visible: visibleImagesMap[image]
                            })}
                            key={image}
                        />
                    ))}
                </div>

                <DefaultButton
                    className='no_wide_primary_large'
                    title='Mint Canvas'
                    onClick={mintCanvas}
                />
            </div>
        </div>
    )
}

export default MintStudio