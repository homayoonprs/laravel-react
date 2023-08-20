import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, DatePicker, Drawer, Empty, Form, Input, Row, Select, Spin} from "antd";
import gateway from "@/services/gateway";
import {RetweetOutlined} from "@ant-design/icons";
import {FieldData} from "rc-field-form/lib/interface";
import { planType } from '@/types/Models/plan.type';

export interface IUserFilterDrawer
{
    onFormChange?: (changedFields: FieldData[], allFields: FieldData[]) => void
    onClose: () => void
    onReset?: () => void
    open?: boolean
    onSubmit: (allFields: any) => void
}

const UserFilterDrawer = ({open, onClose, onReset, onFormChange, onSubmit}: IUserFilterDrawer) => {

    const [form] = Form.useForm()

    const [fetchPlanLoading, setFetchPlanLoading] = useState(false);
    const [plans, setPlans] = useState<planType[] | []>([])

    const getPlans = (search: string = '') => {
        setFetchPlanLoading(true);
        gateway.getPlansList(1,`filter[name]=${search}`).then(res => {
            setPlans(res.data)
        }).finally(() => setFetchPlanLoading(false))
    }

    useEffect(() => {
        getPlans()
    },[])
    

    const handleSubmit = () => {
        onSubmit(form.getFieldsValue())
    }

    const handleResetForm = () => {
        form.resetFields();
        onReset && onReset()
    }

    return (
        <Drawer
            open={open}
            onClose={onClose}
            extra={
                <Button icon={<RetweetOutlined />} onClick={handleResetForm} />
            }
            footer={
                <Button type='primary' block onClick={handleSubmit}>
                    جستجو
                </Button>
            }
            mask={false}
        >
            <Form
                layout="vertical"
                form={form}
                onFieldsChange={onFormChange}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item name='email' label='ایمیل'>
                            <Input placeholder="ایمیل مورد نظر را وارد کنید..."/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='phone' label='تلفن'>
                            <Input placeholder="شماره مورد نظر را وارد کنید..."/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='name' label='نام یا نام خوانوادگی'>
                            <Input placeholder="..."/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='accounts.id' label='اشتراک'>
                            <Select
                                filterOption={false}
                                showSearch={true}
                                loading={fetchPlanLoading}
                                onSearch={getPlans}
                                fieldNames={{label: 'name', value: 'id'}}
                                options={plans}
                                mode='multiple'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label='نوع کاربر' name='account_type'>
                            <Checkbox.Group>
                                <Checkbox value='personal'>حقیقی</Checkbox>
                                <Checkbox value='business' >حقوقی</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>


                </Row>
            </Form>
        </Drawer>
    )
}

export default UserFilterDrawer;
