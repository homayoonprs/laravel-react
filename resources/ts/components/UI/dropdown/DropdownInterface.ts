export interface DropdownInterface{
    options: Array<DropdownOption>
    label: string
    image?: HTMLImageElement | string
}

export type DropdownOption = {
    label: string,
    onClick: () => void
}