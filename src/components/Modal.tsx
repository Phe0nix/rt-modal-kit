
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";
type CloseButtonAlignment = "right" | "center" | "left";
type ModalRole = "dialog" | "alertdialog";

export interface ModalProps {
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

const Modal: React.FC<ModalProps> = ({
  size = "xs",
  open = false,
  close,
  header = true,
  footer = true,
  headerContent = "Modal Header",
  footerContent = "Modal Footer",
  showCloseButton = true,
  closeButtonAlignment = "right",
  closeButtonFullWidth = false,
  fullScreen = false,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  id,
  contentId,
  backdropId,
  className = "",
  contentClassName = "",
  backdropClassName = "",
  modalStyle,
  contentStyle,
  backdropStyle,
  role = "dialog",
  portal = document.body,
  children,
}) => {
  const isOpen = !!open;
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const modalA11y: React.HTMLAttributes<HTMLDivElement> = {
    "aria-labelledby": "modal_title",
    "aria-modal": "true",
  };

  const modalBodyA11y: React.HTMLAttributes<HTMLDivElement> = {
    "aria-describedby": "modal_description",
  };

  const modalFooterA11y: React.HTMLAttributes<HTMLDivElement> = {
    "aria-labelledby": "modal_footer",
  };

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.lockScroll);
    } else {
      document.body.classList.remove(styles.lockScroll);
    }
    return () => {
      // Ensure cleanup in case component unmounts while open
      document.body.classList.remove(styles.lockScroll);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEsc, close]);

  // Close on backdrop click
  useEffect(() => {
    if (!open || !closeOnBackdropClick) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (backdropRef.current && target === backdropRef.current) {
        close();
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open, closeOnBackdropClick, close]);

  return (
    <>
      {open &&
        createPortal(
          <>
            <div
              className={`${backdropClassName} ${styles.backdrop} ${
                isOpen ? styles.backdrop_open : styles.backdrop_closed
              }`}
              id={backdropId}
              style={{ ...backdropStyle }}
              ref={backdropRef}
            />

            <div
              className={`${className || ""} ${styles.modal} ${
                styles[`modal_${size}`]
              } ${isOpen ? styles.modal_open : styles.modal_closed} ${
                fullScreen ? styles.fullScreenModal : ""
              }`}
              id={id}
              style={{ ...modalStyle }}
              {...modalA11y}
              role={role}
            >
              <button
                className={styles.closeBtn}
                onClick={close}
                aria-label="Close dialog"
                type="button"
              >
                ✕
              </button>

              {header && (
                <div className={styles.modal_header}>
                  <h2 id="modal_title">{headerContent}</h2>
                </div>
              )}

              <div
                className={`${contentClassName || ""} ${styles.modal_body}`}
                style={{ ...contentStyle }}
                {...modalBodyA11y}
                id={contentId}
              >
                <div id="modal_description">{children}</div>
              </div>

              {footer && (
                <div className={styles.modal_footer} {...modalFooterA11y}>
                  <h2 id="modal_footer">{footerContent}</h2>
                </div>
              )}

              {showCloseButton && (
                <div
                  className={`${styles.btn_wrapper} ${
                    closeButtonAlignment
                      ? styles[`btn_${closeButtonAlignment}`]
                      : ""
                  } ${closeButtonFullWidth ? styles.btn_full : ""}`}
                >
                  <button
                    type="button"
                    className={styles.footerCloseBtn}
                    onClick={close}
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </>,
          portal
        )}
    </>
  );
};

export default Modal;
