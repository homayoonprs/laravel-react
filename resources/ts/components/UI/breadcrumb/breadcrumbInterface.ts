export interface BreadcrumbInterface {
    items: BreadcrumbType[];
}

export type BreadcrumbType = {
    label: string,
    href?: string,
};
