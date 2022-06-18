import styles from './RangeInput.module.scss';

interface Props {
    step: number;
    min: number;
    max: number;
    value: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<Props> = ({ step, min, max, value, onChange }) => {
    return (
        <div className={styles.range_wrap}>
            <label
                htmlFor='range'
                className={styles.range_value}
                style={{ left: `${value * 2}%`, transform: `translate(${-value * 2}%, -100%)` }}>{value}</label>
            <input
                id='range'
                value={value}
                className={styles.input}
                type='range'
                step={step}
                min={min}
                max={max}
                onChange={(e) => onChange(e)}
            />
        </div>
    )
}

export default RangeInput;