import Layout from '@/components/layouts/adminDashboard';
import { BreadcrumbType } from '@/components/UI/breadcrumb/breadcrumbInterface';
import { UserProfileForm } from '@/components/admin/user/userProfileForm';
import gateway from '@/services/gateway';
import React, { useEffect, useState } from 'react'
import { BsPerson } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { MdMailOutline, MdOutlineAccountBalanceWallet, MdOutlineDescription, MdOutlineReceiptLong, MdOutlineShoppingBag } from 'react-icons/md';
import { userType } from '@/types/Models/user.type';
import {useNavigate, useParams} from "react-router-dom";
import {Card, Col, message, Row, Tabs} from "antd";
import type {Tab} from 'rc-tabs/lib/interface'
import {UserInvoices} from '@/components/admin/user/userInvoicesTab';
import { usePermissions } from '@/hooks/usePermissions';
import { UserAccountsTab } from '@/components/admin/user/userAccountsTab';

const Detail = (props: any) => {

    const navigate = useNavigate();
    const urlParams = useParams();
    const [hasPermissionTo] = usePermissions()

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<userType | null>(null)
    const [apiErrors, setApiErrors] = useState<any>();
    const [showUserLoading, setShowUserLoading] = useState<boolean>(!!urlParams.id);

    useEffect(() => {
        if (urlParams.id){
            gateway.getUser(urlParams.id).then(res => {
                setUser(res.data)
            }).finally(() => setShowUserLoading(false))
        }
    },[])

    const handleStoreUser = (formData: any) => {
        setIsLoading(true)
        gateway.storeUser(formData).then(res => {
            setUser(res.data)
            setApiErrors(null)
            message.success(`کاربر: ${res.data.name} با موفقیت ساخته شد.`)
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setIsLoading(false))
    }

    const handleUpdateUser = (formData: any) => {
        if (!user) return;
        setIsLoading(true)
        gateway.updateUser(user.id,formData).then(res => {
            setUser(res.data)
            setApiErrors(null)
            message.info(`کاربر: ${res.data.name} با موفقیت بروزرسانی شد.`)
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setIsLoading(false))
    }

    // Pill Navbar Items
    const tabListItems: Tab[] = [
        {
            key: '0',
            label: <span><BsPerson size={14} />اطلاعات شخصی</span>,
            children: <UserProfileForm loadUserLoading={showUserLoading} errors={apiErrors} loading={isLoading} onSubmitUpdate={handleUpdateUser} onSubmitStore={handleStoreUser} user={user}/>
        },
        {
            key: '1',
            disabled: !user,
            label: <span><MdOutlineReceiptLong size={14} />فاکتور ها</span>,
            children: user ? <UserInvoices user={user}/> : <p>ابتدا کاربر را ایجاد کنید</p>,
            className: hasPermissionTo('invoice_view_any') ? '' : '!hidden'
        },
        {
            key: '2',
            disabled: !user,
            label: <span><MdOutlineReceiptLong size={14} />اشتراک ها</span>,
            children: user ? <UserAccountsTab user={user}/> : <p>ابتدا کاربر را ایجاد کنید</p>,
            className: hasPermissionTo('account_view_any') ? '' : '!hidden'
        },
    ];


    const breadcrumbItems: BreadcrumbType[] = [
        {label: 'داشتبورد', href: '/admin/home'},
        {label: 'لیست کاربران', href: '/admin/user'},
        {label: user ? `ویرایش کاربر ${user.name}` : 'افزودن کاربر'},
    ]

    return (
        <Layout breadcrumb={breadcrumbItems}>
            <Row className='mt-6'>
                <Col span={24}>
                    <Card>
                        <Tabs
                            defaultActiveKey='2'
                            items={tabListItems}
                        />
                    </Card>
                </Col>
            </Row>
        </Layout>
    )
}

export default Detail;
