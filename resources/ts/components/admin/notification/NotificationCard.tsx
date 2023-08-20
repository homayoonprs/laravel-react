import React from "react";
import styles from './NotificationCard.module.scss';
import {broadcastNotificationType, notificationType} from "@/types/Models/notification.type";
import {cs} from "@/utils/helpers";

export interface INotificationCard
{
    notification: notificationType<broadcastNotificationType>
    onClick?: (notification: notificationType) => void
}

const NotificationCard  = ({notification, ...props}: INotificationCard) => {

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        props.onClick && props.onClick(notification)
    }

    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.header}>
                <p className={cs(styles.title, !notification.read_at ? styles.is_not_read : '')}>
                    {notification.data.title}
                </p>
                <time className={styles.date}>
                    {notification.created_at}
                </time>
            </div>
            <p className={styles.body}>
                {notification.data.body}
            </p>
        </div>
    )
}

export default NotificationCard;