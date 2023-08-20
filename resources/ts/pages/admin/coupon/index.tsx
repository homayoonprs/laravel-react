import React, {useEffect, useState} from 'react';
import Layout from '@/components/layouts/adminDashboard'
import {BreadcrumbType} from "@/components/UI/breadcrumb/breadcrumbInterface";
import {Button, Col, Dropdown, Pagination as ANTDPagination, Row, Statistic, Table, Tag, Modal, Form, Input, Radio, Switch, message, Spin, Select} from "antd";
import {ColumnsType} from "antd/es/table/interface";
import {userType} from "@/types/Models/user.type";
import {AuditOutlined, EyeOutlined, FilterTwoTone, MoreOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {couponType} from "@/types/Models/coupon.type";
import {IPaginationMeta} from "@/types/IPaginationMeta";
import gateway from "@/services/gateway";
import {CouponFilterDrawer} from "@/components/admin/coupon/couponFilterDrawer";
import {toSpatieFilterQuery} from "@/utils/laravelSpatieQueryBuilder";
import {deleteModal} from "@/components/UI/deleteModal/DeleteModal";
import { DatePicker } from '@/components/UI/datePicker';
import { DateObject } from 'react-multi-date-picker';
import { jalaliDateToGregorian } from '@/utils/helpers';
import moment from 'moment-jalaali';
import { usePermissions } from '@/hooks/usePermissions';
const Coupon = () => {

    const navigate = useNavigate()

    const [listLoading, setSetListLoading] = useState<boolean>(false)
    const [coupons, setCoupons] = useState<couponType[] | []>([])
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null)
    const [page, setPage] = useState<number>(1)
    const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false)
    const [couponsQuery, setCouponsQuery] = useState<string>('')
    const [apiErrors, setApiErrors] = useState<any>();
    const [showModal, setShowModal] = useState<boolean>(false)
    const [coupon, setCoupon] = useState<couponType|null>(null)
    const [fetchLoading, setFetchLoading] = useState<boolean>(false)
    const [startAt, setStartAt] = useState<string>('')
    const [expireAt, setExpireAt] = useState<string>('')
    const [fetchUsersLoading, setFetchUsersLoading] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [users, setUsers] = useState<userType[] | []>([])

    const [form] = Form.useForm();
    const [hasPermissionTo] = usePermissions();

    useEffect(() => {
        setSetListLoading(true);
        gateway.getCouponsList(page,couponsQuery).then(res => {
            let {data, links, meta} = res;
            setCoupons(data);
            setPaginationMeta({links, meta})
        }).finally(() => setSetListLoading(false))
    }, [page,couponsQuery])

    useEffect(() => {
        getUsers()
    },[])

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'داشتبورد',
            href: '/admin/home',
        },
        {
            label: 'لیست کد های تخفیف',
            href: '/admin/coupon'
        }
    ];

    const couponsTableColumns: ColumnsType<couponType> = [
        {
            title: 'عنوان',
            dataIndex: 'title'
        },
        {
            title: 'کد',
            dataIndex: 'code'
        },
        {
            title: '(تومان) مقدار',
            align: 'center',
            dataIndex: 'amount',
            render: (value) => <Statistic value={value} valueStyle={{fontSize: 12}} groupSeparator={'/'}/>
        },
        {
            title: '(تومان) سقف استفاده تا',
            align: 'center',
            dataIndex: 'max_discount',
            render: (value) => <Statistic value={value} valueStyle={{fontSize: 12}} groupSeparator={'/'}/>
        },
        {
            title: 'نوع',
            align: 'center',
            dataIndex: 'public',
            render: (value, record) => record.public ? <Tag color='magenta'>عمومی</Tag> : <Tag color='blue'>خصوصی</Tag>
        },
        {
            title: 'وضعیت',
            align: 'center',
            dataIndex: 'is_active',
            render: (value) => value ? <Tag color={'success'}>فعال</Tag> : <Tag color={'red'}>غیرفعال</Tag>
        },
        {
            title: 'تاریخ ایجاد',
            align: 'center',
            dataIndex: 'created_at',
        },
        {
            title: 'عملیات',
            align: 'center',
            className: hasPermissionTo('coupon_view') || hasPermissionTo('coupon_delete') ? '' : '!hidden',
            render: (value, record) => <Dropdown
                menu={{
                    items: [
                        {
                            key: 0,
                            label: fetchLoading ?  <Spin size='small'/> : 'نمایش جزئیات',
                            onClick: () => getCoupon(record.id),
                            className: hasPermissionTo('coupon_view') ? '' : '!hidden'
                        },
                        {
                            key: 0,
                            label: 'حذف',
                            danger: true,
                            className: hasPermissionTo('coupon_delete') ? '' : '!hidden',
                            onClick: () => {
                                deleteModal({
                                    title: `کدتخفیف ${record.title} حذف شود؟`,
                                    content: `در صورت تائید کدتخفیف ${record.title} حذف خواهد شد!`,
                                    onOk: () => handleDeleteCoupon(record)
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
        setCouponsQuery(toSpatieFilterQuery(allFields))
    }

    const onFilterFormReset = () => {
        setCouponsQuery('')
    }

    const toggleFilterDrawer = () => setShowFilterDrawer(!showFilterDrawer);

    const toggleModal = () => setShowModal(!showModal);

    const closeModal = () => {
        setShowModal(false)
        setApiErrors(null)
        form.resetFields()
        setStartAt('')
        setExpireAt('')
        setCoupon(null)
        setIsPublic(false)
    }

    const handleDeleteCoupon = (coupon: couponType) => {
        return gateway.deleteCoupon(coupon.id).then(res => setCoupons(coupons.filter(coupon => coupon.id != res.data.id)));
    }

    const onDateStartAtChange = (date: DateObject | DateObject[] | null) => {
        if (!date || Array.isArray(date)) return;
        let startAt = jalaliDateToGregorian(date).format('YYYY-MM-DD');
        setStartAt(startAt)
    }

    const onDateExpireAtChange = (date: DateObject | DateObject[] | null) => {
        if (!date || Array.isArray(date)) return;
        let expireAt = jalaliDateToGregorian(date).format('YYYY-MM-DD');
        setExpireAt(expireAt)
    }

    const handleStoreCouon = () => {

        setFetchLoading(true)
        gateway.storeCoupon({
            ...form.getFieldsValue(),
            starts_at: startAt,
            expire_at: expireAt
        }).then(res => {
            closeModal();
            message.success(` کدتخفیف: ${res.data.title} با موفقیت ساخته شد.`)
            setCoupons(prev => [
                ...prev,
                res.data,
            ])
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setFetchLoading(false))
    }

    const handleUpdateCoupon = () => {
        
        if(!coupon) return;
        console.log({
            starts_at: startAt,
            expire_at: expireAt
        });
        
        setFetchLoading(true)
        gateway.updateCoupon(coupon.id,{
            ...form.getFieldsValue(),
            starts_at: startAt,
            expire_at: expireAt
        }).then(res => {
            closeModal();
            message.info(`کدتخفیف: ${res.data.title} با موفقیت بروزرسانی.`)
            setCoupons(prev => prev.map(coupon => {
                return coupon.id === res.data.id ? res.data : coupon
            }))
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setFetchLoading(false))
    }



    const getCoupon = (couponID: string) => {
        setFetchLoading(true)
        gateway.getCoupon(couponID).then(res => {
            form.setFieldValue('users_id',res.data.users.map(user => user.id))
            form.setFieldsValue(res.data)
            setCoupon(res.data)
            toggleModal()
            setStartAt(moment(res.data.starts_at, 'jYYYY/jM/jD HH:mm').format('YYYY-MM-DD'));
            setExpireAt(moment(res.data.expire_at, 'jYYYY/jM/jD HH:mm').format('YYYY-MM-DD'));
            setIsPublic(res.data.public)
        }).finally(() => setFetchLoading(false))
    }

    const getUsers = (search: string = '') => {
        setFetchUsersLoading(true);
        gateway.getUsersList(1,`filter[name]=${search}`).then(res => {
            setUsers(res.data)
        }).finally(() => setFetchUsersLoading(false))
    }
    
    const renderModalFooterActionBTN = () => {
        if(coupon && hasPermissionTo('coupon_update')){
            return <Button loading={fetchLoading} onClick={handleUpdateCoupon} type='primary'>ویرایش</Button>
        }else if(!coupon && hasPermissionTo('coupon_create')){
            return <Button loading={fetchLoading} onClick={handleStoreCouon} type='primary'>افزودن</Button>
        }
        return ''
    }

    return (
        <Layout breadcrumb={breadcrumbs} extra={<Button icon={<FilterTwoTone />} onClick={toggleModal}>فیلتر</Button>}>
            <Row>

                <Col className={'mb-6 mt-3'}>
                    {
                        hasPermissionTo('coupon_create')
                            ? <Button type="primary" size='middle' icon={<PlusOutlined />} onClick={toggleModal}>
                                افزودن
                              </Button>
                            : ''
                    }
                </Col>

                <Col span={24}>
                    <Table
                        pagination={false}
                        loading={listLoading}
                        columns={couponsTableColumns}
                        dataSource={coupons}
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
            <CouponFilterDrawer onReset={onFilterFormReset} onClose={toggleFilterDrawer} onSubmit={onFilterSubmit} open={showFilterDrawer} />
            <Modal
                title={!coupon ? 'افزودن کد تخفیف جدید' : `نمایش جزئیات ${coupon.title}`}
                open={showModal}
                onCancel={closeModal}
                footer={
                    <div className='text-right'>
                        {renderModalFooterActionBTN()}
                        <Button onClick={closeModal}>لغو</Button>
                    </div>
                }
            >
                <Form layout='vertical' form={form}>
                    <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <Form.Item name='title' label='عنوان' validateStatus={apiErrors && apiErrors?.title ? 'error' : ''} help={apiErrors && apiErrors?.title ? apiErrors.title : ''}>
                                <Input placeholder='عنوان را وارد کنید'/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='code' label='کدتخفیف' validateStatus={apiErrors && apiErrors?.code ? 'error' : ''} help={apiErrors && apiErrors?.code ? apiErrors.code : ''}>
                                <Input placeholder='کدتخفیف را وارد کنید'/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='amount' label='مقدار' validateStatus={apiErrors && apiErrors?.amount ? 'error' : ''} help={apiErrors && apiErrors?.amount ? apiErrors.amount : ''}>
                                <Input placeholder='مقدار را وارد کنید'/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='minimum_purchase' label='حداقل خرید' validateStatus={apiErrors && apiErrors?.minimum_purchase ? 'error' : ''} help={apiErrors && apiErrors?.minimum_purchase ? apiErrors.minimum_purchase : ''}>
                                <Input placeholder='حداقل خرید برای اعمال کدتخفیف را وارد کنید'/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='max_discount' label='حداکثر تخفیف' validateStatus={apiErrors && apiErrors?.max_discount ? 'error' : ''} help={apiErrors && apiErrors?.max_discount ? apiErrors.max_discount : ''}>
                                <Input placeholder='حداکثر تخفیف کد را وار کنید'/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='max_usage' label='دفعات استفاده' validateStatus={apiErrors && apiErrors?.max_usage ? 'error' : ''} help={apiErrors && apiErrors?.max_usage ? apiErrors.max_usage : ''}>
                                <Input placeholder='تعداد دفعات استفاده کدتخفیف را وار کنید'/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={'public'} label='نوع کد' validateStatus={apiErrors && apiErrors?.type ? 'error' : ''} help={apiErrors && apiErrors?.type ? apiErrors.type : ''} valuePropName={'checked'}>
                                <Switch onChange={checked => setIsPublic(checked)} checkedChildren={'عمومی'} unCheckedChildren={'خصوصی'}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={'is_active'} label='وضعیت' validateStatus={apiErrors && apiErrors?.is_active ? 'error' : ''} help={apiErrors && apiErrors?.is_active ? apiErrors.is_active : ''} valuePropName={'checked'}>
                                <Switch checkedChildren={'فعال'} unCheckedChildren={'غیرفعال'} defaultChecked={false}/>
                            </Form.Item>
                        </Col>
                        {
                            !isPublic
                                ? <Col span={24}>
                                    <Form.Item name={'users_id'} label='کاربران هدف' validateStatus={apiErrors && apiErrors?.users_id ? 'error' : ''} help={apiErrors && apiErrors?.users_id ? apiErrors.users_id : ''}>
                                        <Select
                                            filterOption={false}
                                            showSearch={true}
                                            loading={fetchUsersLoading}
                                            onSearch={getUsers}
                                            fieldNames={{label: 'name', value: 'id'}}
                                            options={users}
                                            mode='multiple'
                                        />
                                    </Form.Item>
                                </Col>
                                : ''
                        }
                        <Col span={12}>
                            <Form.Item name='starts_at' label='تاریخ شروع' validateStatus={apiErrors && apiErrors?.starts_at ? 'error' : ''} help={apiErrors && apiErrors?.starts_at ? apiErrors.starts_at : ''}>
                                <DatePicker value={startAt} name='starts_at' onChange={onDateStartAtChange} placeholder='تاریخ شروع کدتخفیف را وار کنید'/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='expire_at' label='تاریخ انقضاء' validateStatus={apiErrors && apiErrors?.expire_at ? 'error' : ''} help={apiErrors && apiErrors?.expire_at ? apiErrors.expire_at : ''}>
                                <DatePicker value={expireAt} name='expire_at' onChange={onDateExpireAtChange} placeholder='تاریخ انقضاء کدتخفیف را وار کنید'/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='description' label='توضیحات' validateStatus={apiErrors && apiErrors?.description ? 'error' : ''} help={apiErrors && apiErrors?.description ? apiErrors.description : ''}>
                                <Input.TextArea placeholder='توضیحات کدتخفیف را وار کنید'/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Layout>
    )
}

export default Coupon;
