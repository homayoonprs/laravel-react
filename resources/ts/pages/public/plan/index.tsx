import Layout from "@/components/layouts/publicDashboard";
import gateway from "@/services/gateway";
import { invoiceType } from "@/types/Models/invoice.type";
import {transactionType} from "@/types/Models/transaction.type";
import { planType, planTypeField } from "@/types/Models/plan.type";
import { CoffeeOutlined, DeleteOutlined, FireOutlined, ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { Badge, Button, Card, Col, Divider, Form, Input, Modal, Row, Statistic, Table, Tabs, Typography, message } from "antd";
import React, { useEffect, useState } from "react";

const PublicHome = () => {
    const [form] = Form.useForm()
    const [fetchLoading, setFetchLoading] = useState<boolean>(false);
    const [couponLoading, setCouponLoading] = useState<boolean>(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
    const [storeLoading, setStoreLoading] = useState<boolean>(false)
    const [couponError, setCouponError] = useState<string>('');

    const [plans, setPlans] = useState<planType[] | []>([]);

    const [planType, setPlanType] = useState<planTypeField>('vip')
    const [selectedPlans, setSelectedPlans] = useState<planType[] | []>([]);
    const [invoice, setInvoice] = useState<invoiceType|null>(null)
    const [cart, setCart] = useState<planType[] | []>([])
    const [apiErrors, setApiErrors] = useState<any>(null)

    const toggleModal = () => setShowInvoiceModal(!showInvoiceModal);

    useEffect(() => {
        setFetchLoading(true)
        gateway.publicGetPlans().then(res => {
            setPlans(res.data)
            setSelectedPlans(res.data.filter(plan => plan.type == planType))
        }).finally(() => setFetchLoading(false))

    }, [])

    useEffect(() => {
        let targetPlans = plans.filter(plan => plan.type == planType);
        setSelectedPlans(targetPlans)
    },[planType])

    const storeInvoice = () => {
        if(!cart.length) {
            message.info('لطفا ابتدا یک یا چند پلن برای خرید اتخاب کنید!')
            return;
        }
        setStoreLoading(true)
        let data = {
            ...form.getFieldsValue(),
            plans_id: cart.map(c => c.id)
        }
        gateway.publicCreateFirstInvoice(data).then(res => {
            setInvoice(res.data)
            setApiErrors(null)
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setStoreLoading(false))
    }

    const removeItemFromCart = (plan: planType) => {
        setCart(prev => prev.filter(p => p.id !== plan.id))
    }

    const addItemToCart = (plan: planType) => {
        setCart(prev => [
            ...prev,
            plan
        ])
    }

    const renderPlanCards = () => {
        return selectedPlans.map((plan, index) => {
            const stored = cart.filter(c => c.id == plan.id).length > 0;
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
                                    <Statistic valueStyle={{fontSize: '14px'}} title="قیمت (تومان)" value={plan.price} decimalSeparator={','} />
                                </Col>
                                <Col>
                                    {
                                        stored
                                            ? <Button onClick={() => removeItemFromCart(plan)} danger>حذف از سبد خرید</Button>
                                            : <Button onClick={() => addItemToCart(plan)} type='primary'>افزودن به سبد خرید</Button>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    
                    
                    </Row>

                </Card>
            )
        })
    }

    const getTotalCartAmount = () => {
        return cart.reduce((prev, curr) => {
            return prev + curr.price
        },0)
    }

    return (
        <Layout>
            <PageContainer loading={fetchLoading}>
                
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
                            <Badge count={cart.length}>
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
                                    <Button loading={storeLoading} block onClick={storeInvoice} type='primary'>پرداخت</Button>
                                ]}
                            >
                                <Row align='middle' justify='space-between' gutter={[0,24]}>
                                    <Col span={24}>
                                        <Table<planType>
                                            columns={[
                                                {
                                                    title: 'نام پکیج',
                                                    render: (value, plan) => <Typography.Text style={{width: 130}} ellipsis={{tooltip: plan.name}}>{plan.name}</Typography.Text>
                                                },
                                                {
                                                    title: 'قیمت (تومان)',
                                                    align: 'center',
                                                    render: (value, plan) => <Statistic  valueStyle={{fontSize: 12}} value={plan.price} decimalSeparator=','/>
                                                },
                                                {
                                                    title: 'حذف',
                                                    align: 'center',
                                                    dataIndex: 'plan_id',
                                                    render: (value, plan) => <Button onClick={() => removeItemFromCart(plan)} icon={<DeleteOutlined />} danger/>
                                                }
                                            ]}
                                            dataSource={cart}
                                            pagination={false}
                                        />
                                    </Col>
                                    
                                    <Col span={24}>
                                    <Form form={form} layout='vertical'>
                                        <Form.Item name='coupon_code' label='کد تخفیف' validateStatus={apiErrors && apiErrors.coupon_code ? 'error' : ''} help={apiErrors && apiErrors.coupon_code ? apiErrors.coupon_code : ''}>
                                            <Input 
                                                placeholder='کد تخفیف مورد نظر را وارد کنید' 
                                            />
                                        </Form.Item>
                                    
                                        <Form.Item name='email' label="ایمیل" validateStatus={apiErrors && apiErrors.email ? 'error' : ''} help={apiErrors && apiErrors.email  ? apiErrors.email : ''}>
                                            <Input 
                                                placeholder='ایمیل خود را وارد کنید' 
                                            />
                                        </Form.Item>
                                    
                                        <Form.Item name='password' label='رمزعبور' validateStatus={apiErrors && apiErrors.password ? 'error' : ''} help={apiErrors && apiErrors.password ? apiErrors.password : ''}>
                                            <Input.Password
                                                size="small"
                                                placeholder='رمزعبور مد نظر خود را وارد کنید' 
                                            />
                                        </Form.Item>
                                        </Form>
                                    </Col>
                                    <Col >
                                        <Statistic key={0} title="مبلغ کل (تومان):" value={invoice?.total_amount || getTotalCartAmount()} decimalSeparator={','} />
                                    </Col>
                                    <Col >
                                        <Statistic key={0} title=" تخفیف (تومان):" value={invoice?.discount || 0} decimalSeparator={','} />
                                    </Col>
                                    <Col >
                                        <Statistic key={0} title="قابل پرداخت (تومان):" value={invoice?.payable || getTotalCartAmount()} decimalSeparator={','} />
                                    </Col>
                                    <Divider/>
                                </Row>
                            </Modal>
                        </div>

                    
                    </Row> 
            </PageContainer>
        </Layout>   
    )

}

export default PublicHome;