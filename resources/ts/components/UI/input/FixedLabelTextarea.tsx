import React from 'react'
import styles from './FixedLabelTextarea.module.scss';
import {motion} from 'framer-motion'
import { ITextarea } from './IInput';
import { cs } from '@/utils/helpers';

const TextareaFixedLabelInput = ({containerClassName = '', inputClassName = '', ...props}: ITextarea) => {
    
    const variants = {
        hidden: {y: -10, opacity: 0},
        show: {y: 0, opacity: 1},
    }

    return (
        <div 
            className={cs(
                styles['input-container'],
                props.labelDir === 'ltr' ? styles['ltr-label'] : '',
                props.iconDir === 'ltr' ? styles['ltr-icon'] : '',
                containerClassName,
            )}
            dir={props.containerDir}
        >
            <label htmlFor={props.id}>{props.label}</label>

            <textarea 
                {...props}
                className={cs(
                    styles.textarea_input,
                    !props.errorMessage ? '' : styles['invalid'],
                    styles[`${!!props.inputSize ? props.inputSize : 'md'}`],
                    !props.icon ? '!px-2' : '',
                    inputClassName,
                )}
            ></textarea>

            {props.icon ? <span className={styles['input-icon']}>{props.icon}</span> : ''}

            <motion.div 
                variants={variants}
                animate={!props.errorMessage ? 'hidden' : 'show'}
                className={styles['error-message-container']}
            >
                <span className={styles['error-message']}>{props.errorMessage}</span>
            </motion.div>

        </div>
    )
}

export default TextareaFixedLabelInput;