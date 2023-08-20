type ButtonStyleType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'light-secondary';

export interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
{
    buttonStyle: ButtonStyleType
    loading?: boolean
    loadingIcon?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    block?: boolean
    outline?: boolean
    rounded?: boolean
    justIcon?: boolean
    withBgOpacity?: boolean
    actionBtn?: boolean
}