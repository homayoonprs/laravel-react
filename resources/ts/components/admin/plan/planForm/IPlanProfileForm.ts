import { userType } from "@/types/Models/user.type";
import {planType} from "@/types/Models/plan.type";

export interface IPlanProfileForm
{
    plan: planType | null
    errors?: any
    onSubmitStore: (data: any) => void,
    onSubmitUpdate: (data: any) => void,
    loading?: boolean
    loadPlanLoading?: boolean
}
