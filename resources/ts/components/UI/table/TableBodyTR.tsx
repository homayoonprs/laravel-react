import React, { Children } from 'react'
import { ITableBodyTR } from './ITable'
import styles from './index.module.scss'

const TableBodyTR = (props: ITableBodyTR) => {
  return (
    <tr {...props} className={styles.tr}>
        {props.children}
    </tr>
  )
}

export default TableBodyTR;