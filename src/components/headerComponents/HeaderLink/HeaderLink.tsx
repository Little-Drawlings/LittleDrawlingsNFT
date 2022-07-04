import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import cn from 'classnames';

import styles from './HeaderLink.module.scss';

interface Props {
	children?: string;
	to: string;
	className?: string
}

const HeaderLink: React.FC<Props> = ({ children, to, className, ...props }: LinkProps) => {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true })?.pathname || '';

	const classNames = () => {
		const classArray = className?.split(' ');
		return classArray ? classArray.map(c => styles[c]) : null
	};

	return (
		<Link
			className={cn(
				match ? cn(styles.nav_link_active) : styles.nav_link,
				match === '/studio' && styles.nav_link_studio,
				classNames()
			)}
			to={to}
			{...props}
		>
			{children}
		</Link>
	);
};

export default HeaderLink;
