import { useState } from 'react';
import cn from 'classnames';

import styles from './DefaultInput.module.scss';

interface Props {
	placeholder?: string;
	value: string;
	type?: string;
	onChange?: (e: any) => void;
}

const DefaultInput: React.FC<Props> = ({
	placeholder,
	onChange,
	value,
	type = 'text',
}) => {
	const [focus, setFocus] = useState<boolean>(false);

	return (
		<div className={styles.input_container}>
			<div
				className={cn(
					styles.arg_placeholder,
					placeholder && focus && styles.view
				)}
			>
				{placeholder}
			</div>
			<input
				className={styles.input}
				placeholder={focus ? ''  : placeholder}
				type={type}
				value={value}
				onChange={onChange}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
		</div>
	);
};

export default DefaultInput;
