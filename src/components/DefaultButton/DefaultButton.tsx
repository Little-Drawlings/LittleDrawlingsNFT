import cn from 'classnames';
import CSS from 'csstype';

import styles from './DefaultButton.module.scss';

interface Props {
	title: string;
	disabled?: boolean;
	style?: CSS.Properties;
	className?: string;
	onClick: () => void;
}

const DefaultButton: React.FC<Props> = ({
	title = '',
	disabled = false,
	style,
	className = 'wide_primary_active_large',
	onClick
}) => {
	const getClassNames = () => {
		const classArray = className.split(' ');
		return classArray.map(c => styles[c])
	};
	return (
		<button
			style={style}
			className={cn(styles.default_btn, getClassNames())}
			disabled={disabled}
			onClick={onClick}
		>
			{title}
		</button>
	);
};

export default DefaultButton;
