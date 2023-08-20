import React, {useEffect, useState} from 'react';
import Layout from '@/components/layouts/adminDashboard'
import {BreadcrumbType} from "@/components/UI/breadcrumb/breadcrumbInterface";
import {Button, Col, Dropdown, message, Pagination as ANTDPagination, Row, Statistic, Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table/interface";
import {userType} from "@/types/Models/user.type";
import {AuditOutlined, EyeOutlined, FilterTwoTone, MoreOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {planType} from "@/types/Models/plan.type";
import {IPaginationMeta} from "@/types/IPaginationMeta";
import gateway from "@/services/gateway";
import {PlanFilterDrawer} from "@/components/admin/plan/planFilterDrawer";
import {toSpatieFilterQuery} from "@/utils/laravelSpatieQueryBuilder";
import {deleteModal} from "@/components/UI/deleteModal/DeleteModal";
import { usePermissions } from '@/hooks/usePermissions';
const Plan = () => {

    const planTypeTranslator = {
        'dedicated': 'اختصاصی',
        'vip': 'vip',
        'normal': 'معمولی'
    };

    const navigate = useNavigate()
    const [hasPermissionTo] = usePermissions()

    const [listLoading, setSetListLoading] = useState<boolean>(false)
    const [plans, setPlans] = useState<planType[] | []>([])
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null)
    const [page, setPage] = useState<number>(1)
    const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false)
    const [plansQuery, setPlansQuery] = useState<string>('')

    useEffect(() => {
        setSetListLoading(true);
        gateway.getPlansList(page,plansQuery).then(res => {
            let {data, links, meta} = res;
            setPlans(data);
            setPaginationMeta({links, meta})
        }).finally(() => setSetListLoading(false))
    }, [page,plansQuery])

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'داشتبورد',
            href: '/admin/home',
        },
        {
            label: 'لیست پلن ها',
            href: '/admin/plan'
        }
    ];

    const plansTableColumns: ColumnsType<planType> = [
        {
            title: 'عنوان',
            dataIndex: 'name'
        },
        {
            title: 'روز',
            dataIndex: 'days'
        },
        {
            title: 'روز های رایگان',
            dataIndex: 'free_days'
        },
        {
            title: 'نوع',
            dataIndex: 'type',
            render: (value, record) => planTypeTranslator[record.type]
        },
        {
            title: 'وضعیت',
            dataIndex: 'is_active',
            render: (value) => value ? <Tag color={'success'}>فعال</Tag> : <Tag color={'red'}>غیرفعال</Tag>
        },
        {
            title: 'قیمت (تومان)',
            dataIndex: 'price',
            render: (value) => <Statistic value={value} valueStyle={{fontSize: 12}} groupSeparator={'/'}/>
        },
        {
            title: 'تاریخ ایجاد',
            dataIndex: 'created_at',
        },
        {
            title: 'عملیات',
            className: hasPermissionTo('plan_view') || hasPermissionTo('plan_delete') ? '' : '!hidden',
            render: (value, record) => <Dropdown
                menu={{
                    items: [
                        {
                            key: 0,
                            label: 'نمایش جزئیات',
                            className: hasPermissionTo('plan_view') ? '' : '!hidden',
                            onClick: () => navigate(`/admin/plan/edit/${record.id}`)
                        },
                        {
                            key: 0,
                            label: 'حذف',
                            danger: true,
                            className: hasPermissionTo('plan_delete') ? '' : '!hidden',
                            onClick: () => {
                                deleteModal({
                                    title: `پلن ${record.name} حذف شود؟`,
                                    content: `در صورت تائید پلن ${record.name} حذف خواهد شد!`,
                                    onOk: () => handleDeletePlan(record)
                                })
                            }
                        }
                    ]
                }}
            >
                <Button icon={<MoreOutlined/>}/>
            </Dropdown>
        },
    ]

    const onFilterSubmit = (allFields: any) => {
        setPlansQuery(toSpatieFilterQuery(allFields))
    }

    const onFilterFormReset = () => {
        setPlansQuery('')
    }

    const toggleFilterDrawer = () => setShowFilterDrawer(!showFilterDrawer);

    const handleDeletePlan = (plan: planType) => {
        return gateway.deletePlan(plan.id).then(res => setPlans(plans.filter(plan => plan.id != res.data.id))).catch(err => message.warning(err.response.data.message));
    }

    return (
        <Layout breadcrumb={breadcrumbs} extra={<Button icon={<FilterTwoTone />} onClick={toggleFilterDrawer}>فیلتر</Button>}>
            <Row>

                <Col className={'mb-6 mt-3'}>
                    {
                        hasPermissionTo('plan_create')
                            ? <Button type="primary" size='middle' icon={<PlusOutlined />} onClick={() => navigate('/admin/plan/create')}>
                                افزودن
                            </Button>
                            : ''
                    }
                </Col>

                <Col span={24}>
                    <Table
                        pagination={false}
                        loading={listLoading}
                        columns={plansTableColumns}
                        dataSource={plans}
                    />
                </Col>
            </Row>

            <Row justify="center" align="bottom" className="mt-6 mb-6">
                {
                    paginationMeta && paginationMeta.meta.last_page > 1
                        ?  <Col>
                            <ANTDPagination
                                onChange={(current,size) => {
                                    setPage(current)
                                }}
                                current={paginationMeta.meta.current_page}
                                total={paginationMeta.meta.total}
                                pageSize={paginationMeta.meta.per_page}
                            />
                        </Col>
                        : ''
                }
            </Row>
            <PlanFilterDrawer onReset={onFilterFormReset} onClose={toggleFilterDrawer} onSubmit={onFilterSubmit} open={showFilterDrawer} />
        </Layout>
    )
}

export default Plan;
