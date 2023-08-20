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
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Button, Card, Col, Descriptions, Divider, Form, Input, message, Row, Select, Statistic, Switch, Tabs} from "antd";
import type {Tab} from 'rc-tabs/lib/interface'
import { InvoiceForm } from '@/components/admin/invoice/invoiceForm';
import { PageContainer } from '@ant-design/pro-components';
import { invoiceType } from '@/types/Models/invoice.type';
import { TransactionCard } from '@/components/admin/transaction';
import { transactionType } from '@/types/Models/transaction.type';
import {v4 as uuidv4} from 'uuid'
import { ITransactionCard } from '@/components/admin/transaction/transactionCard/ITransactionCard';
import { usePermissions } from '@/hooks/usePermissions';

const Detail = () => {

    const navigate = useNavigate();
    const [urlSearchParams, setSearchParams] = useSearchParams();
    const urlParams = useParams();
    const [form] = Form.useForm()
    const [hasPermissionTo] = usePermissions()

    // Loadings
    const [fetchCouponLoading, setFetchCouponLoading] = useState<boolean>(false);

    const [loadInvoiceLoading, setLoadingLoading] = useState<boolean>(false)
    const [fetchLoadin, setFetchLoading] = useState<boolean>(false)
    const [fetchUsersLoading, setFetchUsersLoading] = useState<boolean>(false);

    const [users, setUsers] = useState<userType[] | []>([])
    const [targetUser, setTargetUser] = useState<userType|null>(null)

    const [createTransactionCards, setCreateTransactionCards] = useState<string[] | []>([])

    const [invoice, setInvoice] = useState<invoiceType | null>(null)
    const [apiErrors, setApiErrors] = useState<any>();
    const [couponCode, setCouponCode] = useState<string>('')
    const [couponError, setCouponError] = useState<string>('')
    
    useEffect(() => {
        if (urlParams.id){
            setLoadingLoading(true)
            gateway.getInvoice(urlParams.id).then(res => {
                form.setFieldsValue({
                    ...res.data,
                    user_id: res.data.user.id
                })
                setInvoice(res.data)
                let {coupon} = res.data;
                if(coupon){
                    setCouponCode(coupon.code);
                }
            }).finally(() => setLoadingLoading(false))
        }
    },[])

    useEffect(() => {
        getUsers()
    }, [])



    const handleStoreInvoice = () => {
        setFetchLoading(true)
        
        gateway.storeInvoice(form.getFieldsValue()).then(res => {
            setInvoice(res.data)
            setApiErrors(null)
            message.success(`فاکتور کاربر: ${res.data.user.name} با موفقیت ساخته شد.`)
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setFetchLoading(false))
    }

    const handleUpdateInvoice = () => {
        if (!invoice) return;
        setFetchLoading(true)
        gateway.updateInvoice(invoice.id,{
            coupon_id: invoice.coupon?.id,
            payment_at: invoice.payment_at,
            gateway_id: invoice.gateway?.id,
            ...form.getFieldsValue()
        }).then(res => {
            setInvoice(res.data)
            setApiErrors(null)
            message.info(` فاکتور با موفقیت بروزرسانی شد.`)
        }).catch(err => {

            setApiErrors(err.response.data.errors)
        }).finally(() => setFetchLoading(false))
    }

    const getUsers = (search: string = '') => {
        setFetchUsersLoading(true);
        gateway.getUsersList(1,
            `filter[name]=${search}${urlSearchParams.has('user_id') ? '&filter[id]='+urlSearchParams.get('user_id') : ''}`
        ).then(res => {
            setUsers(res.data)
            
            if(urlSearchParams.has('user_id')){
                form.setFieldValue('user_id',res.data[0].id)
            }

        }).finally(() => setFetchUsersLoading(false))
    }

    const renderTransactionCards = () => {

        if(!invoice || typeof invoice.transactions == 'undefined' ) return;

        return invoice.transactions.map((transaction, index) => (
            <Col span={8} key={transaction.id}>
                <TransactionCard
                    invoice={invoice}
                    transaction={transaction}
                    handleDeleteTransaction={handleDeleteTransaction}
                    onSubmit={(invoice) => {
                        setInvoice(invoice)
                    }}
                    onUpdate={(invoice) => {
                        setInvoice(invoice)
                    }}
                />
            </Col>)
        )

    }

    const renderCreateTransactionCards = () => {

        if(!invoice || !hasPermissionTo('invoice_create')) return;        
        
        return createTransactionCards.map((item, index) => (
            <Col span={8} key={item}>
                <TransactionCard
                    uuid={item}
                    onSubmit={(invoice) => {
                        setInvoice(invoice)
                        handleDeleteTransaction(undefined, item)
                    }}
                    onUpdate={(invoice) => {
                        setInvoice(invoice)
                    }}
                    invoice={invoice}
                    handleDeleteTransaction={handleRemoveCreateTransactionCard}
                />
            </Col>
        ))

    }

    const handleDeleteTransaction = (invoice?: invoiceType, uuid?: string) => {
        if(invoice){
            setInvoice(invoice)
        }
        if(uuid){
            handleRemoveCreateTransactionCard(undefined,uuid)
        }
    }

    const addTransactionCard = () => {
        if(!hasPermissionTo('invoice_create')) return;
        setCreateTransactionCards(prev => [
            ...prev,
            uuidv4()
        ])
        
    }

    const handleRemoveCreateTransactionCard = (invoice?: invoiceType, uuid?: string) => {
        setCreateTransactionCards(prev => prev.filter(p => p != uuid))
    }

    const attachCouponToFactor = () => {
        if(!invoice){
            message.info('لطفا ابتدا فاکتور را ساخته و سپس کد تخفیف را اعمال کنید')
            return;
        }

        setFetchCouponLoading(true)
        gateway.attachCouponToinvoice(invoice.id, couponCode).then(res => {
            message.success('کد تخفیف اعمال شد.')
            setInvoice(res.data)
            setCouponError('')
        }).catch(err => {
            console.log(err.response.data.message);
            setCouponError(err.response.data.message)
        }).finally(() => setFetchCouponLoading(false))

    }

    const detachCouponToFactor = () => {
        if(!invoice) return;

        setFetchCouponLoading(true)
        gateway.detachCouponFrominvoice(invoice.id).then(res => {
            message.info('کد تخفیف حذف شد.')
            setInvoice(res.data)
            setCouponError('')
        }).catch(err => {
            console.log(err);
        }).finally(() => setFetchCouponLoading(false))
    }


    const breadcrumbItems: BreadcrumbType[] = [
        {label: 'داشتبورد', href: '/admin/home'},
        {label: 'لیست فاکتور ها', href: '/admin/invoice'},
        {label: invoice ? `ویرایش فاکتور کاربر ${invoice.user.name}` : 'افزودن فاکتور'},
    ]
    
    const renderInvoiceCouponActionBTN = () => {

        if(!hasPermissionTo('invoice_update') || !hasPermissionTo('invoice_create')) return '';

        if(invoice?.coupon){
            return <Button loading={fetchCouponLoading} onClick={detachCouponToFactor} type="primary" danger>حذف کد</Button>
        }else{
            return <Button loading={fetchCouponLoading} onClick={attachCouponToFactor} type="primary" >اعمال کد</Button>
        }
    }

    const renderInvoiceActionBTN = () => {
        if(invoice && hasPermissionTo('invoice_update')){
            return <Button loading={fetchLoadin} onClick={handleUpdateInvoice} type='primary'>ویرایش ‍</Button>
        }else if(!invoice && hasPermissionTo('invoice_create')){
            return <Button loading={fetchLoadin} onClick={handleStoreInvoice} type='primary'>ثبت و ادامه</Button>
        }
        return ''
    }


    return (
        <Layout breadcrumb={breadcrumbItems}>
            <PageContainer
                loading={loadInvoiceLoading}
                className={'mb-9'}
                childrenContentStyle={{margin: 0, padding: 0, paddingBlock: 0, paddingInline: 0}}
                content={
                    <Descriptions column={3}>
                        <Descriptions.Item>
                            <Statistic title="مبلغ کل (تومان)" value={invoice?.total_amount || 0} decimalSeparator=","/>
                        </Descriptions.Item>
                        <Descriptions.Item>
                            <Statistic title="(تومان) تخفیف" value={invoice?.discount || 0} decimalSeparator=","/>
                        </Descriptions.Item>
                        <Descriptions.Item>
                            <Statistic title="(تومان) قابل پرداخت" value={invoice?.payable || 0} decimalSeparator=","/>
                        </Descriptions.Item>
                    </Descriptions>
                }
            >
                <Row gutter={[0,16]}>
                    <Col span={24}>
                        <Card>
                            <Form layout='vertical' form={form}>
                                <Row gutter={[16,0]}>
                                    <Col span={16}>
                                        <Row gutter={[16,0]}>
                                            <Col span={12}>
                                                <Form.Item name='user_id' label="کاربر" validateStatus={apiErrors && apiErrors.user_id ? 'error' : ''} help={apiErrors && apiErrors.user_id ? apiErrors.user_id : ''}>
                                                    <Select
                                                        onChange={(value, option) => {
                                                            setTargetUser(option as userType)
                                                        }}
                                                        filterOption={false}
                                                        showSearch={true}
                                                        loading={fetchUsersLoading}
                                                        onSearch={getUsers}
                                                        fieldNames={{label: 'name', value: 'id'}}
                                                        options={users}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="coupon" label="کد تخفیف" validateStatus={couponError ? 'error' : ''} help={couponError ? couponError : ''}>
                                                    <Input.Group compact>
                                                        <Input 
                                                            style={{ width: 'calc(100% - 80px)' }}
                                                            placeholder='کد تخفیف مورد نظر را وارد کنید' 
                                                            value={couponCode}
                                                            onChange={e => {
                                                                setCouponCode(e.target.value)
                                                            }}
                                                        />
                                                        {
                                                            renderInvoiceCouponActionBTN()
                                                        }
                                                    </Input.Group>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={16}>
                                        <Row gutter={[16,0]}>
                                            <Col span={12}>
                                                <Form.Item name="description" label="توضیحات">
                                                    <Input.TextArea placeholder='توضیحات فاکتور را وارد کنید' />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Divider/>
                                    <Col span={24}>
                                        {
                                            renderInvoiceActionBTN()
                                        }
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={24} className="mb-9">
                        <Card title="اشتراک های فاکتور">
                            <Row gutter={[16,16]}>
                                {renderTransactionCards()}
                                {renderCreateTransactionCards()}
                                <Col span={8} className='flex flex-1 justify-center'>
                                    <Button disabled={!invoice} className='my-11' size='large' onClick={addTransactionCard} type='primary'>افزودن آیتم</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </PageContainer>
        </Layout>
    )
}

export default Detail;
