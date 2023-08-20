import {invoiceType} from "@/types/Models/invoice.type";

export type gatewayType = {
    id: string;
    name: string
    endpoint: string
    is_active: boolean
    for: 'first_purchase' | 'other'
    invoices: invoiceType[]
    created_at: string
    updated_at: string

}
