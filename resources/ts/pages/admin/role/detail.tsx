import Layout from '@/components/layouts/adminDashboard'
import React, {MouseEvent, useEffect, useState} from 'react'
import PermissionTable from '@/components/admin/permissionTable'
import Breadcrumb from '@/components/UI/breadcrumb'
import {BreadcrumbType} from '@/components/UI/breadcrumb/breadcrumbInterface'
import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import gateway from "@/services/gateway";
import {roleType} from "@/types/Models/role.type";
import {strIncludes} from "@/utils/helpers";
import {useNavigate, useParams} from "react-router-dom";
import styles from '@/styles/vendors/antd/styles';
import { usePermissions } from '@/hooks/usePermissions'
type roleAPIErrorType = {
    label: string
    name: string
    permissions_id: string
}

const CRUD_KEYS = [
    'view',
    'view_any',
    'create',
    'update',
    'delete',
];

export default function CreateRole() {

    const [role, setRole] = useState<roleType | null>(null)
    const [errors, setErrors] = useState<roleAPIErrorType>({} as roleAPIErrorType)
    const [loading, setLoading] = useState<boolean>(false)
    const [formLoading, setFormLoading] = useState<boolean>(false)

    const [form] = Form.useForm()
    const params = useParams();
    const navigate = useNavigate();
    const [hasPermissionTo] = usePermissions();

    useEffect(() => {
        if (params.id){
            setLoading(true)
            gateway.getRole(params.id).then(res => {
                setRole(res.data)
            }).finally(() => setLoading(false))
        }
    },[])

    useEffect(() => {

        if(role){
            let formStates: any = {};

            role.permissions?.map(per => {
                if(strIncludes(per.name,CRUD_KEYS)){
                    formStates[per.model+'_'+per.id] = per.id
                }else if(typeof formStates[per.model] == 'undefined'){
                    
                    formStates[per.model] = [
                        ...role.permissions.filter(p => !strIncludes(p.name,CRUD_KEYS) && p.model === per.model).map(p => p.id)
                    ]
                }
            })
            console.log(formStates);
            
            form.setFieldsValue(formStates)
            
            

            form.setFieldValue('label',role.label)
            form.setFieldValue('name',role.name)
        }

    },[role])

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {

        setFormLoading(true)
        setErrors({} as roleAPIErrorType)

        let permissions_id: Array<string | number> = [];

        Object.entries(form.getFieldsValue()).map((item: any) => {
            if (!strIncludes(item[0],['select_all'],true)){
                Array.isArray(item[1]) ? item[1].map(i => {
                    permissions_id.push(i)
                }) : permissions_id.push(item[1])
            }
        })

        permissions_id = permissions_id.filter((item: any) => typeof item != "undefined" && !isNaN(item));

        let {name, label} = form.getFieldsValue();

        if(params.id){
            updateRole(params.id, label, name, permissions_id)
        }else{
            storeRole( label, name, permissions_id )
        }

    }

    const updateRole = ( id: string, label: string, name: string, permissions_id: (string | number)[] ) => {
        gateway.updateRole(id,{
            label,
            name,
            permissions_id
        }).then(res => {
            let {data} = res;
            message.info( `نقش :${data.label} با موفقیت بروزرسانی شد.`)
            setRole(data)
        }).catch(err => {
            setErrors(err.response.data.errors)
        }).finally(() => setFormLoading(false))
    }

    const storeRole = ( label: string, name: string, permissions_id: (string | number)[] ) => {
        gateway.storeRole({
            label,
            name,
            permissions_id
        }).then(res => {
            let {data} = res;
            message.success( `نقش :${data.label} با موفقیت ساخته شد.`)
            setRole(data)
        }).catch(err => {
            setErrors(err.response.data.errors)
        }).finally(() => setFormLoading(false))
    }

    const renderRoleFooterActionBTN = () => {
        
        if(params.id || role && hasPermissionTo('role_update')){
            return  <Button style={{backgroundColor: styles.colors.success }} type="primary" key={1} loading={formLoading} onClick={handleSubmit}>
                        ویرایش
                    </Button>
        }else if(!params.id && !role && hasPermissionTo('role_create')){
            return <Button type="primary" key={1} loading={formLoading} onClick={handleSubmit}>
                        افزودن
                    </Button>
        }
        return ''
    }

    return (
        <Layout>
            <PageContainer
                loading={loading}
                childrenContentStyle={{padding: 0}}
                footer={[
                    <Button key={0} onClick={() => navigate('/admin/role')}>لغو</Button>,
                    renderRoleFooterActionBTN(),
                ]}
            >
                <Row gutter={[16,24]} className={'mt-3 mb-9'}>
                    <Col>
                        <Breadcrumb
                            items={[
                                {label: 'داشتبورد', href: '/admin/home'},
                                {label: 'لیست نقش ها', href: '/admin/role'},
                                {label: params.id ? `ویرایش: ${role?.label}` : 'ایجاد نفش جدید'},
                            ]}
                        />
                    </Col>
                    <Col span={24}>
                        <Card>
                            <Form className='grid grid-cols-2 gap-2' layout='vertical' name="nameForm" form={form}>
                                <Row gutter={12}>
                                    <Col span={12}>
                                        <Form.Item label='نام فارسی نقش' name="label" validateStatus={errors?.label ? "error" : ""} help={errors?.label ? errors.label : ""}>
                                            <Input id='role_label' placeholder='نام فارسی نقش را وارد کنید.'/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label='نام انگلیسی نقش' name="name" validateStatus={errors?.name ? "error" : ""} help={errors?.name ? errors.name : ""}>
                                            <Input id='role_name' placeholder='نام انگلیسی نقش را وارد کنید.'/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <PermissionTable role={role} form={form}/>
                    </Col>
                </Row>
            </PageContainer>
        </Layout>
    )
}
