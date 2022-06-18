import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Slider from "react-slick";

import Header from '../../components/Header';
import { RootState } from '../../redux/reducers';
import { SETTINGS } from '../../constants/slick';

import styles from './Gallery.module.scss';

const Gallery: React.FC = () => {
    const nightModeMint = useSelector(
        (state: RootState) => state?.mintReducer.nightMode
    );
    const [nightMode, setNightMode] = useState<boolean>(nightModeMint);

    useEffect(() => {
        setNightMode(nightModeMint);
    }, [nightModeMint]);

    const renderSlides = () =>
        [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <div>
                <h3>Slide {num}</h3>
            </div>
        ));
    return (
        <>
            <Header />
            <div className={cn('content', nightMode && 'night')}>
                <div className={styles.wrapper}>
                    <Slider {...SETTINGS}>
                        {renderSlides()}
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default Gallery;