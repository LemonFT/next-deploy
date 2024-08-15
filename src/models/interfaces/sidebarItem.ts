import { ReactNode } from "react";

export interface _SideBarItem {
    active: boolean,
    icon: ReactNode,
    name: string,
    url: string,
    sideBarCollapse: boolean,
}