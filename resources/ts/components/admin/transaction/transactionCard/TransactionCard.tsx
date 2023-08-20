import { CheckOutlined, CheckSquareTwoTone, DeleteOutlined, DeleteTwoTone, EditOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Divider, Form, Input, Row, Select, Statistic, Tooltip, message, Popconfirm } from 'antd';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ITransactionCard } from './ITransactionCard';
import { planType } from '@/types/Models/plan.type';
import gateway from '@/services/gateway';
import { authContext } from '@/services/auth/useAuth';
import { transactionType } from '@/types/Models/transaction.type';
import { accountType } from '@/types/Models/account.type';
import { userType } from '@/types/Models/user.type';
import { DateObject } from 'react-multi-date-picker';
import { v4 as uuidv4 , validate} from 'uuid';
import moment from "moment-jalaali";
import { usePermissions } from '@/hooks/usePermissions';

const planTypeTranslator = {
    'dedicated': 'اختصاصی',
    'vip': 'vip',
    'normal': 'معمولی'
};

const TranasctionCard: FC<ITransactionCard> = ({transaction, invoice, uuid, handleDeleteTransaction, onSubmit, onUpdate}) => {

    const [form] = Form.useForm()
    const [hasPermissionTo] = usePermissions()

    const [fetchLoading, setFetchLoading] = useState<boolean>(false)
    const [removeLoading, setRemoveLoading] = useState<boolean>(false)
    const [fetchPlanLoading, setFetchPlanLoading] = useState<boolean>(false)

    const [showDeleteTransactionPopconfirm, setShowDeleteTransactionPopconfirm] = useState<boolean>(false)

    const [plans, setPlans] = useState<planType[] | []>([])

    const [plan, setPlan] = useState<planType | null>(null)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string | number>('')

    const [apiErrors, setApiErrors] = useState<any>(null)


    useEffect(() => {
        
        if(transaction){
            setPassword(transaction.account.password)
            setUsername(transaction.account.username)
            getPlans('',transaction.account.plan)
        }else{
            getPlans()
        }

    },[])

    const handleSubmit = () => {
        if(!plan){
            message.info('لطفا ابتدا پلن مد نظر را انتخاب کنید!')
            return;
        }

        setFetchLoading(true)

        const accountData = {
            username,
            password,
            plan_id: plan?.id,
            is_active: invoice.is_active,
            user_id: invoice.user.id,
            maximum_traffic_usage: plan?.maximum_traffic_usage,
            expire_at: moment().add(plan.days+plan.free_days,'d').format('YYYY/M/D HH:mm:ss') ,
            amount: plan.price,
            invoice_id: invoice.id,
        }
        gateway.createAccountAndTransactionForInvoice(accountData).then(res => {
            setApiErrors(null)
            onSubmit && onSubmit(res.data)
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setFetchLoading(false))

    }

    const handleUpdate = () => {

        if(!transaction) return;

        setFetchLoading(true)

        const accountData = {
            username,
            password,
            plan_id: plan?.id,
            is_active: invoice.is_active,
            user_id: invoice.user.id,
            maximum_traffic_usage: plan?.maximum_traffic_usage,
            expire_at: plan ? moment().add(plan.days+plan.free_days,'d').format('YYYY/M/D HH:mm:ss') : '',
            amount: plan?.price,
            invoice_id: invoice.id,
        }

        gateway.updateAccountAndTransactionOfInvoice(transaction.id, transaction.account.id, accountData).then(res => {
            setApiErrors(null)
            onUpdate && onUpdate(res.data)
        }).catch(err => {
            setApiErrors(err.response.data.errors)
        }).finally(() => setFetchLoading(false))
    }

    const onDeleteTransaction = () => {
        if(transaction){
            setRemoveLoading(true);
            gateway.removeAccountAndTransactionFromInvoice(transaction.id, transaction.account.id).then(res => {
                handleDeleteTransaction && handleDeleteTransaction(res.data)
            }).finally(() => setRemoveLoading(false))
        }
        if(uuid){
            handleDeleteTransaction && handleDeleteTransaction(undefined, uuid)
        }
        
    }

    const toggleShowTransactionDeletePopconfirm = () => setShowDeleteTransactionPopconfirm(!showDeleteTransactionPopconfirm)



    const getPlans = (search: string = '', defaultState?: planType) => {
        setFetchPlanLoading(true)
        gateway.getPlansList(1, search).then(res => {
            setPlans(res.data)
            if(defaultState){
                setPlan(defaultState)
                form.setFieldValue('plan_id',defaultState.id)
            }
        }).finally(() => setFetchPlanLoading(false))
    }

    const onClickGenerateUsername = () => {
        if(!plan){
            message.info('لطفا ابتدا پلن مد نظر را انتخاب کنید!')
        }else{
            gateway.generateAccountUsername(plan.random_username_prefix, invoice.user.id as string).then(res => {
                setUsername(res.username)
            })
        }
    }

    const generatePassword = () => {
        const randomPassword = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
        setPassword(randomPassword)
    }

    const getExpireDate = (): string => {
        if(transaction){
            return transaction.account.expire_at
        }

        if(plan){
            return moment().add(plan.days+plan.free_days,'d').format('jYYYY-jMM-jDD HH:mm')
        }

        return '-';
    }

    const renderTransactionCardFooterActionBTN = () => {
        
        if(transaction && hasPermissionTo('invoice_update')){
            return <Button loading={fetchLoading} onClick={handleUpdate}  type='primary' icon={<EditOutlined />}>ویرایش</Button>
        }else if(hasPermissionTo('invoice_create')){
            return <Button loading={fetchLoading} onClick={handleSubmit} type='primary' icon={<CheckOutlined />}>ثبت</Button>
        }
        return ''
    }

    return (
        <Card
            size="small"
        >
            <Form layout='vertical' form={form}>
                <Row>
                    <Col span={24}>
                        <Form.Item label="پلن" name='plan_id' validateStatus={apiErrors && apiErrors.plan_id ? 'error' : ''} help={apiErrors && apiErrors.plan_id ? apiErrors.plan_id : ''}>
                            <Select
                                onChange={(value, option) => {
                                    setPlan(option as planType)
                                }}
                                placeholder="انتخاب پلن"
                                filterOption={false}
                                showSearch={true}
                                loading={fetchPlanLoading}
                                onSearch={getPlans}
                                fieldNames={{label: 'name', value: 'id'}}
                                options={plans}
                            />
                        </Form.Item>
                        <Form.Item label="نام کاربری" name='username' validateStatus={apiErrors && apiErrors.username ? 'error' : ''} help={apiErrors && apiErrors.username ? apiErrors.username : ''}>
                            <Input.Group compact>
                                <Input
                                    placeholder='نام کاربری اشتراک'
                                    style={{ width: 'calc(100% - 32px)' }}
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                />
                                <Button onClick={onClickGenerateUsername} icon={<ThunderboltOutlined />} />
                            </Input.Group>
                        </Form.Item>
                        <Form.Item label="رمزعبور" name='password' validateStatus={apiErrors && apiErrors.password ? 'error' : ''} help={apiErrors && apiErrors.password ? apiErrors.password : ''}>
                            <Input.Group compact>
                                <Input
                                    placeholder='رمزعبور اشتراک'
                                    style={{ width: 'calc(100% - 32px)' }}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                                <Button onClick={generatePassword} icon={<ThunderboltOutlined />} />
                            </Input.Group>
                        </Form.Item>
                        <Divider/>
                        <Descriptions column={1}>
                            <Descriptions.Item label="مبلغ">
                                <Statistic valueStyle={{fontSize: 12}} value={plan ? plan.price : 0} decimalSeparator=","/>
                            </Descriptions.Item>
                            <Descriptions.Item label="روز">
                                {plan?.days || 0}
                            </Descriptions.Item>
                            <Descriptions.Item label="روز رایگان">
                                {plan?.free_days || 0}
                            </Descriptions.Item>
                            <Descriptions.Item label="نوع">
                                {plan ? planTypeTranslator[plan.type] : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="تاریخ پایان">
                                {getExpireDate()}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Divider/>
                    <Col span={24}>
                        <Row gutter={[16,0]} align='middle' >
                            <Col>
                                {
                                    renderTransactionCardFooterActionBTN()
                                }
                            </Col>
                            <Col>
                            {
                                hasPermissionTo('invoice_delete')
                                    ?   <Popconfirm
                                            title="حذف شود؟"
                                            description="از حذف تراکنش اطمینان دارید؟"
                                            open={showDeleteTransactionPopconfirm}
                                            onConfirm={onDeleteTransaction}
                                            okButtonProps={{ loading: removeLoading }}
                                            onCancel={toggleShowTransactionDeletePopconfirm}
                                        >
                                            <Button danger onClick={toggleShowTransactionDeletePopconfirm} icon={<DeleteOutlined />}>
                                                حذف
                                            </Button>
                                        </Popconfirm>

                                    :   ''
                            }
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}

export default TranasctionCard;
