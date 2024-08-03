import FocusTrap from "focus-trap-react";
import { MutableRefObject, ReactNode, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import { FocusableElement } from "tabbable";
import { useEventListener } from "common/hooks/event-listener";
import {
  backgroundStyles,
  dialogStyles,
  fadeStyle,
  scrollContainerStyles,
  transformStyle,
} from "./modal-transition-style";
import styles from "./modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalContainerProps {
  open: boolean;
  width?: string;
  children: ReactNode;
  onClose?: () => void;
  allowEscape?: boolean;
  initialFocusTarget?: MutableRefObject<FocusableElement | null> | string | false;
  returnFocusTarget?: MutableRefObject<FocusableElement | null> | string | false;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

const modalParent = document.getElementById("modal-root");

/**
 * A modal dialog. Creates a focus trap and prevents scrolling the background. Has options
 * to allow users to close it by pressing escape.
 */
const Modal = (props: ModalContainerProps): JSX.Element => {
  const id = useId();
  const docRef = useRef(document);
  const scrollNodeRef = useRef(null);
  const dialogNodeRef = useRef(null);
  const backdropNodeRef = useRef(null);
  const {
    open,
    width = "750px",
    children,
    allowEscape,
    onClose,
    initialFocusTarget = false,
    returnFocusTarget,
    ariaDescribedBy,
    ariaLabelledBy,
  } = props;
  const fallbackId = `modal-dialog-content-${id}`.replaceAll(":", "");
  const fallbackSelector = `#${fallbackId}`;

  useEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && allowEscape && open) {
        onClose?.();
      }
    },
    docRef,
    { capture: true }
  );

  const modalNode = (
    <>
      <Transition in={open} timeout={300} mountOnEnter unmountOnExit nodeRef={scrollNodeRef}>
        {(state) => (
          <div
            className={styles.scrollContainer}
            style={{
              ...fadeStyle,
              ...scrollContainerStyles[state as keyof typeof scrollContainerStyles],
            }}
            ref={scrollNodeRef}
          >
            <Transition timeout={300} in={open} nodeRef={dialogNodeRef}>
              {(state) => (
                <div
                  style={{ ...transformStyle, ...dialogStyles[state as keyof typeof dialogStyles] }}
                  ref={dialogNodeRef}
                >
                  <FocusTrap
                    focusTrapOptions={{
                      escapeDeactivates: false,
                      initialFocus:
                        typeof initialFocusTarget === "object"
                          ? initialFocusTarget.current ?? undefined
                          : initialFocusTarget,
                      fallbackFocus: fallbackSelector, // focus the dialog content when we have no tabbable elements - e.g. expired modal while renewing
                      setReturnFocus:
                        typeof returnFocusTarget === "object"
                          ? returnFocusTarget.current ?? undefined
                          : returnFocusTarget,
                      allowOutsideClick: (event: MouseEvent | TouchEvent) =>
                        event.target instanceof HTMLElement &&
                        /banner-close-btn/.test(event.target.id),
                    }}
                  >
                    <div
                      className={styles.dialog}
                      style={{ width: width }}
                      data-qa="modal-dialog"
                      role="dialog"
                      aria-labelledby={ariaLabelledBy}
                      aria-describedby={ariaDescribedBy}
                    >
                      <div className={styles.content} id={fallbackId} tabIndex={-1}>
                        {children}
                      </div>
                    </div>
                  </FocusTrap>
                </div>
              )}
            </Transition>
          </div>
        )}
      </Transition>
      <Transition in={open} timeout={300} mountOnEnter unmountOnExit nodeRef={backdropNodeRef}>
        {(state) => (
          <div
            className={styles.backdrop}
            style={{ ...fadeStyle, ...backgroundStyles[state as keyof typeof backgroundStyles] }}
            ref={backdropNodeRef}
          ></div>
        )}
      </Transition>
    </>
  );

  return createPortal(modalNode, modalParent ?? document.body);
};

interface ModalHeaderProps {
  title: string | JSX.Element | (() => JSX.Element);
  showCloseButton?: boolean;
  type?: "warning" | "standard" | "inProgress" | "success";
  onClose?: () => void;
  id?: string;
  showIconCloseText?: boolean;
}

const header = (props: ModalHeaderProps): JSX.Element => {
  const {
    title,
    showCloseButton,
    onClose,
    type = "standard",
    id,
    showIconCloseText = true,
  } = props;
  return (
    <div className={`${styles.header} ${styles[type]}`}>
      {typeof title === "function" ? (
        title()
      ) : (
        <h2 data-qa={`modal-dialog-${title}`} id={id}>
          {title}
        </h2>
      )}
      {showCloseButton && (
        <button onClick={onClose} className={`${styles.btnClose}`} data-qa="modal-close">
          {showIconCloseText && "CLOSE"}
          {showIconCloseText && <FontAwesomeIcon icon={faTimesCircle} />}
          {!showIconCloseText && <FontAwesomeIcon icon={faXmark} />}
        </button>
      )}
    </div>
  );
};

interface ModalFooterProps {
  onSubmit: () => void;
  showCancel?: boolean;
  submitText?: string;
  cancelText?: string;
  disableSubmit?: boolean;
  showSubmit?: boolean;
  disableCancel?: boolean;
  onCancel?: () => void;
  isGreenSubmitButton?: boolean;
}

const footer = (props: ModalFooterProps): JSX.Element => {
  const {
    onSubmit,
    showCancel = false,
    submitText = "submit",
    cancelText = "cancel",
    disableSubmit = false,
    disableCancel = false,
    showSubmit = true,
    onCancel,
    isGreenSubmitButton = false,
  } = props;
  return (
    <div className={styles.footer}>
      {showCancel && (
        <button
          type="button"
          className={styles.cancelBtn}
          disabled={disableCancel}
          onClick={onCancel}
          data-qa="modal-cancel"
        >
          {cancelText}
        </button>
      )}
      {showSubmit && (
        <button
          className={isGreenSubmitButton ? styles.greenSubmitBtn : styles.submitBtn}
          disabled={disableSubmit}
          onClick={onSubmit}
          data-qa="modal-submit"
        >
          {submitText}
        </button>
      )}
    </div>
  );
};

Modal.Header = header;
Modal.Footer = footer;

export { Modal };

/**
 * Sample
 * 
 * // imports
 * import { Modal } from "common/components"; * 
 * 
 * // the dialog modal itself
 * <Modal open={true} >
      <Modal.Header
        title="Warning Modal"
        onClose={() => closeWarningModal()}
        showCloseButton={true}
        type="warning"
      />
      <div>I warn you!</div>
    </Modal>
    <button onClick={() => openWarningModal()}>Open Modal</button>
  * 
 */
