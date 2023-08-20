import { invoiceType } from "@/types/Models/invoice.type";

export interface IInvoiceسعید انوشهForm
{
    invoice: invoiceType | null
    errors?: any
    onSubmitStore: (data: any) => void,
    onSubmitUpdate: (data: any) => void,
    loading?: boolean
    loadUserLoading?: boolean
}
