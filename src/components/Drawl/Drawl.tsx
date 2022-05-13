import { useNavigate } from 'react-router-dom';
import DefaultButton from '../DefaultButton';
import styles from './Drawl.module.scss';

interface Props {
	image?: string | null;
	title: string;
	size: string;
	edited: string;
	time: number;
}

const Drawl: React.FC<Props> = ({ image, title, size, edited, time }) => {
    const navigate = useNavigate();
	return (
		<div className={styles.drawl}>
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
					<span className={styles.info_row_value}>Edited {edited}</span>
					<span className={styles.info_row_value}>{time} min</span>
				</div>
			</div>
            <DefaultButton className='no_wide_primary_small' title={'Touch up'} onClick={() => navigate('/studio/canvas')} />
		</div>
	);
};

export default Drawl;
