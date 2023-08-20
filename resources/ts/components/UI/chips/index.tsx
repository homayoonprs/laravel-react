import React from 'react'
import {IChips} from './IChips'
import styles from './index.module.scss'
import {ImCross} from 'react-icons/im'
import {cs} from "@/utils/helpers";


const Chips = ({className = '', ...props}: IChips) => {

    return (
        <div
            className={cs(
                styles.container,
                styles[`${props.size}`],
                styles[`${props.variant}`],
                props.outline ? styles.outline : '',
                props.rounded ? styles.chips_rounded : '',
                className,
            )}
            onClick={props.onClick}
        >
            <div className='basis-1/5'>
        <span className={styles.close_btn} onClick={props.onCloseClick}>
          <ImCross size={10}/>
        </span>
            </div>
            {props.icon ?
                <div className='basis-1/5'>
                    <span className={styles.icon} onClick={props.onClick}>{props.icon}</span>
                </div>
                : ''}
            <div className='flex flex-1'>
                <span className={styles.label}>{props.label}</span>
            </div>
        </div>
    )
}

export default Chips