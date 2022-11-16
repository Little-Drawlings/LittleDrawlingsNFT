import Carousel from 'nuka-carousel';

import Slide from './Slide';
import icons from '../../constants/icons';

import styles from './GallerySlider.module.scss';

const GallerySlider: React.FC = () => {
    return (
        <Carousel
            className={styles.carousel}
            adaptiveHeight={true}
            // cellAlign='left'
            cellSpacing={20}
            dragging={true}
            wrapAround={true}
            slidesToShow={3}
            slideIndex={0}
            defaultControlsConfig={{
                pagingDotsContainerClassName: styles.carousel_dots
            }}
            renderCenterLeftControls={({ previousSlide }) => (
                <img
                    className={styles.arrow}
                    onClick={previousSlide}
                    src={icons.PrevArrow}
                    alt='PrevArrow'
                />
            )}
            renderCenterRightControls={({ nextSlide }) => (
                <img
                    className={styles.arrow}
                    onClick={nextSlide}
                    src={icons.NextArrow}
                    alt='NextArrow'
                />
            )}>
            <Slide title='Canvas' paint={1.00084} image={icons.GalleryCanvas} />
            <Slide title='Brush' paint={1.00084} image={icons.GalleryBrash} />
            <Slide title='Color' paint={1.00084} image={icons.GalleryColor} />
            <Slide title='Color' paint={1.00084} image={icons.GalleryColor} />
        </Carousel>
    );
};

export default GallerySlider;
