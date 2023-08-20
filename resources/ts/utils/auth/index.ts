import { userType } from '@/types/Models/user.type';

// Check if Specified user is Admin
export const isAdmin = (user: userType): boolean => {
    return (user.roles && user.roles.length > 0) || (user.permissions && user.permissions.length > 0)
}