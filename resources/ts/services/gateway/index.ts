import { permissionType } from './../../types/Models/permission.type';
import { roleType } from './../../types/Models/role.type';
import { couponType } from './../../types/Models/coupon.type';
import axios from './config';
import {ILogin} from "../../types";
import { IPaginationMeta } from '@/types/IPaginationMeta';
import { userType } from '@/types/Models/user.type';
import {planType} from "@/types/Models/plan.type";
import {invoiceType} from "@/types/Models/invoice.type";
import {transactionType} from "@/types/Models/transaction.type";
import {gatewayType} from "@/types/Models/gateway.type";
import {accountType} from "@/types/Models/account.type";


interface ICollectionResponse<T> extends IPaginationMeta
{
    data: T
    operationId: string
}

interface IResourceResponse<T>
{
    data: T
    operationId: string
}

// Authentication API
const auth = {
    getCSRFCookie: () => axios.get('/sanctum/csrf-cookie'),
    login: (data: ILogin): Promise<IResourceResponse<userType>> => axios.post('/login',data),
    logout: () => axios.post('/logout'),
    getMe: () => axios.get('/api/v1/me')
}


// Admin API
const user = {
    getUsersList: (page: number = 1, query: string = ''): Promise<ICollectionResponse<userType[]>> => axios.get(`/api/v1/admin/users?page=${page}${query !== '' ? '&'+query : ''}`),
    getUser: (userID: number | string): Promise<IResourceResponse<userType>> => axios.get(`/api/v1/admin/users/${userID}`),
    storeUser: (data: any): Promise<IResourceResponse<userType>> => axios.post('/api/v1/admin/users',data),
    updateUser: (userID: number | string ,data: object): Promise<IResourceResponse<userType>> => axios.put(`/api/v1/admin/users/${userID}`,data),
}

const permission = {
    getPermissions: async (): Promise<ICollectionResponse<permissionType[]>> => axios.get('/api/v1/admin/permissions'),
}

const role = {
    getRoles: async (page: number = 1, query?: string): Promise<ICollectionResponse<roleType[]>> => axios.get(`/api/v1/admin/roles?page=${page}${query ? '&'+query : ''}`),
    getRole: async (id: string): Promise<IResourceResponse<roleType>> => axios.get(`/api/v1/admin/roles/${id}`),
    syncRolePermissions: async (permissions_id: string[] , roleId: string): Promise<IResourceResponse<roleType>> => axios.post(`/api/v1/admin/roles/${roleId}/sync/permissions`, {permissions_id}),
    deleteRole: async (roleId:string): Promise<IResourceResponse<roleType>> => axios.delete(`api/v1/admin/roles/${roleId}`),
    storeRole: async (data: any): Promise<IResourceResponse<roleType>> => axios.post('/api/v1/admin/roles', data),
    updateRole: async (id: string, data: any): Promise<IResourceResponse<roleType>> => axios.patch(`/api/v1/admin/roles/${id}`, data)
}

const plan = {
    getPlansList: async (page: number = 1, query: string = ''): Promise<ICollectionResponse<planType[]>> => axios.get(`/api/v1/admin/plans?page=${page}${query !== '' ? '&'+query : ''}`),
    getPlan: async (planID: number | string): Promise<IResourceResponse<planType>> => axios.get(`/api/v1/admin/plans/${planID}`),
    storePlan: async (data: any): Promise<IResourceResponse<planType>> => axios.post('/api/v1/admin/plans',data),
    updatePlan: async (planID: number | string ,data: object): Promise<IResourceResponse<planType>> => axios.put(`/api/v1/admin/plans/${planID}`,data),
    deletePlan: async (planID: number | string): Promise<IResourceResponse<planType>> => axios.delete(`/api/v1/admin/plans/${planID}`),
}

const invoice = {
    getInvoicesList: async (page: number = 1, query: string = ''): Promise<ICollectionResponse<invoiceType[]>> => axios.get(`/api/v1/admin/invoices?page=${page}${query !== '' ? '&'+query : ''}`),
    getInvoice: async (invoiceID: number | string): Promise<IResourceResponse<invoiceType>> => axios.get(`/api/v1/admin/invoices/${invoiceID}`),
    storeInvoice: async (data: any): Promise<IResourceResponse<invoiceType>> => axios.post('/api/v1/admin/invoices',data),
    updateInvoice: async (invoiceID: number | string ,data: object): Promise<IResourceResponse<invoiceType>> => axios.put(`/api/v1/admin/invoices/${invoiceID}`,data),
    createAccountAndTransactionForInvoice: async (data: object): Promise<IResourceResponse<invoiceType>> => axios.post(`/api/v1/admin/invoices/add-item`,data),
    updateAccountAndTransactionOfInvoice: async (transactionID: string, accountID: string ,data: object): Promise<IResourceResponse<invoiceType>> => axios.put(`/api/v1/admin/invoices/update-item/${transactionID}/${accountID}`,data),
    removeAccountAndTransactionFromInvoice: async (transactionID: string, accountID: string): Promise<IResourceResponse<invoiceType>> => axios.delete(`/api/v1/admin/invoices/remove-item/${transactionID}/${accountID}`),
    deleteInvoice: async (invoiceID: number | string): Promise<IResourceResponse<invoiceType>> => axios.delete(`/api/v1/admin/invoices/${invoiceID}`),
}

const transaction = {
    getTransactionsList: async (page: number = 1, query: string = ''): Promise<ICollectionResponse<transactionType[]>> => axios.get(`/api/v1/admin/transactions?page=${page}${query !== '' ? '&'+query : ''}`),
    getTransaction: async (transactionID: number | string): Promise<IResourceResponse<transactionType>> => axios.get(`/api/v1/admin/transactions/${transactionID}`),
    storeTransaction: async (data: any): Promise<IResourceResponse<transactionType>> => axios.post('/api/v1/admin/transactions',data),
    updateTransaction: async (transactionID: number | string ,data: object): Promise<IResourceResponse<transactionType>> => axios.put(`/api/v1/admin/transactions/${transactionID}`,data),
}

