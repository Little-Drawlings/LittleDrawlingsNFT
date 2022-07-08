import cn from 'classnames';
import { ParallaxBanner } from 'react-scroll-parallax';

import icons from '../../../constants/icons';

import styles from './MintFooter.module.scss';

const MintFooter: React.FC = () => {
    return (
        <div className={cn('mint-wrapper', 'mint-height_auto', styles.mint_footer)}>
            <img src={icons.ParallaxPlan1} alt="Parallax" />
            {/* <ParallaxBanner
                layers={[{
                    image: icons.ParallaxPlan1, speed: -15,
                    shouldAlwaysCompleteAnimation: true,
                    children: (
                        <div className="">
                            <img src={icons.ParallaxPlan2} alt="Parallax2" />
                        </div>
                    ),
                }]}
                className={cn("aspect-[2/1]", styles.parallax_img)}
            /> */}
        </div>
    )
}

export default MintFooter;