import { ReactNode } from "react";

export interface _ModalSelect{
    icon?: ReactNode,
    title?: string,
    textSelectedOne: string,
    textSelectedTwo: string,
    onSelectedOne?: () => void,
    onSelectedTwo?: () => void,
    onClose?: () => void,
}