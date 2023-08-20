import React, {useEffect, useState} from 'react'
import gateway from '@/services/gateway';
import {Card, Col, Form, Row, Select, DatePicker, Input, Switch, Button, Radio} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {IPlanProfileForm} from "./IPlanProfileForm";
import {useQuery} from "react-query";
import {PageContainer} from "@ant-design/pro-components";
import {useNavigate} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { usePermissions } from '@/hooks/usePermissions';

export const PlanForm = ({plan, onSubmitStore, onSubmitUpdate, errors, loading, loadPlanLoading}: IPlanProfileForm) => {

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [hasPermissionTo] = usePermissions()

    const [description, setDescription] = useState('');
    const handleSubmitStore = () => {
        onSubmitStore({
            ...form.getFieldsValue(),
            description
        })
    }

    const handleSubmitUpdate = () => {
        onSubmitUpdate({
            ...form.getFieldsValue(),
            description
        })
    }

    useEffect(() => {
        if(plan){
            form.setFieldsValue(plan)
            setDescription(plan.description)
        }else{
            form.setFieldValue('is_active',false)
        }
    },[loadPlanLoading])

    const renderPlanFooterActionBTN = () => {
        if(plan && hasPermissionTo('plan_update')){
            return <Button type='primary' key={0} loading={loading} onClick={handleSubmitUpdate}>ویرایش</Button>
        }else if(!plan && hasPermissionTo('plan_create')){
            return <Button type='primary' key={0} loading={loading} onClick={handleSubmitStore}>افزودن</Button>
        }
        return ''
    }

    return (
        <PageContainer
            loading={loadPlanLoading}
            className={'mb-9'}
            childrenContentStyle={{margin: 0, padding: 0, paddingBlock: 0, paddingInline: 0}}
            footer={[
                renderPlanFooterActionBTN(),
                <Button key={1} onClick={() => navigate('/admin/plan')}>لغو</Button>
            ]}>
            <Form layout='vertical' form={form}>
                <Row gutter={[16, 24]}>
                    {/* Left Section Col */}
                    <Col span={24}>
                        <Row gutter={[0, 16]}>
                            {/* plan Detail section */}
                            <Col span={24}>
                                <Card title='مشخصات پلن' loading={loadPlanLoading}>
                                    <Row gutter={[16, 0]}>
                                        <Col span={12}>
                                            <Form.Item name='name' label='عنوان' validateStatus={errors && errors?.name ? 'error' : ''} help={errors && errors?.name ? errors.name : ''}>
                                                <Input placeholder='عنوان پلن را وارد کنید'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name='random_username_prefix' label='پیشوند' validateStatus={errors && errors?.random_username_prefix ? 'error' : ''} help={errors && errors?.random_username_prefix ? errors.random_username_prefix : ''}>
                                                <Input placeholder='پیشوند پلن را وارد کنید'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name='price' label='قیمت' validateStatus={errors && errors?.price ? 'error' : ''} help={errors && errors?.price ? errors.price : ''}>
                                                <Input placeholder='قیمت پلن را وارد کنید'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name='days' label='تعداد روز' validateStatus={errors && errors?.days ? 'error' : ''} help={errors && errors?.days ? errors.days : ''}>
                                                <Input placeholder='روزهای پلن را وارد کنید'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name='free_days' label='تعداد روز رایگان' validateStatus={errors && errors?.free_days ? 'error' : ''} help={errors && errors?.free_days ? errors.free_days : ''}>
                                                <Input placeholder='تعداد روزهای رایگان را وار کنید'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name={'type'} label='نوع اشتراک' validateStatus={errors && errors?.type ? 'error' : ''} help={errors && errors?.type ? errors.type : ''}>
                                                <Radio.Group>
                                                    <Radio value={'dedicated'}>
                                                        اختصاصی
                                                    </Radio>
                                                    <Radio value={'vip'}>
                                                        vip
                                                    </Radio>
                                                    <Radio value={'normal'}>
                                                        معمولی
                                                    </Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name={'is_active'} label='وضعیت' validateStatus={errors && errors?.is_active ? 'error' : ''} help={errors && errors?.is_active ? errors.is_active : ''} valuePropName={'checked'}>
                                                <Switch checkedChildren={'فعال'} unCheckedChildren={'غیرفعال'} defaultChecked={false}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label={'توضیحات'} validateStatus={errors && errors?.description ? 'error' : ''} help={errors && errors?.description ? errors.description : ''}>
                                                <ReactQuill
                                                    modules={{
                                                        toolbar: [
                                                            [{ 'header': [1, 2, false] }],
                                                            [{ 'align': [] }],
                                                            ['bold', 'italic', 'underline','strike', 'blockquote'],
                                                            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                                            ['link', 'image'],
                                                            ['clean']
                                                        ],
                                                    }}
                                                    formats={[
                                                        'header',
                                                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                        'list', 'bullet', 'indent',
                                                        'link', 'image'
                                                    ]}

                                                    theme="snow"
                                                    value={description}
                                                    onChange={setDescription}
                                                />
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
