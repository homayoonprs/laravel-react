import {userType} from "@/types/Models/user.type";
import {invoiceType} from "@/types/Models/invoice.type";

export type couponType = {
    id: string;
    title: string
    description: string
    code: string
    public: boolean
    enable: boolean
    is_active: string
    minimum_purchase: string
    max_discount: string
    max_usage: string
    users: userType[]
    invoices: invoiceType[]
    starts_at: string
    expire_at: string
    remaining_days: number
    created_at: string
    updated_at: string

}
