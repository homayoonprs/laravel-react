import {Modal} from "antd";

export interface IDeleteModal
{
    title: string
    content: string
    onOk: () => void
    onCancel?: () => void
}

export const deleteModal = ({onCancel, content, title, onOk}: IDeleteModal) => {
    Modal.confirm({
        title,
        content,
        okText: 'بله حذف شود',
        okType: 'danger',
        cancelText: 'لفو',
        onOk,

        onCancel: () => {
            onCancel && onCancel()
        },
    })
}
