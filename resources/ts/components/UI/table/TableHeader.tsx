import { cs } from '@/utils/helpers';
import React from 'react'
import { ITableHeader } from './ITable';
import styles from './index.module.scss'

const TableHeader = ({className = '',...props}: ITableHeader) => {
   
    return (
        <thead
            {...props}
            className={cs(
                styles.table_head,
                className,
            )}
        >
            <tr className={styles.table_head_row}>
                {props.children}
            </tr>
        </thead>
    )
}

export default TableHeader;
