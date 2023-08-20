import { MenuProps } from "antd";
import { UrlObject } from "url";

export interface ISidebar extends MenuProps
{
    logoSrc: string;
    onCollapseClick: () => void
    collapsed?: boolean
}