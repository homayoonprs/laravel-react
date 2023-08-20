import React, {useContext, useEffect, useState} from 'react';
import {DatePicker, Empty, Form, notification as ANTDNotification, Space, Spin, Switch} from "antd";

import {broadcastNotificationType, notificationType} from "@/types/Models/notification.type";
import styles from './NotificationDrawer.module.scss';
import {cs} from "@/utils/helpers";
import NotificationCard from "./NotificationCard";
import {FilterOutlined} from "@ant-design/icons";
import {Button} from "@/components/UI/button";
import {authContext} from "@/services/auth/useAuth";
import gateway from "@/services/gateway";

// import {useSocket} from "../../services/websockets";

export interface INotificationDrawer {
    open?: boolean
    onClose?: () => void
}

const NotificationDrawer = ({open, onClose, ...props}: INotificationDrawer) => {

    const {user} = useContext(authContext)

    const [showFilterNotifications, setShowFilterNotifications] = useState<boolean>(false)
    const [notifications, setNotifications] = useState<notificationType<broadcastNotificationType>[] | []>([])
    const [loading, setLoading] = useState<boolean>(false);


    const onClickClose = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onClose && onClose()
    }

    const toggleShowNotificationFilter = () => setShowFilterNotifications(!showFilterNotifications);

    const markAsRead = (notification: notificationType) => {
        setNotifications(notifications.map(item => ({
            ...item,
            read_at: item.id === notification.id ? 'read' : item.read_at
        })));
        gateway.markNotificationAsRead(notification.id)
    }

    useEffect(() => {

        if (open) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

    }, [open])


    useEffect(() => {

        gateway.getNotifications().then(res => {
            setNotifications(res.data)
        }).finally(() => setLoading(false))

    }, [])

    const renderNotifications = (start: number, end: number) => (
        !notifications.length || !notifications?.slice(start, end).length
            ? <p className='text-white'>داده ای موجود نیست</p>
            : notifications?.slice(start, end).map((notification, key) => <NotificationCard onClick={markAsRead}
                                                                                            key={key}
                                                                                            notification={notification}/>)
    )


    return (
        <div
            className={cs(
                styles.notifications_container,
                open ? styles.show : '',
                loading || !notifications ? styles.not_ready : ''
            )}
            onClick={onClickClose}
        >
            <div
                onClick={e => e.stopPropagation()}
                className={cs(
                    styles.side_container,
                    styles.right
                )}
            >
                <div className={styles.header}>
                    <h2 className={styles.title}>اعلان ها</h2>
                    <div className={styles.action}>
                        <Switch
                            checkedChildren={'فعال'}
                            unCheckedChildren={'غیرفعال'}
                        />
                    </div>
                </div>

                <div className={styles.content}>
                    {
                        loading
                            ? <Spin tip='لطفا صبور باشید...' className='!text-white'/>
                            : renderNotifications(0, 5)
                    }
                </div>
                <div className={styles.footer}>
                    <Button buttonStyle='primary' size='sm'>ارسال پیام</Button>
                    <Button buttonStyle='primary' size='sm' outline onClick={onClickClose}>بستن</Button>
                </div>
            </div>
            <div
                onClick={e => e.stopPropagation()}
                className={cs(
                    styles.side_container,
                    styles.left
                )}
            >
                <div className={styles.header}>
                    <h2 className={styles.title}>تاریخچه اعلان ها</h2>
                    <div className={styles.action}>
                        <Button onClick={toggleShowNotificationFilter} buttonStyle='light-secondary' justIcon ><FilterOutlined /></Button>
                    </div>
                    <div className={cs(styles.filter_container, showFilterNotifications ? styles.show : '')}>
                        <DatePicker.RangePicker size='small'/>
                    </div>
                </div>
                <div className={styles.content}>
                    {
                        loading
                            ? <Spin tip='لطفا صبور باشید...' className='!text-white'/>
                            : renderNotifications(5, notifications.length - 1)
                    }
                </div>
            </div>
        </div>
    )
}

export default NotificationDrawer;
