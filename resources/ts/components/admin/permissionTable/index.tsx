import gateway from '@/services/gateway'
import React, {useMemo, useEffect, useState, useCallback, Dispatch, SetStateAction} from 'react'
import {permissionType} from '@/types/Models/permission.type'
import {roleType} from '@/types/Models/role.type'
import {strIncludes} from "@/utils/helpers";
import {Select, Form, Table, Row, Col} from "antd";
import {Card} from "@/components/UI/card";
import {PageContainer} from "@ant-design/pro-layout";
import {Button} from "@/components/UI/button";
import {useNavigate} from "react-router-dom";
import {DefaultOptionType} from "rc-select/lib/Select";
import {ColumnsType} from "antd/es/table";
import {FormInstance} from "antd/es/form/hooks/useForm";

const modelLabelTranslate = {
    "App\\Models\\Coupon": 'کد های تخفیف',
    "App\\Models\\Gateway": 'درگاه های پرداخت',
    "App\\Models\\Invoice": 'فاکتور ها',
    "App\\Models\\Plan": 'پلن ها',
    "App\\Models\\Role": 'نقش ها',
    "App\\Models\\User": 'کاربران',
    "App\\Models\\Setting": 'تنظیمات سیستم',
    "App\\Models\\Transaction": 'تراکنش ها',
    "Spatie\\Activitylog\\Models\\Activity": 'تاریخچه تغیرات ماژول ها',
    "Illuminate\\Notifications\\Notification": 'نوتیفیکیشن ها',

}

type GroupSelectOptionValueType = 1 | 2 | 3;

type selectPermissionType = permissionType & {
    selected?: boolean
};

type permissionGroupType = {
    label: string
    model: string
    permissions: selectPermissionType[]
    all_selected?: GroupSelectOptionValueType
}


interface PermissionTableInterface {
    role?: roleType | null
    form?: FormInstance<any>
}

const CRUD_KEYS = [
    'view',
    'view_any',
    'create',
    'update',
    'delete',
];

type selectedPermissionsType = {
    model: string
    permissions: Array<{
        id: string
        selected: boolean
    }>
    all_selected: boolean
}
const permissionTableColumns: ColumnsType<any> = [
    {
        title: 'ماژول',
        dataIndex: 'label',
        key: 'label',
    },
    {
        title: 'دسترسی',
        dataIndex: 'select_all',
        key: 'select_all',
    },
    {
        title: 'مشهاهده لیست',
        dataIndex: 'view_any',
        key: 'view_any',
    },
    {
        title: 'مشاهده جزئیات',
        dataIndex: 'view',
        key: 'view',
    },
    {
        title: 'ساختن',
        dataIndex: 'create',
        key: 'create',
    },
    {
        title: 'ویرایش',
        dataIndex: 'update',
        key: 'update',
    },
    {
        title: 'حذف',
        dataIndex: 'delete',
        key: '0',
    },
];

