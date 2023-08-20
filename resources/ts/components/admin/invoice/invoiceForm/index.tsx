import React, {useEffect, useState} from 'react'
import gateway from '@/services/gateway';
import {Card, Col, Form, Row, Select, DatePicker, Input, Switch, Button, Radio} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {useQuery} from "react-query";
import {PageContainer} from "@ant-design/pro-components";
import {useNavigate} from "react-router-dom";
import { IInvoiceForm } from './IInvoiceForm';
import { userType } from '@/types/Models/user.type';
import { CheckOutlined } from '@ant-design/icons';

export const InvoiceForm = ({invoice, onSubmitStore, onSubmitUpdate, errors, loading, loadUserLoading}: IInvoiceForm) => {

    const [fetchUserLoading, setFetchUserLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<userType[] | []>([]);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmitStore = () => {
        onSubmitStore(form.getFieldsValue())
    }

    const handleSubmitUpdate = () => {
        onSubmitUpdate(form.getFieldsValue())
    }

    useEffect(() => {
        if(invoice){
            form.setFieldsValue(invoice)
        }
    },[loadUserLoading])

    useEffect(() => {
        getUsers()
    }, [])

    const toggleLoading = () => setFetchUserLoading(!fetchUserLoading)

    const getUsers = (search: string = '') => {
        toggleLoading();
        gateway.getUsersList(1,`filter[name]=${search}`).then(res => {
            setUsers(res.data)
        }).finally(toggleLoading)
    }

    return (
        <PageContainer
            loading={loadUserLoading}
            className={'mb-9'}
            childrenContentStyle={{margin: 0, padding: 0, paddingBlock: 0, paddingInline: 0}}
            footer={[
                !invoice
                    ? <Button type='primary' key={0} loading={loading} onClick={handleSubmitStore}>افزودن</Button>
                    : <Button type='primary' key={0} loading={loading} onClick={handleSubmitUpdate}>ویرایش</Button>,
                <Button key={1} onClick={() => navigate('/invoice')}>لغو</Button>
            ]}>
            <Form layout='vertical' form={form}>
                <Row gutter={[16,0]}>
                    <Col span={8}>
                        <Form.Item name='user_id' label="کاربر" validateStatus={errors && errors.user_id ? 'error' : ''} help={errors && errors.user_id ? errors.user_id : ''}>
                            <Select
                                filterOption={false}
                                showSearch={true}
                                loading={fetchUserLoading}
                                onSearch={getUsers}
                                fieldNames={{label: 'name', value: 'id'}}
                                options={users}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="coupon" label="کد تخفیف">
                            <Input.Group compact>
                                <Input  style={{ width: 'calc(100% - 75px)' }} placeholder='کد تخفیف مورد نظر را وارد کنید' />
                                <Button type="primary" >اعمال کد</Button>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="coupon" label="کد تخفیف">
                            <Input.Group compact>
                                <Input  style={{ width: 'calc(100% - 75px)' }} placeholder='کد تخفیف مورد نظر را وارد کنید' />
                                <Button type="primary" >اعمال کد</Button>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </PageContainer>
    )
}
