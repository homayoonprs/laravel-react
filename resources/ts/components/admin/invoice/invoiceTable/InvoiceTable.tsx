import { deleteModal } from '@/components/UI/deleteModal/DeleteModal';
import { usePermissions } from '@/hooks/usePermissions';
import gateway from '@/services/gateway';
import { invoiceType } from '@/types/Models/invoice.type';
import { EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Statistic, Tag , Table, message, Dropdown} from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
export interface IInvoiceTable
{
    invoices: invoiceType[] | []
    onInvoiceDelete: (invoice: invoiceType) => void
    loading?: boolean
}

const InvoiceTable: FC<IInvoiceTable> = ({invoices, loading, onInvoiceDelete}) => {

    const navigate = useNavigate()
    const [hasPermissionTo] = usePermissions();

    const invoicesTableColumns: ColumnsType<invoiceType> = [
        {
            title: 'مبلغ کل (تومان)',
            dataIndex: 'total_amount',
            render: (value) => <Statistic value={value || 0} valueStyle={{fontSize: 12}} groupSeparator={','}/>
        },
        {
            title: 'مبلغ قابل پرداخت (تومان)',
            dataIndex: 'payable',
            render: (value) => <Statistic value={value || 0} valueStyle={{fontSize: 12}} groupSeparator={','}/>
        },
        {
            title: 'تخفیف (تومان)',
            dataIndex: 'discount',
            render: (value) => <Statistic value={value || 0} valueStyle={{fontSize: 12}} groupSeparator={','}/>
        },
        {
            title: 'کاربر',
            render: (value, record) => record.user.name
        },
        {
            title: 'تاریخ پرداخت',
            align: 'center',
            dataIndex: 'payment_at',
            render: (value) => value ? value : 'عدم پرداخت'
        },
        {
            title: 'وضعیت',
            align: 'center',
            render: (value) => value ? <Tag color={'success'}>فعال</Tag> : <Tag color={'red'}>غیرفعال</Tag>
        },
        {
            title: 'تاریخ ایجاد',
            align: 'center',
            dataIndex: 'created_at',
        },
        {
            title: 'عملیات',
            align: 'center',
            className: hasPermissionTo('invoice_view') || hasPermissionTo('invoice_delete') ? '' : '!hidden',
            render: (value, record) => <Dropdown
                menu={{
                    items: [
                        {
                            key: 0,
                            label: 'نمایش جزئیات',
                            className: hasPermissionTo('invoice_view') ? '' : '!hidden',
                            onClick: () => navigate(`/admin/plan/edit/${record.id}`)
                        },
                        {
                            key: 0,
                            label: 'حذف',
                            danger: true,
                            className: hasPermissionTo('invoice_delete') ? '' : '!hidden',
                            onClick: () => {
                                deleteModal({
                                    title: `فاکتور حذف شود؟`,
                                    content: `در صورت تائید فاکتور حذف خواهد شد!`,
                                    onOk: () => handleDeleteInvoice(record)
                                })
                            }
                        }
                    ]
                }}
            >
                <Button icon={<MoreOutlined/>}/>
            </Dropdown>
        }
    ]

    const handleDeleteInvoice = (invoice: invoiceType) => {
        return gateway.deleteInvoice(invoice.id).then(res => onInvoiceDelete(res.data)).catch(err => message.warning(err.response.data.message));
    }

    return (
        <Table
            pagination={false}
            loading={loading}
            columns={invoicesTableColumns}
            dataSource={invoices}
        />
    )

}

export default InvoiceTable;