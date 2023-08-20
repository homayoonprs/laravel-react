export type ILogin = {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RadioButton {
    className?: string
    name: string
    value: string
    id: string
}

export type APIErrorResponse = {
    message: string;
    errors: any;
}

export type APIResponse = {
    data: any;
    message: string;
    operationId: string;
}

