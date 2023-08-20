import React from 'react';
import {userType} from "@/types/Models/user.type";
import {Avatar, Button, Col, Divider, Drawer, Row} from "antd";
import {CrownTwoTone, UserOutlined} from "@ant-design/icons";
import styles from "@/styles/vendors/antd/styles";

export interface IUserMinimalPProfileDrawer
{
    user: userType | null
    onClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void | undefined
    open?: boolean
}

interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
    <div className={'border-b-2 border-gray-400'}>
        <p className={'text-sm pb-1'}>{title}&nbsp;:</p>
        <p className={'font-bold text-sm'}>{content}</p>
    </div>
);

const UserMinimalProfileDrawer = ({open, onClose, user}: IUserMinimalPProfileDrawer) => {


    return (
        <Drawer title={`${user?.name} پروفایل کاربر`} extra={<Button size='small'>ویرایش</Button>} width={420} placement="right" onClose={onClose} open={open}>
            <Row gutter={[9,18]}>
                <Divider/>
                <Col span={12}>
                    <DescriptionItem title="نام" content={user?.name} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="ایمیل" content={user?.email} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="تلفن تماس" content={user?.phone} />
                </Col>
            </Row>

        </Drawer>
    )
}

export default UserMinimalProfileDrawer;
