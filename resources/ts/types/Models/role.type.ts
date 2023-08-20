import {permissionType} from "@/types/Models/permission.type";

export type roleType = {
    id: string;
    label: string;
    name: string;
    permissions: permissionType[]
    created_at: string;
    updated_at: string;
}