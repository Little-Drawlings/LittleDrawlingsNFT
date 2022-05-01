import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import cn from 'classnames';

import styles from './HeaderLink.module.scss';

interface Props {
	children?: string;
	to: string;
}

const HeaderLink: React.FC<Props> = ({ children, to, ...props }: LinkProps) => {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<Link className={match ? cn(styles.nav_link, styles.nav_link_active) : styles.nav_link} to={to} {...props}>
			{children}
		</Link>
	);
};

export default HeaderLink;
