import React from 'react'
import styles from './Checkbox.module.scss';
import { CheckboxInterface } from './CheckboxInterface';
import {cs} from "@/utils/helpers";

const Checkbox = ({id, name, value, label, onChange, checked, className = ''}: CheckboxInterface) => {

    return (
        <div className={cs(styles.checkbox_container, className)}>
            <input 
              id={id}
              type="checkbox" 
              name={name}
              value={value} 
              className={styles.checkbox}
              onChange={onChange}
              checked={checked}
            />
            <label htmlFor={id} className={styles.checkbox_label}>{label}</label>
        </div>
    )
}

export default Checkbox


