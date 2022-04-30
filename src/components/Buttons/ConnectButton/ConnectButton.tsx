import styles from './ConnectButton.module.scss';

interface Props {
	onClick?: () => void;
}

const ConnectButton: React.FC<Props> = ({onClick, ...props}) => {
	return <button className={styles.connect_button} onClick={onClick}>Connect to wallet</button>;
};

export default ConnectButton;
