import React from 'react'
import {SeparatorInterface} from './SeparatorInterface'
import styles from './Separator.module.scss'

const Separator = ({text, className}: SeparatorInterface) => {

    return (
        <div className={`${styles.separator_line} ${className}`}>
            <span className={styles.text}>{text}</span>
        </div>
    )
}

export default Separator;
