import { cs } from '@/utils/helpers';
import React from 'react'
import { IActionBar } from './IActionBar';
import styles from './index.module.scss'

const ActionBar = ({className = '', ...props}: IActionBar) => {
    return (
        <div className={cs(
            styles.actionbar_container,
            className
        )}>
            {props.children}
        </div>
    )
}

export default ActionBar;