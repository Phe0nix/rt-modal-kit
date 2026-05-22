
import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";
type CloseButtonAlignment = "right" | "center" | "left";
type ModalRole = "dialog" | "alertdialog";
type ModalVariant = "default" | "bottom-sheet";
type CloseReason = "backdrop" | "escape" | "programmatic" | "action:closeButton" | "action:footerClose";

export type HFType = {
  active?: boolean;
  title?: React.ReactNode;
  id?: string;
  className?: string;
  alignment?: React.CSSProperties['textAlign'];
};

export interface ModalProps {
  theme?: "light" | "dark";
  size?: ModalSize;
  open: boolean;
  close: () => void;
  variant?: ModalVariant;
  preventClose?:boolean;
  onCloseReason?: (reason: CloseReason) => void;
  header?: HFType;
  footer?: HFType;
  showTopClose?: boolean;
  showFooterCloseButton?: boolean;
  closeButtonAlignment?: CloseButtonAlignment;
  closeButtonFullWidth?: boolean;
  fullScreen?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  modalId?: string;
  contentId?: string;
  backdropId?: string;
  modalClassName?: string;
  contentClassName?: string;
  backdropClassName?: string;
  modalStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  backdropStyle?: React.CSSProperties;
  initialFocusRef?: React.RefObject<HTMLElement>;
  restoreFocus?: boolean;
  inertBackground?: boolean;
  ariaLabel?: string;
  role?: ModalRole;
  portal?: HTMLElement | null;
  children?: React.ReactNode;
}

const defaultHeaderVal = {active : true, title : "Modal Header", id : "", className : "", alignment: "left"};
const defaultFooterVal = {active : true, title : "Modal Footer", id : "", className : "", alignment: "left"};

