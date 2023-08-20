export type paginationLinkType = {
    first: string 
    last: string
    next: string | null
    prev: string | null
}

export type paginationMetaLinkType = {
    active?: boolean
    label: string
    url: string | null
}

export type paginationMetaType = {
    current_page: number
    from: number
    last_page: number
    links: paginationMetaLinkType[]
    path: string
    per_page: number
    to: number
    total: number
}

export interface IPaginationMeta
{
    links: paginationLinkType
    meta: paginationMetaType
}