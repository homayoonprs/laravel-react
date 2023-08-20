import React, {useEffect, useState} from 'react';
import Layout from '@/components/layouts/adminDashboard'
import {BreadcrumbType} from "@/components/UI/breadcrumb/breadcrumbInterface";
import { Col, Pagination as ANTDPagination, Row, Table, Tag, Switch} from "antd";
import {ColumnsType} from "antd/es/table/interface";
import {gatewayType} from "@/types/Models/gateway.type";
import {IPaginationMeta} from "@/types/IPaginationMeta";
import gateway from "@/services/gateway";
import { usePermissions } from '@/hooks/usePermissions';
type gatewayTableDataType = gatewayType & {
    enableUpdateLoading: boolean
    enableForFieldLoading: boolean
}
const Gateway = () => {

    const [listLoading, setSetListLoading] = useState<boolean>(false)
    const [gateways, setGateways] = useState<gatewayTableDataType[] | []>([])
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null)
    const [page, setPage] = useState<number>(1)
    const [hasPermissionTo] = usePermissions();

    useEffect(() => {
        setSetListLoading(true);
        gateway.getGatewaysList(page).then(res => {
            let {data, links, meta} = res;
            setGateways(data.map(item => item as gatewayTableDataType));
            setPaginationMeta({links, meta})
        }).finally(() => setSetListLoading(false))
    }, [page])

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'داشتبورد',
            href: '/admin/home',
        },
        {
            label: 'لیست درگاه های پرداخت',
        }
    ];

    const onIsActiveChange = (record: gatewayTableDataType, checked: boolean) => {
        setGateways(prev => (
            prev.map(gateway => (
                {
                    ...gateway,
                    enableUpdateLoading: gateway.id === record.id 
                } as gatewayTableDataType   
            ))
        ))
        const data = {
            ...record,
            is_active: checked
        } as gatewayType
        gateway.updateGateway(record.id, data).then(res => {
            setGateways(prev => (
                prev.map(gateway => (
                    gateway.id === res.data.id ? res.data as gatewayTableDataType : gateway
                ))
            ))            
        })
    }

    const onForFieldChange = (record: gatewayTableDataType, checked: boolean) => {
        setGateways(prev => (
            prev.map(gateway => (
                {
                    ...gateway,
                    enableForFieldLoading: gateway.id === record.id 
                } as gatewayTableDataType   
            ))
        ))
        const data = {
            ...record,
            for: checked ? 'first_purchase' : 'other'
        } as gatewayType
        gateway.updateGateway(record.id, data).then(res => {
            setGateways(prev => (
                prev.map(gateway => (
                    gateway.id === res.data.id ? res.data as gatewayTableDataType : gateway
                ))
            ))     
        })
    }

    const gatewaysTableColumns: ColumnsType<gatewayTableDataType> = [
        {
            title: 'نام درگاه',
            dataIndex: 'name'
        },
        {
            title: 'نوع',
            align: 'center',
            dataIndex: 'for',
            className: hasPermissionTo('gateway_update') ? '' : '!hidden',
            render: (value, record) =>  (
                <Switch
                    onChange={(checked) => onForFieldChange(record, checked)}
                    loading={record.enableForFieldLoading}
                    checked={value === 'first_purchase'}
                    checkedChildren="اولین خرید"
                    unCheckedChildren="تمدید"
                />
            )
        },
        {
            title: 'وضعیت',
            align: 'center',
            dataIndex: 'is_active',
            className: hasPermissionTo('gateway_update') ? '' : '!hidden',
            render: (value, record) =>  (
                <Switch
                    onChange={(checked) => onIsActiveChange(record, checked)}
                    loading={record.enableUpdateLoading}
                    checked={value}
                    checkedChildren="فعال"
                    unCheckedChildren="غیرفعال"
                />
            )
        },
        {
            title: 'تاریخ ایجاد',
            align: 'center',
            dataIndex: 'created_at',
        }
    ]
    
    return (
        <Layout breadcrumb={breadcrumbs}>
            <Row className='mt-9'>
                <Col span={24}>
                    <Table
                        pagination={false}
                        loading={listLoading}
                        columns={gatewaysTableColumns}
                        dataSource={gateways}
                    />
                </Col>
            </Row>

            <Row justify="center" align="bottom" className="mt-6 mb-6">
                {
                    paginationMeta && paginationMeta.meta.last_page > 1
                        ?  <Col>
                            <ANTDPagination
                                onChange={(current,size) => {
                                    setPage(current)
                                }}
                                current={paginationMeta.meta.current_page}
                                total={paginationMeta.meta.total}
                                pageSize={paginationMeta.meta.per_page}
                            />
                        </Col>
                        : ''
                }
            </Row>
        </Layout>
    )
}

export default Gateway;
