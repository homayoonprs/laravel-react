export type broadcastNotificationType = {
    title: string,
    body: string
}

export type notificationType<DataType = any> = {
    id: string
    data: DataType
    read_at: string | null
    created_at: string
    updated_at: string
}