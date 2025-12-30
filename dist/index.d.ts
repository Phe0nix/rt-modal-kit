type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";
type CloseButtonAlignment = "right" | "center" | "left";
type ModalRole = "dialog" | "alertdialog";
interface ModalProps {
    size?: ModalSize;
    open?: boolean;
    close: () => void;
    header?: boolean;
    footer?: boolean;
    headerContent?: React.ReactNode;
    footerContent?: React.ReactNode;
    showCloseButton?: boolean;
    closeButtonAlignment?: CloseButtonAlignment;
    closeButtonFullWidth?: boolean;
    fullScreen?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEsc?: boolean;
    id?: string;
    contentId?: string;
    backdropId?: string;
    className?: string;
    contentClassName?: string;
    backdropClassName?: string;
    modalStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    backdropStyle?: React.CSSProperties;
    role?: ModalRole;
    portal?: HTMLElement;
    children?: React.ReactNode;
}
declare const Modal: React.FC<ModalProps>;

export { Modal };
export type { ModalProps };
