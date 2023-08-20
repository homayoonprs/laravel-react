import {IButton} from '../button/IButton'

export type ActionMenuitemType = {
    label: string,
    icon?: string | JSX.Element
    onClick?: (event: React.MouseEvent<HTMLElement> | unknown) => void
    className?: string
}

export interface IActionMenu
{
    items: ActionMenuitemType[]
    button: JSX.Element
    onToggleClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}
