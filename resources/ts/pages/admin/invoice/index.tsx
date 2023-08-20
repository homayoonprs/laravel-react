import Layout from '@/components/layouts/adminDashboard';
import {BreadcrumbType} from '@/components/UI/breadcrumb/breadcrumbInterface';
import gateway from '@/services/gateway';
import React, {ReactElement, useEffect, useState} from 'react'
import {invoiceType} from '@/types/Models/invoice.type';
import {IPaginationMeta} from '@/types/IPaginationMeta';
import {Link, useNavigate} from "react-router-dom";
import {
    Badge,
    Button, Checkbox,
    Col,
    Drawer,
    Dropdown,
    Form,
    Input,
    Pagination as ANTDPagination,
    Pagination,
    Row, Select,
    Table,
    Tag,
    Statistic
} from "antd";
import {ColumnsType} from "antd/es/table/interface";
import {AuditOutlined, EyeOutlined, FilterTwoTone, MoreOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {toSpatieFilterQuery} from "@/utils/laravelSpatieQueryBuilder";
import { InvoiceFilterDrawer } from '@/components/admin/invoice/invoiceFilterDrawer';
import {InvoiceTable} from '@/components/admin/invoice/invoiceTable';
import { usePermissions } from '@/hooks/usePermissions';

const breadcrumbItems: BreadcrumbType[] = [
    {label: 'داشتبورد', href: '/admin/home'},
    {label: 'لیست فاکتور ها'},
]

const Invoice = () => {

    const [invoices, setInvoices] = useState<invoiceType[] | []>([])
    const [page, setPage] = useState<number>(1)
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false)
    const [invoicesQuery, setInvoicesQuery] = useState<string>('')

    const [hasPermissionTo] = usePermissions();
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        gateway.getInvoicesList(page,invoicesQuery).then(res => {
            let {data, links, meta} = res;
            setInvoices(data);
            setPaginationMeta({links, meta})
        }).finally(() => setLoading(false))
    }, [page,invoicesQuery])

    const onFilterSubmit = (allFields: any) => {
        setInvoicesQuery(toSpatieFilterQuery(allFields))
    }

    const onFilterFormReset = () => {
        setInvoicesQuery('')
    }

    const toggleFilterDrawer = () => setShowFilterDrawer(!showFilterDrawer);

    return (
        <Layout breadcrumb={breadcrumbItems} extra={<Button icon={<FilterTwoTone />} onClick={toggleFilterDrawer}>فیلتر</Button>}>

            <Row>
                <Col className={'mb-6 mt-3'}>
                    {
                        hasPermissionTo('invoice_create')
                            ? <Button type="primary" size='middle' icon={<PlusOutlined />} onClick={() => navigate('/admin/invoice/create')}>
                                افزودن
                              </Button>
                            : ''
                    }
                </Col>
                <Col span={24}>
                   <InvoiceTable onInvoiceDelete={(invoice) => setInvoices(perv => perv.filter(item => item.id !== invoice.id))} invoices={invoices} loading={loading} />
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

            <InvoiceFilterDrawer onReset={onFilterFormReset} onClose={toggleFilterDrawer} onSubmit={onFilterSubmit} open={showFilterDrawer} />
        </Layout>
    )
}

export default Invoice;
