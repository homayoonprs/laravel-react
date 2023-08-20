import React, {useContext, useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'
import Sidebar from '@/components/admin/navigation/sidebar';
import Navbar from '@/components/admin/navigation/navbar';

import {FiUser} from 'react-icons/fi';
import {IoReceiptOutline} from 'react-icons/io5';
import {MdOutlineSecurity} from 'react-icons/md';


import {Col, Layout, Row} from 'antd';
import gateway from '@/services/gateway';
import {authContext} from "@/services/auth/useAuth";
import {NotificationDrawer} from "@/components/admin/notification";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {Content} from "antd/es/layout/layout";
import {Link, useNavigate} from "react-router-dom";
import Breadcrumb from "@/components/UI/breadcrumb";
import {BreadcrumbType} from "@/components/UI/breadcrumb/breadcrumbInterface";
import {BankOutlined, DollarCircleOutlined, PercentageOutlined} from "@ant-design/icons";
import { usePermissions } from '@/hooks/usePermissions';


interface LayoutProps {
    children: React.ReactNode,
    breadcrumb?: BreadcrumbType[]
    extra?: React.ReactNode
}

const DashboardLayout = ({children, ...props}: LayoutProps) => {
    
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [showNotifications, setShowNotifications] = useState<boolean>(false);

    const [hasPermissionTo] = usePermissions()

    const navigate = useNavigate();
    
    const menuItems: Array<ItemType> = [
        {
            label: 'کاربران',
            icon: <FiUser/>,
            key: 'user',
            onClick: () => navigate('/admin/user'),
            className: hasPermissionTo('user_view_any') ? '' : '!hidden'
        },
        {
            label: 'نقش ها',
            icon: <MdOutlineSecurity/>,
            key: 'role',
            onClick: () => navigate('/admin/role'),
            className: hasPermissionTo('role_view_any') ? '' : '!hidden'
        },
        {
            label: 'پلن ها',
            icon: <IoReceiptOutline/>,
            key: 'plan',
            onClick: () => navigate('/admin/plan'),
            className: hasPermissionTo('plan_view_any') ? '' : '!hidden'
        },
        {
            label: 'فاکتور ها',
            icon: <DollarCircleOutlined />,
            key: 'invoice',
            onClick: () => navigate('/admin/invoice'),
            className: hasPermissionTo('invoice_view_any') ? '' : '!hidden'
        },
        {
            label: 'کدهای تخفیف',
            icon: <PercentageOutlined />,
            key: 'coupon',
            onClick: () => navigate('/admin/coupon'),
            className: hasPermissionTo('coupon_view_any') ? '' : '!hidden'
        },
        {
            label: 'درگاه های پرداخت',
            icon: <BankOutlined />,
            key: 'gateway',
            onClick: () => navigate('/admin/gateway'),
            className: hasPermissionTo('gateway_view_any') ? '' : '!hidden'
        },
    ];

    return (
        <Layout hasSider className={styles.layout}>

            <Sidebar
                items={menuItems}
                logoSrc=''
                collapsed={collapsed}
                onCollapseClick={() => setCollapsed(!collapsed)}
            />

            <Content className={styles.content}>

                <Navbar onClickShowNotifications={() => setShowNotifications(true)} fixedOnScroll={false}/>
                <Content className={styles.main_content}>
                    {
                        props.breadcrumb
                            ?   <Row className={'mt-3 w-full'} justify={'space-between'}>
                                    <Col>
                                        <Breadcrumb items={props.breadcrumb}/>
                                    </Col>
                                    {
                                        props.extra
                                        ?   <Col>
                                                {props.extra}
                                            </Col>
                                        :   ''

                                    }
                                </Row>
                            :   ''
                    }

                    {children}

                </Content>

            </Content>


        </Layout>
    )
}

export default DashboardLayout;
