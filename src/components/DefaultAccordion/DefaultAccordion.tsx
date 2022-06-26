import { useState } from "react";
import cn from "classnames";

import styles from './DefaultAccordion.module.scss';

interface Props {
    title: string;
    icon?: JSX.Element;
    text: string;

}

const DefaultAccordion: React.FC<Props> = ({ title, icon = null, text }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className={cn(styles.accordion, isOpen && styles.open)} onClick={toggle}>
            <div className={styles.accordion_title_wrap}>
                {icon}
                <span className={styles.accordion_title}>{title}</span>
            </div>
            <div className={cn(styles.accordion_content, isOpen && styles.open)}>
                <span className={styles.content_text}>{text}</span>
            </div>
        </div>
    )
}

export default DefaultAccordion;