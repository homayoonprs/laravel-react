type avatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IAvatar {
    imageUrl: string
    size: avatarSize
    fullName?: string | null
}