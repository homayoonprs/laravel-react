import React from 'react'
import {ITableHeaderTH} from './ITable'
import styles from './index.module.scss'
import {cs} from '@/utils/helpers'

const TableHeaderTH = ({className = '',...props}: ITableHeaderTH) => {
  return (
    <th 
        {...props}
        scope="col"
        className={cs(
            styles.table_header_th,
            className
        )}
    >
          {props.children}
    </th>
  )
}

export default TableHeaderTH;
