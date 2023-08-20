import Layout from '@/components/layouts/adminDashboard';
import { BreadcrumbType } from '@/components/UI/breadcrumb/breadcrumbInterface';
import { UserProfileForm } from '@/components/admin/user/userProfileForm';
import gateway from '@/services/gateway';
import React, { useEffect, useState } from 'react'
import { BsPerson } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { MdMailOutline, MdOutlineAccountBalanceWallet, MdOutlineDescription, MdOutlineReceiptLong, MdOutlineShoppingBag } from 'react-icons/md';
import { userType } from '@/types/Models/user.type';
import styles from './Detail.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {Card, Col, message, Row, Tabs} from "antd";
import type {Tab} from 'rc-tabs/lib/interface'
import {planType} from "@/types/Models/plan.type";
import {PlanForm} from "@/components/admin/plan/planForm";

const Detail = (props: any) => {

    const navigate = useNavigate();
    const urlParams = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [plan, setPlan] = useState<planType | null>(null)
    const [apiErrors, setApiErrors] = useState<any>();
    const [showPlanLoading, setShowPlanLoading] = useState<boolean>(!!urlParams.id);

    useEffect(() => {
        if (urlParams.id){
            gateway.getPlan(urlParams.id).then(res => {
                setPlan(res.data)
            }).finally(() => setShowPlanLoading(false))
        }
    },[])

    const handleStorePlan = (formData: any) => {
        console.log(formData)
        setIsLoading(true)
        gateway.storePlan(formData).then(res => {
            setPlan(res.data)
            setApiErrors(null)
            message.success(`پلن: ${res.data.name} با موفقیت ساخته شد.`)
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setIsLoading(false))
    }

    const handleUpdatePlan = (formData: any) => {
        if (!plan) return;
        setIsLoading(true)
        gateway.updatePlan(plan.id,formData).then(res => {
            setPlan(res.data)
            setApiErrors(null)
            message.info(`پلن: ${res.data.name} با موفقیت بروزرسانی شد.`)
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setIsLoading(false))
    }

    // Pill Navbar Items
    const tabListItems: Tab[] = [
        {
            key: '0',
            label: <span><BsPerson size={14} />اطلاعات اصلی</span>,
            children: <PlanForm loadPlanLoading={showPlanLoading} errors={apiErrors} loading={isLoading} onSubmitUpdate={handleUpdatePlan} onSubmitStore={handleStorePlan} plan={plan}/>
        }
    ];


    const breadcrumbItems: BreadcrumbType[] = [
        {label: 'داشتبورد', href: '/admin/home'},
        {label: 'لیست پلن ها', href: '/admin/plan'},
        {label: plan ? `ویرایش پلن ${plan.name}` : 'افزودن پلن'},
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
