import cn from 'classnames';

import { SavePopupProps } from '../../../redux/types/data';

import styles from './SavePopup.module.scss';

const SavePopup: React.FC<SavePopupProps> = ({
	title,
	desc,
	drawlName,
	isOpenPopup,
}) => {
	return (
		<>
			{isOpenPopup && (
				<div className={cn('popup-overlay')}>
					<div className={cn(styles.popup, 'popup-content')}>
						<h3 className={styles.popup_title}>{title}</h3>
					</div>
				</div>
			)}
		</>
	);
};

export default SavePopup;
