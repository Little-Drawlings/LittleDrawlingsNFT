import cn from 'classnames';

import icons from '../../../constants/icons';
import { getAbiData } from '../../../redux/actions/drawl';

import styles from './RoadMap.module.scss';

const RoadMap: React.FC = () => {
    getAbiData()
    
    return (
        <div className={cn('mint-wrapper', 'mint-height_auto', styles.road_map)}>
            <div className={styles.title_wrap}>
                <img src={icons.RoadMap} alt="RoadMap" />
            </div>
            <div className={cn(styles.phase_wrap, styles.first)}>
                <img className={cn(styles.phase_img, styles.first)} src={icons.Phase1} alt="Phase1" />
                <div>
                    <h3 className={styles.phase_title}>Phase 1</h3>
                    <ul className={styles.phase_list}>
                        <li className={styles.phase_item}>Canvas dNFT MVP Alpha Mint Access by Donation</li>
                        <li className={styles.phase_item}>Partnership engagement & community exchange fludity optimization</li>
                        <li className={styles.phase_item}>Staking & rewards/Canvas minting</li>
                    </ul>
                </div>
            </div>
            <div className={cn(styles.phase_wrap, styles.second)}>
                <h3 className={styles.phase_title}>Phase 2</h3>
                <ul className={styles.phase_list}>
                    <li className={styles.phase_item}>Initial Mint of Little Drawlings dNfts</li>
                    <li className={styles.phase_item}>Top tier NFT artist contest & charity raffles</li>
                    <li className={styles.phase_item}>dNFT visual attribute and metadata reward boosting upgrades</li>
                </ul>
            </div>
            <div className={styles.phase_wrap}>
                <img className={styles.phase_img} src={icons.Phase2} alt="Phase2" />
                <div>
                    <h3 className={styles.phase_title}>Phase 3</h3>
                    <ul className={styles.phase_list}>
                        <li className={styles.phase_item}>Community & Dev Team collaboration of future organization structure</li>
                        <li className={styles.phase_item}>Explore of multi-chain game implementation</li>
                        <li className={styles.phase_item}>Begin DAO development</li>
                        <li className={styles.phase_item}>iOS development begins</li>
                    </ul>
                </div>
            </div>
            <div className={styles.phase_wrap}>
                <div>
                    <h3 className={styles.phase_title}>Phase 4</h3>
                    <ul className={styles.phase_list}>
                        <li className={styles.phase_item}>Next Gen NFT drop</li>
                        <li className={styles.phase_item}>Game upgrades/overhaul</li>
                        <li className={styles.phase_item}>DAO tranfer of power; voting begins</li>
                    </ul>
                </div>
                <img className={styles.phase_img} src={icons.Phase3} alt="Phase3" />
            </div>
        </div>
    )
}

export default RoadMap;