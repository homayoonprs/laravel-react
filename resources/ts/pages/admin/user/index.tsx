import Layout from '@/components/layouts/adminDashboard';
import {BreadcrumbType} from '@/components/UI/breadcrumb/breadcrumbInterface';
import gateway from '@/services/gateway';
import React, {ReactElement, useEffect, useState} from 'react'
import {userType} from '@/types/Models/user.type';
import {IPaginationMeta} from '@/types/IPaginationMeta';
import {Link, useNavigate} from "react-router-dom";
import {
    Badge,
    Button, Checkbox,
    Col,
    Drawer,
    Dropdown,
    Form,
    Input,
    Pagination as ANTDPagination,
    Pagination,
    Row, Select,
    Table,
    Tag
} from "antd";
import {ColumnsType} from "antd/es/table/interface";
import {AuditOutlined, EyeOutlined, FilterTwoTone, MoreOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import UserMinimalProfileDrawer from "@/components/admin/user/minimalProfileDrawer";
import {UserFilterDrawer} from "@/components/admin/user/userFilterDrawer";
import {FieldData} from "rc-field-form/lib/interface";
import {toSpatieFilterQuery} from "@/utils/laravelSpatieQueryBuilder";
import { usePermissions } from '@/hooks/usePermissions';

const breadcrumbItems: BreadcrumbType[] = [
    {label: 'داشتبورد', href: '/admin/home'},
    {label: 'لیست کاربران'},

]

const User = () => {

    const [users, setUsers] = useState<userType[] | []>([])
    const [page, setPage] = useState<number>(1)
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false)
    const [usersQuery, setUsersQuery] = useState<string>('')


    const navigate = useNavigate()
    const [hasPermissionTo] = usePermissions()

    useEffect(() => {
        setLoading(true);
        gateway.getUsersList(page,usersQuery).then(res => {
            let {data, links, meta} = res;
            setUsers(data);
            setPaginationMeta({links, meta})
        }).finally(() => setLoading(false))
    }, [page,usersQuery])

    const usersTableColumns: ColumnsType<userType> = [
        {
            title: 'نام',
            dataIndex: 'name'
        },
        {
            title: 'نقش کاربر',
            render: (value, record) => record.roles.length ? record.roles.map(r => r.label).join(' - ') : 'کاربر'
        },
        {
            title: 'وضعیت',
            render: (value, record) => (record.email_verified_at ? <Tag color={"success"}>فعال</Tag> : <Tag color={"error"}>غیرفعال</Tag>)
        },
        {
            title: 'ایمیل',
            dataIndex: 'email',
        },
        {
            title: 'نوع کاربر',
            dataIndex: 'account_type',
            render: (value, record) => (record.account_type == 'business' ? <Tag  icon={<AuditOutlined/>}>حقوقی</Tag> : <Tag icon={<UserOutlined/>}> حقیقی</Tag>)
        },
        {
            title: 'تاریخ ثبت نام',
            dataIndex: 'created_at',
        },
        {
            title: 'عملیات',
            className: hasPermissionTo('user_view') ? '' : '!hidden',
            render: (value, record) => <Button onClick={() => navigate(`/admin/user/edit/${record.id}`)} icon={<EyeOutlined />}/>
        },
    ]

    const onFilterSubmit = (allFields: any) => {
        setUsersQuery(toSpatieFilterQuery(allFields))
    }

    const onFilterFormReset = () => {
        setUsersQuery('')
    }

    const toggleFilterDrawer = () => setShowFilterDrawer(!showFilterDrawer);

    return (
        <Layout breadcrumb={breadcrumbItems} extra={<Button icon={<FilterTwoTone />} onClick={toggleFilterDrawer}>فیلتر</Button>}>

            <Row>
                <Col className={'mb-6 mt-3'}>
                    {
                        hasPermissionTo('user_create')
                            ? <Button type="primary" size='middle' icon={<PlusOutlined />} onClick={() => navigate('/admin/user/create')}>
                                افزودن
                              </Button>
                            : ''
                    }
                </Col>
                <Col span={24}>
                    <Table
                        pagination={false}
                        loading={loading}
                        columns={usersTableColumns}
                        dataSource={users}
                        scroll={{x: 800}}
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
                                showSizeChanger={false}
                                
                            />
                        </Col>
                        : ''
                }
            </Row>
            <UserFilterDrawer onReset={onFilterFormReset} onClose={toggleFilterDrawer} onSubmit={onFilterSubmit} open={showFilterDrawer} />
        </Layout>
    )
}

export default User;
