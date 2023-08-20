import React,{useRef} from 'react'
import { IActionMenu } from './IActionMenu';
import styles from './index.module.scss'

const ActionMenu = (props: IActionMenu) => {
    const actionMenuRef = useRef<HTMLDivElement>(null);
    
    const onToggleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        actionMenuRef.current?.classList.toggle(styles.open)    
        props.onToggleClick && props.onToggleClick(event)
    }

    return (
        <div ref={actionMenuRef} className={styles.container} onClick={onToggleClick}>
            <div className={styles.toggle}>
                {props.button}
            </div>
            <div className={styles.context}>
                {props.items.map(item => (
                    <div className={styles.item} onClick={item.onClick}>
                        <span className={styles.label}>{item.label}</span>
                        { item.icon ? <span className={styles.icon}>{item.icon}</span> : '' }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActionMenu;
