import React from 'react'
import styles from './index.module.scss'
import {ITable} from './ITable';
import {cs} from "@/utils/helpers";

function Table({className = '', ...props}: ITable) {

    return (
        <div
            {...props}
            className={cs(
                styles.table_container,
                className
            )}
        >
            <table
                {...props}
                className={cs(
                    styles.table,
                    className
                )}
            >
                {props.children}
            </table>

        </div>
    );
}

export default Table;