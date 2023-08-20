import React from 'react'
import { ITableBody } from './ITable';
import styles from './index.module.scss'

const TableBody = (props: ITableBody) => {
  return (
    <tbody {...props} className={styles.table_body}>
        {props.children}
    </tbody>
  )
}
export default TableBody;
