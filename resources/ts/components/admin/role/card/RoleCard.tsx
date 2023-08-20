import React from 'react';
import {roleType} from "@/types/Models/role.type";
import styles from './RoleCard.module.scss';
import {Card} from "@/components/UI/card";
import {Button} from "@/components/UI/button";
import {BiEdit, BiTrash} from "react-icons/bi";
import {Modal, Popconfirm, Typography} from "antd";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {Link} from "react-router-dom";
import { usePermissions } from '@/hooks/usePermissions';

export interface IRoleCard
{
    role: roleType
    onEditClick: (role: roleType) => void
    onDeleteClick: (role: roleType) => void
}

const RoleCard = ({role, ...props}: IRoleCard) => {

    const [hasPermissionTo] = usePermissions();

    const editAction = () => {
        props.onEditClick(role)
    }
    const showPromiseConfirm = () => {
        Modal.confirm({
            title: 'آیا میخواهید نقش را حذف کنید؟',
            icon: <ExclamationCircleFilled />,
            okType: 'danger',
            okText: 'حذف شود',
            cancelText: 'لغو',
            content: 'در صورت تائید نقش: ('+role.label+') حذف خواهد شد! ',
            onOk() {
                return props.onDeleteClick(role);
            },
            onCancel() {},
        });
    };

    return (
        <Card className={'!flex-initial'}>
            <div className={styles.container}>
                <Typography.Text ellipsis={{tooltip: role.label}} className={styles.title}>{role.label}</Typography.Text>
                <div className={styles.actions}>
                    {
                        hasPermissionTo('role_view')
                            ? <Link to={`/admin/role/${role.id}`}>
                                <Button buttonStyle='primary' className={'ml-3'} size='lg' justIcon withBgOpacity onClick={editAction}>
                                    <BiEdit/>
                                </Button>
                            </Link>
                            : ''
                    }

                    {
                        hasPermissionTo('role_delete')
                            ? <Button buttonStyle='danger' size='lg' justIcon withBgOpacity onClick={showPromiseConfirm}>
                                <BiTrash/>
                            </Button>
                            : ''
                    }
                    
                </div>
            </div>
        </Card>
    )
}

export default RoleCard;