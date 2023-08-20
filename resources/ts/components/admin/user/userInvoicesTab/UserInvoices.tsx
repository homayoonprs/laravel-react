import { invoiceType } from '@/types/Models/invoice.type';
import { userType } from '@/types/Models/user.type';
import { Button, Col, Row } from 'antd';
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { InvoiceTable } from '../../invoice/invoiceTable';

export interface IuserInvoices
{
    user: userType
}

const UserInvoices: FC<IuserInvoices> = ({user}) => {
    
    const navigate = useNavigate()
    const [invoices, setInvoices] = useState<invoiceType[]|[]>(user.invoices)

    return (
        <Row gutter={[0,16]}>
            <Col>
                <Button onClick={() => navigate(`/admin/invoice/create?user_id=${user.id}`)} type='primary'>ثبت فاکتور برای کاربر</Button>
            </Col>
            <Col span={24}>
                <InvoiceTable onInvoiceDelete={(invoice) => setInvoices(perv => perv.filter(item => item.id !== invoice.id))} invoices={invoices}/>
            </Col>
        </Row>
    )

}

export default UserInvoices;