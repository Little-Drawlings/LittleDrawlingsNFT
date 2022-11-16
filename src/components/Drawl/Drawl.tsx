import dayjs from 'dayjs';
import cn from 'classnames';

import DefaultButton from '../DefaultButton';
import styles from './Drawl.module.scss';

interface Props {
	image?: string | null;
	title: string;
	size: string;
	edited: string;
	onClick: () => void;
	onProvenanceClick: () => void;
}

const Drawl: React.FC<Props> = ({ image, title, size, edited, onClick, onProvenanceClick }) => {
	return (
		<div className={cn(styles.drawl)}>
			{image ? (
				<img className={styles.drawl_image} src={image} alt='drawl' />
			) : (
				<div className={styles.drawl_bg}></div>
			)}
			<div className={styles.info}>
				<div className={styles.info_row}>
					<span className={styles.info_row_value}>{title}</span>
					<span className={styles.info_row_value}>{size}</span>
				</div>
				<div className={styles.info_row}>
					<span className={styles.info_row_value}>Edited {dayjs(edited).format('MM-DD HH:mm')}</span>
				</div>
			</div>
			<div className={styles.buttons_row}>
				<DefaultButton className='no_wide_primary_small' title={'Paint'} onClick={onClick} />
				<DefaultButton className='no_wide_primary_small provenance'  title={'Provenance'} onClick={onProvenanceClick} />
			</div>
		</div>
	);
};

export default Drawl;
