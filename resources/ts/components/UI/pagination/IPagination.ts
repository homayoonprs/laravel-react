import { IPaginationMeta, paginationMetaLinkType, paginationMetaType } from "src/types/IPaginationMeta";

export interface IPagination 
{
    paginationMeta: IPaginationMeta
    onPageClick: (
        meta: paginationMetaType,
        link: paginationMetaLinkType & {
            pageNumber?: number
        }
        ) => void
    containerClassName?: string | null | undefined
    paginatorClassName?: string | null | undefined
}