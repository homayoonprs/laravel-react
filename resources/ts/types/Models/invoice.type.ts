import {userType} from "@/types/Models/user.type";
import {couponType} from "@/types/Models/coupon.type";
import {gatewayType} from "@/types/Models/gateway.type";
import {transactionType} from "@/types/Models/transaction.type";

export type invoiceType = {
    id: string;
    total_amount: string
    payable: string
    discount: string
    description: string
    user: userType
    coupon: couponType
    gateway: gatewayType
    transactions: transactionType[]
    is_active: boolean
    payment_at: string
    created_at: string
    updated_at: string

}
