import React, { useState } from 'react';
import cn from 'classnames';

import Dropdown, { Group, Option } from 'react-dropdown';

import icons from '../../constants/icons';

import styles from './DefaultDropdown.module.scss';

interface Props {
	placeholder?: string;
	options: (Group | Option | string)[];
}

const DefaultDropdown: React.FC<Props> = ({ placeholder, options }) => {
    const [focus, setFocus] = useState<boolean>(false)
	return (
		<div className={styles.dropdown_container}>
			<span className={cn(styles.arg_placeholder, placeholder && focus && styles.view)}>{placeholder}</span>
			<Dropdown
				className={styles.dropdown}
				controlClassName={styles.dropdown_control}
                menuClassName={styles.dropdown_menu}
				options={options}
				placeholder={placeholder}
				arrowOpen={<img src={icons.CaretUp} alt='CaretUp' />}
				arrowClosed={<img src={icons.CaretDown} alt='CaretDown' />}
                onFocus={(arg) => setFocus(!arg)}
			/>
		</div>
	);
};

export default DefaultDropdown;
