import {transactionType} from "@/types/Models/transaction.type";
import {accountType} from "@/types/Models/account.type";

export type planTypeField = 'dedicated' | 'vip' | 'normal';

export type planType = {
    id: string;
    name: string
    description: string
    type: planTypeField
    days: string
    price: string
    free_days: string
    maximum_traffic_usage: string
    transactions: transactionType[]
    accounts: accountType[]
    random_username_prefix: string
    is_active: boolean
    created_at: string
    updated_at: string

}