const Permission = ({role, form}: PermissionTableInterface) => {

    const navigate = useNavigate()

    const [crudPermissions, setCrudPermissions] = useState<permissionGroupType[] | []>([])
    const [otherPermissions, setOtherPermissions] = useState<permissionGroupType[] | []>([])

    const [tableLoading, setTableLoading] = useState<boolean>(true);

    const toPermissionGroup = (APIPermissionGroup: any[], CRUDOnly = true): permissionGroupType => {

        let label = translateModel(APIPermissionGroup[0]);

        let model = APIPermissionGroup[0];

        return {
            label,
            model,
            permissions: APIPermissionGroup[1].filter((permission: permissionType) => (
                CRUDOnly
                    ? strIncludes(permission.name, CRUD_KEYS)
                    : !strIncludes(permission.name, CRUD_KEYS)
            ))
        } as permissionGroupType;

    }

    const resetState = () => {
        setOtherPermissions([])
        setCrudPermissions([])
    }

    const translateModel = (key: string) => {
        // @ts-ignore
        return modelLabelTranslate[key];
    }

    useEffect(() => {

        gateway.getPermissions().then((response) => {

            let {data} = response;

            resetState()

            Object.entries(data).map((item: Array<any>, index) => {

                let permissionGroup = toPermissionGroup(item)

                if (permissionGroup.permissions.length) {
                    setCrudPermissions(prev => ([
                        ...prev,
                        permissionGroup
                    ]))
                }

                let otherPermission = toPermissionGroup(item, false)

                if (otherPermission.permissions.length) {
                    setOtherPermissions(prev => ([
                        ...prev,
                        otherPermission
                    ]))
                }
            })

        }).finally(() => setTableLoading(false))

    }, [])


    const selectAll = (permissionGroup: permissionGroupType, index: number) => (
        <Form.Item name={permissionGroup.model + '_select_all'}>
            <Select
                onChange={(value, option) => {
                    let modelsLabel = permissionGroup.permissions.map(per => `${permissionGroup.model}_${per.id}`);
                    let items = Object.entries(form?.getFieldsValue()).filter((item: any) => modelsLabel.indexOf(item[0]) > -1)

                    if (value == 1) {
                        items.map((item) => {
                            let value: number =+ item[0].split('_')[1];
                            form?.setFieldValue(item[0],value)
                        })
                    } else if (value == 0) {
                        items.map((item) => {
                            form?.setFieldValue(item[0],0)
                        })
                    }
                }}
                options={[
                    {label: <span className="!text-bold !text-green-800">همه دسترسی ها</span>, value: 1},
                    {label: <span className="!text-bold">شخصی سازی شده</span>, value: 2},
                    {label: <span className="!text-bold !text-red-800">ندارد</span>, value: 0},
                ]}
                style={{width: '100%'}}
                placeholder='انتخاب...'
            />
        </Form.Item>

    )

    const crudSelect = (permissionGroup: permissionGroupType, permission: selectPermissionType, index: number) => {
        let fieldName = permissionGroup.model + '_' + permission.id;
        return (
            <Form.Item name={fieldName}>
                <Select
                    onChange={(value, option) => {
                        let modelsLabel = permissionGroup.permissions.map(per => `${permissionGroup.model}_${per.id}`);
                        let items = Object.entries(form?.getFieldsValue()).filter((item: any) => modelsLabel.indexOf(item[0]) > -1 && typeof item[1] != "undefined" && item[1] != 0)

                        if (items.length == permissionGroup.permissions.length) {
                            form?.setFieldValue(`${permissionGroup.model}_select_all`, 1)
                        } else if (items.length > 0) {
                            form?.setFieldValue(`${permissionGroup.model}_select_all`, 2)
                        } else {
                            form?.setFieldValue(`${permissionGroup.model}_select_all`, 0)
                        }

                    }}
                    value={permission.selected}
                    options={[
                        {label: <span className="!text-bold !text-green-800">دارد</span>, value: permission.id},
                        {label: <span className="!text-bold !text-red-800">ندارد</span>, value: 0},
                    ]}
                    style={{width: '100%'}}
                    placeholder='انتخاب...'
                />
            </Form.Item>
        )
    }

    const otherSelect = (permissionGroup: permissionGroupType, index: number) => {
        return (
            <Form.Item key={index} label={permissionGroup.label} name={permissionGroup.model}>
                <Select
                    mode="multiple"
                    className="!flex-initial"
                    showSearch
                    placeholder={'لطفا انتخاب کنبد...'}
                    fieldNames={{value: 'id', label: 'label'}}
                    options={permissionGroup.permissions}
                />
            </Form.Item>
        )
    }

    return (
        <Card className='!flex-auto !flex-row !w-full'>

            <Form layout="vertical" form={form} name="permissionsForm">
                <Row gutter={[16,24]} >
                        {
                            otherPermissions.map((permissionGroup, index) => (
                                <Col span={6}>
                                    {otherSelect(permissionGroup, index)}
                                </Col>
                            ))
                        }
                        <Col span={24}>
                            <Table
                                loading={tableLoading}
                                pagination={false}
                                columns={permissionTableColumns}
                                scroll={{y:'80vh'}}
                                dataSource={
                                    crudPermissions.map((permissionGroup, index) => {
                                        let view = permissionGroup.permissions.filter(value => strIncludes(value.name, ['view'], true));
                                        let view_any = permissionGroup.permissions.filter(value => strIncludes(value.name, ['view_any'], true))
                                        let create = permissionGroup.permissions.filter(value => strIncludes(value.name, ['create'], true))
                                        let update = permissionGroup.permissions.filter(value => strIncludes(value.name, ['update'], true))
                                        let deletePermission = permissionGroup.permissions.filter(value => strIncludes(value.name, ['delete'], true))

                                        return {
                                            label: permissionGroup.label,
                                            select_all: selectAll(permissionGroup, index),
                                            view: view.length ? crudSelect(permissionGroup, view[0], index) : '',
                                            view_any: view_any.length ? crudSelect(permissionGroup, view_any[0], index) : '',
                                            create: create.length ? crudSelect(permissionGroup, create[0], index) : '',
                                            update: update.length ? crudSelect(permissionGroup, update[0], index) : '',
                                            delete: deletePermission.length ? crudSelect(permissionGroup, deletePermission[0], index) : '',
                                        }
                                    })
                                }
                            />
                        </Col>
                </Row>
            </Form>
        </Card>
    )
}


export default Permission;



