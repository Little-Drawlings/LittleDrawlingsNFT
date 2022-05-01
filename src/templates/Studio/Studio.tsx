import Header from '../../components/Header';
import { HEADER_BG } from '../../constants/data';
import icons from '../../constants/icons';

import styles from './Studio.module.scss';

const Studio: React.FC = () => {
	return (
		<>
			<Header background={HEADER_BG.WHITE} />
			<div className={styles.content}>
				<div className={styles.breadcrumbs}>
					<img className={styles.arrow_img} src={icons.Arrow} alt='arrow' />
					<span className={styles.breadcrumbs_text}>Back to all canvases</span>
				</div>
				
			</div>
		</>
	);
};

export default Studio;
