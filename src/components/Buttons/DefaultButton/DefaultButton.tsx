import styles from './DefaultButton.module.scss';

interface Props {
    title: string;
}

const DefaultButton: React.FC<Props> = ({title, ...props}) => {
    return (
        <button className={styles.default_btn}>{title}</button>
    )
}

export default DefaultButton;