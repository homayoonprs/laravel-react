import {userType} from "@/types/Models/user.type";
import {planType} from "@/types/Models/plan.type";
import {transactionType} from "@/types/Models/transaction.type";

export type accountType = {
    id: string;
    username: string
    password: string
    radius_id: string
    is_active: boolean
    user: userType
    plan: planType
    transactions: transactionType[]
    maximum_traffic_usage: string
    used_traffic: string
    is_overflow: string
    starts_at: string
    expire_at: string
    remaining_days: number
    days: number
    created_at: string
    updated_at: string
}