const gateway = {
    getGatewaysList: async (page: number = 1): Promise<ICollectionResponse<gatewayType[]>> => axios.get(`/api/v1/admin/gateways?page=${page}`),
    getGateway: async (gatewayID: number | string): Promise<IResourceResponse<gatewayType>> => axios.get(`/api/v1/admin/gateways/${gatewayID}`),
    updateGateway: async (gatewayID: number | string ,data: object): Promise<IResourceResponse<gatewayType>> => axios.put(`/api/v1/admin/gateways/${gatewayID}`,data),
}

const coupon = {
    getCouponsList: async (page: number = 1, query: string = ''): Promise<ICollectionResponse<couponType[]>> => axios.get(`/api/v1/admin/coupons?page=${page}${query !== '' ? '&'+query : ''}`),
    getCoupon: async (couponID: number | string): Promise<IResourceResponse<couponType>> => axios.get(`/api/v1/admin/coupons/${couponID}`),
    storeCoupon: async (data: any): Promise<IResourceResponse<couponType>> => axios.post('/api/v1/admin/coupons',data),
    updateCoupon: async (couponID: number | string ,data: object): Promise<IResourceResponse<couponType>> => axios.put(`/api/v1/admin/coupons/${couponID}`,data),
    deleteCoupon: async (couponID: number | string): Promise<IResourceResponse<couponType>> => axios.get(`/api/v1/admin/coupons/${couponID}`),
    attachCouponToinvoice: async (invoiceID: number | string, code: string): Promise<IResourceResponse<invoiceType>> => axios.post(`/api/v1/admin/coupons/attach-to-invoice/${invoiceID}`,{
        coupon_code: code
    }),
    detachCouponFrominvoice: async (invoiceID: number | string): Promise<IResourceResponse<invoiceType>> => axios.post(`/api/v1/admin/coupons/detach-from-invoice/${invoiceID}`),

}

const account = {
    getAccountsList: async (page: number = 1, query: string = ''): Promise<ICollectionResponse<accountType[]>> => axios.get(`/api/v1/admin/accounts?page=${page}${query !== '' ? '&'+query : ''}`),
    getAccount: async (accountID: number | string): Promise<IResourceResponse<accountType>> => axios.get(`/api/v1/admin/accounts/${accountID}`),
    storeAccount: async (data: any): Promise<IResourceResponse<planType>> => axios.post('/api/v1/admin/accounts',data),
    updateAccount: async (accountID: number | string ,data: object): Promise<IResourceResponse<accountType>> => axios.put(`/api/v1/admin/accounts/${accountID}`,data),
    generateAccountUsername: async (prefix: string|number, userID: string|number): Promise<{username: string}> => axios.post(`/api/v1/admin/accounts/generate-username`,{
        prefix,
        user_id: userID
    })
}

// ClientApi
const accountClientAPI = {
     clientGetAccounts: async (page: number): Promise<ICollectionResponse<accountType[]>> => axios.get(`/api/v1/client/accounts?page=${page}`)
}
const couponClientAPI = {
    clientGetCoupons: async (page: number): Promise<ICollectionResponse<couponType[]>> => axios.get(`/api/v1/client/coupons?page=${page}`),
    clientAttachCouponToInvoice: async (invoiceID: number | string, code: string): Promise<IResourceResponse<invoiceType>> => axios.post(`/api/v1/client/coupons/attach-to-invoice/${invoiceID}`,{
        coupon_code: code
    }),
    clientDetachCouponFrominvoice: async (invoiceID: number | string): Promise<IResourceResponse<invoiceType>> => axios.post(`/api/v1/client/coupons/detach-from-invoice/${invoiceID}`),
}
const invoiceClientAPI = {
    clientGetInvoices: async (): Promise<ICollectionResponse<invoiceType[]>> => axios.get('/api/v1/client/invoices'),
    clientGetOpenInvoice: async (): Promise<IResourceResponse<invoiceType>> => axios.get('/api/v1/client/invoice/get-open-invoice'),
    clientCreateAccountAndTransactionForInvoice: async (planID: string, data: any): Promise<IResourceResponse<invoiceType>> => axios.post(`/api/v1/client/invoices/add-item/${planID}`,data),
    clientRemoveAccountAndTransactionFromInvoice: async (planID: string, remove_only_one: string = '0'): Promise<IResourceResponse<invoiceType>> => axios.delete(`/api/v1/client/invoices/remove-item/${planID}`, {data: {remove_only_one}}),
}
const profileClientAPI = {
    clientUpdateMyProfile: async (data: object): Promise<IResourceResponse<userType>> => axios.put(`/api/v1/client/my-profile`,data),
}

// Public API
const planPublicAPI = {
    publicGetPlans: async (): Promise<ICollectionResponse<planType[]>> => axios.get('/api/v1/plans'),
    publicGetPlan: async (planID: string): Promise<IResourceResponse<planType>> => axios.get(`/api/v1/plans/${planID}`),
    publicCreateFirstInvoice: async (data: any): Promise<IResourceResponse<planType>> => axios.post(`/api/v1/plans/create-first-invoice`, data),
}


export default {
    ...auth,
    ...user,
    ...permission,
    ...role,
    ...plan,
    ...invoice,
    ...transaction,
    ...gateway,
    ...coupon,
    ...account,
    ...accountClientAPI,
    ...couponClientAPI,
    ...invoiceClientAPI,
    ...profileClientAPI,
    ...planPublicAPI
}
