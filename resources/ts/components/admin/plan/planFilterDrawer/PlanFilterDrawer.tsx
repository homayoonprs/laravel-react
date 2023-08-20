import React, {useState} from 'react';
import {Button, Checkbox, Col, DatePicker, Drawer, Empty, Form, Input, Row, Select, Spin} from "antd";
import gateway from "@/services/gateway";
import {RetweetOutlined} from "@ant-design/icons";
import {FieldData} from "rc-field-form/lib/interface";

export interface IUserFilterDrawer
{
    onFormChange?: (changedFields: FieldData[], allFields: FieldData[]) => void
    onClose: () => void
    onReset?: () => void
    open?: boolean
    onSubmit: (allFields: any) => void
}

const PlanFilterDrawer = ({open, onClose, onReset, onFormChange, onSubmit}: IUserFilterDrawer) => {

    const [form] = Form.useForm()
    const [fetchLoading, setFetchLoading] = useState(false);

    const handleSubmit = () => {
        console.log(form.getFieldsValue())
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
                        <Form.Item name='name' label='عنوان'>
                            <Input placeholder="عنوان مورد نظر ..."/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='days' label='روز'>
                            <Input placeholder="تعداد روز مورد نظر ..."/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='free_days' label='روزهای رایگان'>
                            <Input placeholder="تعداد روز های رایگان مورد نظر ..."/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='price' label='قیمت'>
                            <Input placeholder="قیمت مورد نظر ..."/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label='نوع اشتراک' name={'type'}>
                            <Checkbox.Group>
                                <Checkbox value='dedicated'>اختصاصی</Checkbox>
                                <Checkbox value='vip'>vip</Checkbox>
                                <Checkbox value='normal'>معمولی</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label='وضعیت' name={'is_active'} valuePropName={'checked'}>
                            <Checkbox.Group>
                                <Checkbox value={true}>فعال</Checkbox>
                                <Checkbox value={true}>غیر فعال</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}

export default PlanFilterDrawer;
