export type InputFiledSize = 'sm' | 'md' | 'lg';

type direction = 'rtl' | 'ltr';

export type CustomInputType = {
    name: string | number | null,
    value: string | number | null
}

export interface IInputBase
{
    inputSize?: InputFiledSize
    label: string | JSX.Element
    icon?: string | JSX.Element
    containerClassName?: string
    inputClassName?: string,
    errorMessage?: string,
    containerDir?: direction,
    labelDir?: direction,
    iconDir?: direction,
    witoutValidation?:boolean
    withoutLabel?: boolean
}

export interface IInput extends
    IInputBase,
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
        >
{}

export interface ITextarea extends
    IInputBase,
    React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
        >
{}

export interface IBankCardNumber extends Omit<IInput, 'onChange'>
{
    onChange?: (data: CustomInputType) => void
}