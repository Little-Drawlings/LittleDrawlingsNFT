import cn from 'classnames';

import styles from './DefaultButton.module.scss';

interface Props {
	title: string;
	disabled?: boolean;
	className?: string;
	onClick: () => void;
}

const DefaultButton: React.FC<Props> = ({
	title = '',
	disabled = false,
	className = 'wide_primary_active_large',
	onClick
}) => {
	const classNames = () => {
		const classArray = className.split(' ');
		return classArray.map(c => styles[c])
	};
	return (
		<button
			className={cn(styles.default_btn, classNames())}
			disabled={disabled}
			onClick={onClick}
		>
			{title}
		</button>
	);
};

export default DefaultButton;
