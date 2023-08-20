import { userType } from "@/types/Models/user.type";

export interface IUserProfileForm
{
    user: userType | null
    errors?: any
    onSubmitStore: (data: any) => void,
    onSubmitUpdate: (data: any) => void,
    loading?: boolean
    loadUserLoading?: boolean
}
