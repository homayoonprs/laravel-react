import Layout from '@/components/layouts/clientDashboard';
import gateway from '@/services/gateway';
import { invoiceType } from '@/types/Models/invoice.type';
import { transactionType } from '@/types/Models/transaction.type';
import { planType, planTypeField } from '@/types/Models/plan.type';
import { CoffeeOutlined, CustomerServiceOutlined, DeleteOutlined, FireOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined, ShoppingCartOutlined, SketchOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-components';
import { Affix, Badge, Button, Card, Col, Divider, FloatButton, Form, Input, InputNumber, Modal, Row, Segmented, Statistic, Steps, Table, Tabs, Typography } from 'antd';
import React, { FC, useEffect } from 'react'
import { useState } from 'react';
import { IoNavigateCircle } from 'react-icons/io5';
import { group } from 'console';

type invoiceLoadings = {
    id: string
    loading?: boolean
    incrementLoading?: boolean
    decerementLoading?: boolean
}

const Plan: FC = () => {
    const [form] = Form.useForm()
    const [fetchLoading, setFetchLoading] = useState<boolean>(false);
    const [couponLoading, setCouponLoading] = useState<boolean>(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
    
    const [couponError, setCouponError] = useState<string>('');

    const [plans, setPlans] = useState<planType[] | []>([]);

    const [planType, setPlanType] = useState<planTypeField>('vip')
    const [selectedPlans, setSelectedPlans] = useState<planType[] | []>([]);
    const [invoice, setInvoice] = useState<invoiceType|null>(null)

    const [addToinvoiceLoadings, setAddToinvoiceLoadings] = useState<invoiceLoadings[]|[]>([])

    const toggleModal = () => setShowInvoiceModal(!showInvoiceModal);

    useEffect(() => {
        setFetchLoading(true)
        gateway.publicGetPlans().then(res => {
            setPlans(res.data)
            setSelectedPlans(res.data.filter(plan => plan.type == planType))
            setAddToinvoiceLoadings(res.data.map(plan => ({ id: plan.id, loading: false})))
        })

        gateway.clientGetOpenInvoice().then(res => {
            setInvoice(res.data)
            if(res.data.coupon){
                form.setFieldValue('coupon_code',res.data.coupon.code)
            }
        }).finally(() => setFetchLoading(false))

    }, [])

    useEffect(() => {
        let targetPlans = plans.filter(plan => plan.type == planType);
        setSelectedPlans(targetPlans)
    },[planType])

    const attachCouponInvoice = () => {
        if(!invoice) return;
        setCouponLoading(true)

        
        gateway.clientAttachCouponToInvoice(invoice.id,form.getFieldValue('coupon_code')).then(res => {
            setInvoice(res.data)
            setCouponError('')
        }).catch(err => {
            setCouponError(err.response.data.message)
        }).finally(() => setCouponLoading(false))
    }

    const detachCouponInvoice = () => {
        if(!invoice) return;
        setCouponLoading(true)
        gateway.clientDetachCouponFrominvoice(invoice.id).then(res => {
            setInvoice(res.data)
        }).catch(err => {
            setCouponError(err.response.data.message)
        }).finally(() => setCouponLoading(false))
    }

    const addItemToInvoice = (plan: planType, customCount?: number|string, loadingKey: string = 'loading') => {
        let count = customCount ? customCount : form.getFieldValue(`count_${plan.id}`)

        setAddToinvoiceLoadings(prev => prev.map(i => {
            return i.id == plan.id ? {...i, [loadingKey]: true} : {...i}
        }))

        gateway.clientCreateAccountAndTransactionForInvoice(plan.id,{count}).then(res => {
            setInvoice(res.data)
        }).finally(() => setAddToinvoiceLoadings(prev => prev.map(i => {
            return i.id == plan.id ? {...i, [loadingKey]: false} : {...i}
        })))
    }

    const removeItemFromInvoice = (plan: planType, remove_only_one: string = '0', loadingKey: string = 'loading') => {
        setAddToinvoiceLoadings(prev => prev.map(i => {
            return i.id == plan.id ? {...i, [loadingKey]: true} : {...i}
        }))
        gateway.clientRemoveAccountAndTransactionFromInvoice(plan.id,remove_only_one).then(res => {
            setInvoice(res.data)
        }).finally(() => setAddToinvoiceLoadings(prev => prev.map(i => {
            return i.id == plan.id ? {...i, [loadingKey]: false} : {...i}
        })))
    }

    const incerementCount = (key: string, plan: planType, stored: boolean) => {
        if(stored){
            addItemToInvoice(plan, 1,'incrementLoading')
        }
        let prev = form.getFieldValue(key)
        form.setFieldValue(key, prev+1)
    }

    const decrementCount = (key: string, plan: planType, stored: boolean) => {
        if(stored){
            removeItemFromInvoice(plan, '1','decerementLoading')
        }
        let prev = form.getFieldValue(key)
        form.setFieldValue(key, prev-1)
    }


    const renderPlanCards = () => {
        return selectedPlans.map((plan, index) => {
            let totalAmount: string | number = 0
            let count = 1;
            let stored: boolean = false;
            if(invoice && invoice?.transactions){
                let plans = invoice?.transactions.filter(transaction => transaction.plan.id == plan.id).map(tr => tr.amount);
                totalAmount = plans.reduce((prev, current) => {
                    return prev + current
                },0);
                count = plans.length > 0 ? plans.length : 1
                stored = plans.length > 0
            }
            form.setFieldValue('count_'+plan.id, count)
            let addToinvoiceLoading = addToinvoiceLoadings.filter(i => i.id === plan.id)[0]
            
            return (
                <Card bodyStyle={{height: '100%'}} className='shadow !h-full' key={index}>
                    <Row align={'stretch'} className='!h-full'>
                        <Col span={24}>
                            <Row gutter={[0,16]} align={'stretch'}  justify={'space-around'}>
                                <Col span={24}>
                                    <h3 className='p-0 m-0 text-center text-base'>{plan.name}</h3>
                                    <p className='text-center mt-2'>با خرید این اشتراک شما <strong>{plan.days}</strong> روز رایگان دریافت میکنید</p>
                                </Col>
                                <Divider/>
                                <Col span={24} className='h-36 overflow-hidden'>
                                    <p dangerouslySetInnerHTML={{__html: plan.description}}></p>
                                </Col>
                                <Divider/>
                                <Col>
                                    <Statistic valueStyle={{fontSize: '14px'}} title="قیمت هر اشتراک (تومان)" value={plan.price} decimalSeparator={','} />
                                </Col>
                                <Col>
                                    <Statistic valueStyle={{fontSize: '14px'}} title="مجموع (تومان)" value={totalAmount} decimalSeparator={','} />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                        <Divider/>
                            <Row justify={'space-around'}>
                                <Col>
                                    <Form.Item label='تعداد'>
                                        <Input.Group compact>
                                            <Button loading={addToinvoiceLoading.decerementLoading} onClick={() => decrementCount('count_'+plan.id, plan, stored)} icon={<MinusOutlined />}/>
                                            <Form.Item name={'count_'+plan.id} noStyle>
                                                <InputNumber onChange={e => form.setFieldValue('count_'+plan.id, e)} style={{width: '50px'}} />
                                            </Form.Item>
                                            <Button loading={addToinvoiceLoading.incrementLoading} onClick={() => incerementCount('count_'+plan.id, plan, stored)} icon={<PlusOutlined />}/>
                                        </Input.Group>
                                    </Form.Item>
                                </Col>
                                <Col className='mt-7'>
                                    {
                                        stored
                                            ? <Button loading={addToinvoiceLoading.loading} onClick={() => removeItemFromInvoice(plan)} danger>حذف از سبد خرید</Button>
                                            : <Button loading={addToinvoiceLoading.loading} onClick={() => addItemToInvoice(plan)} type='primary'>افزودن به سبد خرید</Button>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    
                    
                    </Row>

                </Card>
            )
        })
    }

    const renderInvoiceCouponActionBTN = () => {

        if(invoice?.coupon){
            return <Button loading={couponLoading} onClick={detachCouponInvoice} type="primary" danger>حذف کد</Button>
        }else{
            return <Button loading={couponLoading} onClick={attachCouponInvoice} type="primary" >اعمال کد</Button>
        }
    }

    
    
    const groupeditems = () => {
        let groups = invoice?.transactions.reduce((acc: any, value) => {
            // Group initialization
            if (!acc[value.plan.name]) {
                acc[value.plan.name] = [];
            }
            // Grouping
            acc[value.plan.name].push(value);
          
            return acc;
          }, {});
          
          let data =  typeof groups != 'undefined' ? Object.entries(groups).map((i:any) => ({
            name: i[0],
            transactions: i[1]
          })) : []
          console.log(data);
          return data;
          

    }
    
    
    return (
        <Layout>
           
            <PageContainer>
                <Form form={form} layout='vertical'>
                    <Row justify='center'>
                        <Col span={24}>
                            <Row gutter={[16,16]} justify={'center'}>
                                <Col>
                                    <Tabs
                                        size='large'
                                        onChange={e => {
                                            setPlanType(e as planTypeField)
                                        }}
                                        items={[
                                            {
                                                key: 'vip',
                                                label: (<span><FireOutlined /> vip</span>),
                                            },
                                            {
                                                key: 'dedicated',
                                                label: (<span><ThunderboltOutlined /> اختصاصی</span>),
                                            },
                                            {
                                                key: 'normal',
                                                label: (<span><CoffeeOutlined /> معمولی</span>),
                                            },
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {renderPlanCards()}
                            </div>
                        </Col>

                        <div className='fixed left-7 bottom-7'>
                            <Badge count={invoice?.transactions.length}>
                                <Button
                                    onClick={toggleModal}
                                    type="primary"
                                    size='large'
                                    icon={<ShoppingCartOutlined size={34}/>}
                                >
                                    مشاهده سبد خرید
                                </Button>
                            </Badge>
                            <Modal
                                onCancel={toggleModal}
                                open={showInvoiceModal}
                                title='سبد خرید شما'
                                footer={[
                                    <Button block disabled={!invoice?.transactions.length} type='primary'>پرداخت</Button>
                                ]}
                            >
                                <Row align='middle' justify='space-between' gutter={[0,24]}>
                                    <Col span={24}>
                                        <Table
                                            columns={[
                                                {
                                                    title: 'نام پکیج',
                                                    dataIndex: 'name',
                                                    render: (value) => <Typography.Text style={{width: 130}} ellipsis={{tooltip: value}}>{value}</Typography.Text>
                                                },
                                                {
                                                    title: 'قیمت (تومان)',
                                                    align: 'center',
                                                    render: (value, item) => <Statistic  valueStyle={{fontSize: 12}} value={item.transactions.reduce((prev, curr) => {return prev+curr.amount},0)} decimalSeparator=','/>
                                                },
                                                {
                                                    title: 'تعداد',
                                                    align: 'center',
                                                    render: (value, item) => (
                                                        <Input.Group compact>
                                                            <Button loading={addToinvoiceLoadings.filter(i => i.id === item.transactions[0].plan.id)[0].decerementLoading} onClick={() => decrementCount('count_'+item.transactions[0].plan.id, item.transactions[0].plan, true)} icon={<MinusOutlined />}/>
                                                            <Form.Item name={'count_'+item.transactions[0].plan.id} noStyle>
                                                                <InputNumber onChange={e => form.setFieldValue('count_'+item.transactions[0].plan.id, e)} style={{width: '40px'}} />
                                                            </Form.Item>
                                                            <Button loading={addToinvoiceLoadings.filter(i => i.id === item.transactions[0].plan.id)[0].incrementLoading} onClick={() => incerementCount('count_'+item.transactions[0].plan.id, item.transactions[0].plan, true)} icon={<PlusOutlined />}/>
                                                        </Input.Group>
                                                    )
                                                },
                                                {
                                                    title: 'حذف',
                                                    align: 'center',
                                                    dataIndex: 'plan_id',
                                                    render: (value, item) => <Button loading={addToinvoiceLoadings.filter(i => i.id === item.transactions[0].plan.id)[0].decerementLoading} onClick={() => removeItemFromInvoice(item.transactions[0].plan)} icon={<DeleteOutlined />} danger/>
                                                }
                                            ]}
                                            dataSource={groupeditems()}
                                            pagination={false}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item validateStatus={couponError ? 'error' : ''} help={couponError ? couponError : ''}>
                                            <Input.Group compact >
                                                <Form.Item noStyle name={'coupon_code'}>
                                                    <Input 
                                                        style={{ width: 'calc(100% - 80px)' }}
                                                        placeholder='کد تخفیف مورد نظر را وارد کنید' 
                                                    />
                                                </Form.Item>
                                                {renderInvoiceCouponActionBTN()}
                                            </Input.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Statistic key={0} title="مبلغ کل (تومان):" value={invoice?.total_amount || 0} decimalSeparator={','} />
                                    </Col>
                                    <Col >
                                        <Statistic key={0} title=" تخفیف (تومان):" value={invoice?.discount || 0} decimalSeparator={','} />
                                    </Col>
                                    <Col >
                                        <Statistic key={0} title="قابل پرداخت (تومان):" value={invoice?.payable || 0} decimalSeparator={','} />
                                    </Col>
                                    <Divider/>
                                </Row>
                            </Modal>
                        </div>

                    
                    </Row>
                </Form>           
            </PageContainer>
        </Layout>
    )
}

export default Plan;