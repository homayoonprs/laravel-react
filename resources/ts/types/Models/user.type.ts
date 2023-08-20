import { permissionType } from './permission.type';
import {planType} from "@/types/Models/plan.type";
import {invoiceType} from "@/types/Models/invoice.type";
import {transactionType} from "@/types/Models/transaction.type";
import {accountType} from "@/types/Models/account.type";
import { roleType } from "./role.type";

export type userAccountType = 'business' | 'personal';

export type userType = {
    id: string;
    name: string
    email: string | null
    phone: string
    account_type: userAccountType
    account_number: string | null
    refer_code: string | null
    email_verified_at: string | null
    phone_verified_at: string | null
    invoices: invoiceType[] | []
    transactions: transactionType[] | []
    accounts: accountType[] | []
    roles: roleType[] | []
    permissions: permissionType[] | []
    created_at: string
    updated_at: string

}
