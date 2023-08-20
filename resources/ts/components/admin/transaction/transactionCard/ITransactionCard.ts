import { userType } from '@/types/Models/user.type';
import { invoiceType } from '@/types/Models/invoice.type';
import { transactionType } from '@/types/Models/transaction.type';

export interface ITransactionCard
{
    invoice: invoiceType
    transaction?: transactionType
    uuid?: string
    onSubmit?: (data: invoiceType) => void
    onUpdate?: (data: invoiceType) => void
    handleDeleteTransaction?: (invoice?: invoiceType, uuid?: string) => void
}