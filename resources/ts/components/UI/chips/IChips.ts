import React from "react"

type chipsSizeType = 'sm' | 'md' | 'lg' | 'xl'
type chipsVariant = 'primary' | 'secoundry' | 'danger' | 'warning' | 'info' | 'success' | 'light'

export interface IChips
{
    label: string
    size: chipsSizeType
    variant: chipsVariant
    icon?: string | JSX.Element
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    onCloseClick?: (event: React.MouseEvent<HTMLElement>) => void
    className?: string
    outline?: boolean
    rounded?: boolean
}