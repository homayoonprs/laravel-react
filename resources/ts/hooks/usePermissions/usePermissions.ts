import { authContext } from '@/services/auth/useAuth';
import React, { useContext } from 'react';

export const usePermissions = () => {

    const {user} = useContext(authContext)
    
    const hasPermissionTo = (permissionName: string): boolean => {
        return (
            user != null &&
            user.permissions != null &&
            user.permissions.length > 0 &&
            user.permissions.filter(permission => permission.name === permissionName).length > 0
        ) || (
            user != null &&
            user.roles != null &&
            user.roles.length > 0 &&
            user.roles.filter(role => role.permissions && role.permissions.filter(permission => permission.name === permissionName).length > 0).length > 0
        )
    }

    return [hasPermissionTo]
}