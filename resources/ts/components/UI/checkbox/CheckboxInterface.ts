export interface CheckboxInterface {
    id: string
    name: string
    value: string
    label?: string 
    className?: string
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}