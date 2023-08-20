import React, {useState} from 'react';
import {Button, Checkbox, Col, DatePicker, Drawer, Empty, Form, Input, Row, Select, Spin} from "antd";
import gateway from "@/services/gateway";
import {RetweetOutlined} from "@ant-design/icons";
import {FieldData} from "rc-field-form/lib/interface";

export interface ICouponFilterDrawer
{
    onFormChange?: (changedFields: FieldData[], allFields: FieldData[]) => void
    onClose: () => void
    onReset?: () => void
    open?: boolean
    onSubmit: (allFields: any) => void
}

const CouponFilterDrawer = ({open, onClose, onReset, onFormChange, onSubmit}: ICouponFilterDrawer) => {

    const [form] = Form.useForm()

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
                        <Form.Item name='code' label='کد'>
                            <Input placeholder="عنوان مورد نظر ..."/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='title' label='عنوان'>
                            <Input placeholder="عنوان مورد نظر ..."/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label='وضعیت' name={'is_active'}>
                            <Checkbox.Group>
                                <Checkbox value={true}>فعال</Checkbox>
                                <Checkbox value={false}>غیر فعال</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label='نوع' name={'public'}>
                            <Checkbox.Group>
                                <Checkbox value={true}>عمومی</Checkbox>
                                <Checkbox value={false}>خصوصی</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                    
                </Row>
            </Form>
        </Drawer>
    )
}

export default CouponFilterDrawer;
