import cn from 'classnames';

import icons from '../../../constants/icons';

import styles from './MintFooter.module.scss';

const MintFooter: React.FC = () => {
    return (
        <div className={cn('mint-wrapper', 'mint-height_auto', styles.mint_footer)}>
            <img src={icons.Parallax} alt="Parallax" />
        </div>
    )
}

export default MintFooter;