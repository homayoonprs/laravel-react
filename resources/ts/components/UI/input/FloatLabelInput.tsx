import React from 'react'
import styles from './FloatLabelInput.module.scss';
import {motion} from 'framer-motion'
import { IInput } from './IInput';
import { cs } from '@/utils/helpers';


const FloatInput = ({label, type, value, name, id, icon, onChange, className = '', disabled, errorMessage, inputSize}: IInput) => {

    const variants = {
        hidden: {y: -10, opacity: 0},
        show: {y: 0, opacity: 1},
    }

    return (
        <div className={styles['floating-label-input-container']}>
            <input
                type={type}
                value={value}
                name={name}
                id={id}
                onChange={onChange}
                className={cs(
                    styles['form-input'],
                    !!errorMessage ? styles['invalid'] : '',
                    styles[`${!!inputSize ? inputSize : 'md'}`],
                    className
                )}
                disabled={disabled}
                required
                pattern="\S+.*"
            />
            <label htmlFor={id} className={cs(styles['floating-label'], 'group-focus:text-primary')}>{label}</label>
            {icon ? <span className={styles['input-icon']}>{icon}</span> : ''}
            <motion.div variants={variants} animate={!errorMessage ? 'hidden' : 'show'} >
                <span className={styles['error-message']}>{errorMessage}</span>
            </motion.div>
        </div>
    )
}

export default FloatInput;