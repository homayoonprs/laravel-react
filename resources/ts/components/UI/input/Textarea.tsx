import React from 'react'
import styles from './Textarea.module.scss';
import {motion} from 'framer-motion'
import { ITextarea } from './IInput';
import { cs } from '@/utils/helpers';

const Textarea = ({label, rows, value, name, id, icon, onChange, className = '', disabled, errorMessage,  placeholder}: ITextarea) => {
    
    const variants = {
        hidden: {y: -10, opacity: 0},
        show: {y: 0, opacity: 1},
    }

    return (
        <div className={styles['textarea-container']}>
            <label htmlFor={id}>{label}</label>
            <textarea
                value={value}
                name={name}
                rows={rows}
                id={id}
                placeholder={placeholder}
                className={cs(
                    styles['form-textarea'],
                    !errorMessage ? '' : styles['invalid'],
                    className
                )}
                disabled={disabled}
                required
            />
            {icon ? <span className={styles['textarea-icon']}>{icon}</span> : ''}
            <motion.div variants={variants} animate={!errorMessage ? 'hidden' : 'show'} >
                <span className={styles['error-message']}>{errorMessage}</span>
            </motion.div>
        </div>
    )
}

export default Textarea;