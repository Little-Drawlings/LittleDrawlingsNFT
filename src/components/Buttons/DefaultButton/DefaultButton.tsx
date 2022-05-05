import cn from 'classnames';

import styles from './DefaultButton.module.scss';

interface Props {
	title: string;
	className?: string;
	onClick: () => void;
}

const DefaultButton: React.FC<Props> = ({
	title = '',
	className = '',
	onClick,
	...props
}) => {
	return (
		<button
			className={cn(styles.default_btn, styles[className])}
			onClick={onClick}
		>
			{title}
		</button>
	);
};

export default DefaultButton;
