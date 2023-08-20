import {invoiceType} from "@/types/Models/invoice.type";
import {userType} from "@/types/Models/user.type";
import {planType} from "@/types/Models/plan.type";
import {accountType} from "@/types/Models/account.type";

export type transactionType = {
    id: string
    amount: string
    invoice: invoiceType
    user: userType
    plan: planType
    account: accountType
    created_at: string
    updated_at: string
}
