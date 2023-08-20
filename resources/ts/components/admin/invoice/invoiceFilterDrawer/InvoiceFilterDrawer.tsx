import React, {useState} from 'react';
import {Button, Checkbox, Col, DatePicker, Drawer, Empty, Form, Input, Row, Select, Spin} from "antd";
import gateway from "@/services/gateway";
import {RetweetOutlined} from "@ant-design/icons";
import {FieldData} from "rc-field-form/lib/interface";
import { userType } from '@/types/Models/user.type';
export interface IFilterFilterDrawer
{
    onFormChange?: (changedFields: FieldData[], allFields: FieldData[]) => void
    onClose: () => void
    onReset?: () => void
    open?: boolean
    onSubmit: (allFields: any) => void
}

const InvoiceFilterDrawer = ({open, onClose, onReset, onFormChange, onSubmit}: IFilterFilterDrawer) => {

    const [form] = Form.useForm()
    const [fetchLoading, setFetchLoading] = useState(false);
    const [fetchUsersLoading, setFetchUsersLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<userType[] | []>([])

    const handleSubmit = () => {
        onSubmit(form.getFieldsValue())
    }

    const handleResetForm = () => {
        form.resetFields();
        onReset && onReset()
    }

    const getUsers = (search: string = '') => {
        setFetchUsersLoading(true);
        gateway.getUsersList(1,`filter[name]=${search}`).then(res => {
            setUsers(res.data)
        }).finally(() => setFetchUsersLoading(false))
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
                        <Form.Item name='user.id' label="کاربر">
                            <Select
                                filterOption={false}
                                showSearch={true}
                                loading={fetchUsersLoading}
                                onSearch={getUsers}
                                fieldNames={{label: 'name', value: 'id'}}
                                options={users}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='total_amount' label='مبلغ'>
                            <Input placeholder="مبلغ مورد نظر را وارد کنید..."/>
                        </Form.Item>
                    </Col>
                    {/* <Col span={24}>
                       <Form.Item name='createdBetween' label='تاریخ پرداخت'>
                           <DatePicker.RangePicker style={{width: '100%'}}/>
                       </Form.Item>
                    </Col> */}
                </Row>
            </Form>
        </Drawer>
    )
}

export default InvoiceFilterDrawer;
