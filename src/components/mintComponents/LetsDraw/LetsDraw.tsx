import cn from 'classnames';
import icons from '../../../constants/icons';

import DefaultAccordion from '../../DefaultAccordion';

import styles from './LetsDraw.module.scss';

const LetsDraw = () => {
    return (
        <div className={cn('mint-wrapper', 'mint-height_auto', styles.mint_draw)}>
            <h3 className={cn('mint-title', styles.title)}>
                <span className='title-span'>Let’s draw</span>
            </h3>
            <div className={styles.accordions_wrap}>
                <DefaultAccordion
                    title='Stake'
                    text='Stake your NFTs in your Gallery to recieve donations of $paint. Little Drawlings, Canvas, and Paintings alike accrue donations daily.'
                    icon={<img src={icons.AccStake} alt='AccStake' />} />
                <DefaultAccordion
                    title='Create'
                    text='Stake your NFTs in your Gallery to recieve donations of $paint. Little Drawlings, Canvas, and Paintings alike accrue donations daily.'
                    icon={<img src={icons.AccBrush} alt='AccBrush' />} />
                <DefaultAccordion
                    title='Touch up'
                    text='Stake your NFTs in your Gallery to recieve donations of $paint. Little Drawlings, Canvas, and Paintings alike accrue donations daily.'
                    icon={
                        <img src={icons.AccPallette} alt='AccPallette' />
                    } />
            </div>
            <div className={styles.jump_wrap}>
                <img className={styles.jump_img} src={icons.JumpGuy} alt="JumpGuy" />
                <img className={cn(styles.jump_img, styles.jump_img_pallette)} src={icons.JumpGuyPallette} alt="JumpGuyPallette" />
            </div>
        </div>
    );
};

export default LetsDraw;