const Modal: React.FC<ModalProps> = ({
  size = "md",
  open = false,
  theme = "light",
  variant = "default",
  close,
  header = {active : true, title : "Modal Header", id : "", className : "", alignment: "left"},
  footer = {active : true, title : "Modal Footer", id : "", className : "", alignment: "left"},
  showTopClose = true,
  showFooterCloseButton = true,
  closeButtonAlignment = "right",
  preventClose = false,
  onCloseReason,
  closeButtonFullWidth = false,
  fullScreen = false,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  modalId="",
  contentId="",
  backdropId="",
  modalClassName = "",
  contentClassName = "",
  backdropClassName = "",
  modalStyle={},
  contentStyle={},
  backdropStyle={},
  initialFocusRef,
  restoreFocus= true,
  inertBackground= true,
  ariaLabel,
  role = "dialog",
  portal = null,
  children="",
}) => {
  const isOpen = !!open;
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const mergeHeader = useMemo(()=>({...defaultHeaderVal, ...header}), [header]);
  const mergeFooter = useMemo(()=>({...defaultFooterVal, ...footer}), [footer]);
  const host = portal ?? (typeof document !== 'undefined' ? document.body : null);

  const modalBodyA11y: React.HTMLAttributes<HTMLDivElement> = {
    "aria-describedby": "modal_description",
  };

  const modalFooterA11y: React.HTMLAttributes<HTMLDivElement> = {
    "aria-labelledby": "modal_footer",
  };
  
  const headerId = useMemo(() => mergeHeader.id?.trim() || 'modal_title', [mergeHeader.id]);
  const labelledBy = mergeHeader.active ? headerId : undefined;
  const ariaLabelSafe = labelledBy ? undefined : ariaLabel;

// Dev a11y: warn when dialog lacks a name
  useEffect(() => {
    if (open) {
      if (!labelledBy && !ariaLabelSafe) {
        console.warn('[Modal] Accessible name is required. Provide `header.title` (active header) or `ariaLabel`.');
      }
    }
  }, [open, labelledBy, ariaLabelSafe]);

  // SSR safe portal (host computed directly)

  // prevent modal auto close
  const handleAttemptClose = useCallback(async(reason: CloseReason) => {
    if (preventClose) {
      const confirmClose = window.confirm("Are you sure you want to close the Modal?");
      if (!confirmClose) return;
    }
    onCloseReason?.(reason);
    close();
  }, [preventClose, onCloseReason, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const scw = window.innerWidth - document.documentElement.clientWidth;
      const prevPadding = document.body.style.paddingRight;
      document.body.style.paddingRight = `${scw}px`;
      document.body.classList.add(styles.lockScroll);
      return ()=> {
        document.body.classList.remove(styles.lockScroll);
        document.body.style.paddingRight = prevPadding;
      }
    } else {
        document.body.classList.remove(styles.lockScroll);
    }
    return () => {
      // Ensure cleanup in case component unmounts while open
      document.body.classList.remove(styles.lockScroll);
    };
  }, [isOpen]);

  // focus trap
  useEffect(() => {
    if (!open) return;
    
    // Store focused element to restore it later
    previousFocus.current = document.activeElement as HTMLElement;
    // initial focus
    const initial = (initialFocusRef?.current || modalRef.current && modalRef.current.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || modalRef.current);
    initial?.focus?.();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusables = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );     
      if (focusables.length === 0) {
        // Keep focus on modal container
        (modalRef.current as HTMLElement).focus?.();
        e.preventDefault();
        return;
      }

      const first = focusables[0] as HTMLElement;
      const last = focusables[focusables.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", trapFocus);
    (modalRef.current && modalRef.current.querySelector('button, input') as HTMLElement)?.focus();

    return () => {
      document.removeEventListener("keydown", trapFocus);
      if (restoreFocus) previousFocus.current?.focus(); // Restore focus on close
    };
  }, [open, initialFocusRef, restoreFocus]);

  // Close on Escape key
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        e.stopPropagation();
        handleAttemptClose("escape");
      }
    };

    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, [open, closeOnEsc, handleAttemptClose]);

  // Close on backdrop click
  useEffect(() => {
    if (!open || !closeOnBackdropClick || !backdropRef.current) return;
    const backdropElm = backdropRef.current;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (backdropElm && target === backdropElm) {
        handleAttemptClose("backdrop");
      }
    };
    backdropElm.addEventListener("click", handler, true);
    backdropElm.addEventListener("mousedown", handler, true);
    return () => {
      backdropElm.removeEventListener("click", handler, true);
      backdropElm.removeEventListener("mousedown", handler, true);
    };
  }, [open, closeOnBackdropClick, handleAttemptClose]);

  //inert background
  useEffect(()=>{
    if(!open || !inertBackground) return;
    const bodyElm = document.body;
    const modalElm = modalRef.current;
    const backdropElm = backdropRef.current;
    const siblings: Element[] = Array.from(bodyElm.children).filter(el => el !== modalElm && el !== backdropElm);
    const prev: { el: Element; inert?: boolean; ariaHidden: string | null }[] = [];

    siblings.forEach((el) => {
      const prevInert = (el as HTMLElement & { inert?: boolean }).inert;
      prev.push({ el, inert: prevInert, ariaHidden: el.getAttribute('aria-hidden') });
      try {
        (el as HTMLElement & { inert?: boolean }).inert = true;
      } catch (err) {
        void err;
      }
      el.setAttribute('aria-hidden', 'true');
    });

    return () => {
      prev.forEach(({ el, inert, ariaHidden }) => {
        try {
          (el as HTMLElement & { inert?: boolean }).inert = inert ?? false;
        } catch (err) {
          void err;
        }
        if (ariaHidden === null) el.removeAttribute('aria-hidden');
        else el.setAttribute('aria-hidden', ariaHidden as string);
      });
    };
  }, [open, inertBackground]);

  return (
    <>
      {open && host &&
        createPortal(
          <>
            <div
              className={`${backdropClassName} ${styles.backdrop} ${
                isOpen ? styles.backdrop_open : styles.backdrop_closed
              }`}
              id={backdropId || undefined}
              style={{ ...backdropStyle }}
              ref={backdropRef} data-state={isOpen ? 'open' : 'closed'}
            />

            <div
              className={`${modalClassName} ${styles.modal} ${
                styles[`modal_${size}`]
              } ${isOpen ? styles.modal_open : styles.modal_closed} ${
                fullScreen && styles.fullScreenModal
              } ${variant === "bottom-sheet" && styles.bottomSheet} ${styles[`theme_${theme}`]}`}
              id={modalId || undefined} ref={modalRef} 
              style={{ ...modalStyle }} data-state={isOpen ? 'open' : 'closed'}
              aria-modal="true" aria-labelledby={labelledBy} aria-label={ariaLabelSafe} role={role}
            >
              {showTopClose && <button
                className={styles.closeBtn}
                onClick={()=>handleAttemptClose("action:closeButton")}
                aria-label="Close dialog"
                type="button"
              >
                ✕
              </button>}

              {variant === "bottom-sheet" && <div className={styles.grabHandle} />}
              {mergeHeader.active && (
                <header className={`${styles.modal_header} ${mergeHeader.className && mergeHeader.className}`} id={mergeHeader.id || undefined}>
                  <h2 id={headerId} style={{textAlign: mergeHeader.alignment as React.CSSProperties['textAlign']}}>{mergeHeader.title}</h2>
                </header>
              )}

              <div
                className={`${contentClassName || undefined} ${styles.modal_body}`}
                style={{ ...contentStyle }}
                {...modalBodyA11y}
                id={contentId || undefined}
              >
                <div id="modal_description">{children}</div>
              </div>

              {mergeFooter.active && (
                <footer className={`${styles.modal_footer} ${mergeFooter.className || undefined}`} id={mergeFooter.id || undefined} {...modalFooterA11y}>
                  <h2 id="modal_footer" style={{textAlign: mergeFooter.alignment as React.CSSProperties['textAlign']}}>{mergeFooter.title}</h2>
                </footer>
              )}

              {showFooterCloseButton && (
                <div
                  className={`${styles.btn_wrapper} ${
                    closeButtonAlignment
                      ? styles[`btn_${closeButtonAlignment}`]
                      : undefined
                  } ${closeButtonFullWidth ? styles.btn_full : undefined}`}
                >
                  <button
                    type="button"
                    className={styles.footerCloseBtn}
                    onClick={()=>handleAttemptClose("action:footerClose")}
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </>,
          host
        )}
    </>
  );
};

export default Modal;