import React, {useEffect, useState} from 'react'
import gateway from '@/services/gateway';
import {Card, Col, Form, Row, Select, DatePicker, Input, Switch, Button, Radio} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {IUserProfileForm} from "./IUserProfileForm";
import {useQuery} from "react-query";
import {PageContainer} from "@ant-design/pro-components";
import {useNavigate} from "react-router-dom";
import { roleType } from '@/types/Models/role.type';
import { usePermissions } from '@/hooks/usePermissions';

export const UserProfileForm = ({user, onSubmitStore, onSubmitUpdate, errors, loading, loadUserLoading}: IUserProfileForm) => {

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [hasPermissionTo] = usePermissions()

    const [fetchRoleLoading, setFetchRoleLoading] = useState(false);
    const [roles, setRoles] = useState<roleType[] | []>([])

    const getRoles = (search: string = '') => {
        setFetchRoleLoading(true);
        gateway.getRoles(1,`filter[label]=${search}`).then(res => {
            setRoles(res.data)
        }).finally(() => setFetchRoleLoading(false))
    }

    const handleSubmitStore = () => {
        onSubmitStore(form.getFieldsValue())
    }

    const handleSubmitUpdate = () => {
        onSubmitUpdate(form.getFieldsValue())
    }

    useEffect(() => {
        if(user){
            form.setFieldsValue({
                ...user,
                roles_name: user.roles.map(role => role.name)
            })
        }
    },[loadUserLoading])

    useEffect(() => {
        getRoles()
    },[])

    const renderFooterActionBTN = () => {
        if(user && hasPermissionTo('user_update')){
            return <Button type='primary' key={0} loading={loading} onClick={handleSubmitUpdate}>ویرایش</Button>
        }else if(!user && hasPermissionTo('user_create')){
            return <Button type='primary' key={0} loading={loading} onClick={handleSubmitStore}>ثبت نام</Button>
        }
        return ''

    }

    return (
        <PageContainer
            loading={loadUserLoading}
            className={'mb-9'}
            childrenContentStyle={{margin: 0, padding: 0, paddingBlock: 0, paddingInline: 0}}
            footer={[
                renderFooterActionBTN(),
                <Button key={1} onClick={() => navigate('/user')}>لغو</Button>
            ]}>
            <Form layout='vertical' form={form}>
                <Row gutter={[16, 24]}>
                    {/* Left Section Col */}
                    <Col span={24}>
                        <Row gutter={[0, 16]}>
                            {/* user Detail section */}
                            <Col span={24}>
                                <Card title='اطلاعات هویتی' loading={loadUserLoading}>
                                    <Row gutter={[16, 0]}>
                                        <Col span={12}>
                                            <Form.Item name='email' label='ایمیل' validateStatus={errors && errors?.email ? 'error' : ''} help={errors && errors?.email ? errors.email : ''}>
                                                <Input placeholder='ایمیل کاربر را وار کنید'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name='password' label='رمزعبور' validateStatus={errors && errors?.password ? 'error' : ''} help={errors && errors?.password ? errors.password : ''}>
                                                <Input placeholder='رمزعبور را وارد کنید'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name='name' label='نام' validateStatus={errors && errors?.name ? 'error' : ''} help={errors && errors?.name ? errors.name : ''}>
                                                <Input placeholder='نام کاربر را وارد کنید'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name='phone' label='تلفن همراه' validateStatus={errors && errors?.phone ? 'error' : ''} help={errors && errors?.phone ? errors.phone : ''}>
                                                <Input
                                                    placeholder='تلفن همرا کاربر را وارد کنید'
                                                    style={{width: '100%'}}
                                                />
                                            </Form.Item>
                                        </Col>
                                        {
                                            hasPermissionTo('user_sync_role')
                                                ? <Col span={12}>
                                                    <Form.Item name='roles_name' label='نقش ها'>
                                                        <Select
                                                            placeholder='لطفا نقش مورد نظر کاربر را انتخاب کنید'
                                                            filterOption={false}
                                                            showSearch={true}
                                                            loading={fetchRoleLoading}
                                                            onSearch={getRoles}
                                                            fieldNames={{label: 'label', value: 'name'}}
                                                            options={roles}
                                                            mode='multiple'
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                :''

                                        }
                                        <Col>
                                            <Form.Item name={'account_type'} label='نوع کاربر' validateStatus={errors && errors?.account_type ? 'error' : ''} help={errors && errors?.account_type ? errors.account_type : ''}>
                                                <Radio.Group>
                                                    <Radio value={'personal'}>
                                                        حقیقی
                                                    </Radio>
                                                    <Radio value={'business'}>
                                                        حقوقی
                                                    </Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </PageContainer>
    )
}
