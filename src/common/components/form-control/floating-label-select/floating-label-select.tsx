import { ReactNode, useRef } from "react";
import { Popover } from "common/components/popover/popover";
import { useOnClickOutside } from "common/hooks/on-click-out-side";
import styles from "./floating-label-select.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

interface FloatingLabelSelectProps {
  open: boolean;
  onClose: () => void;
  onTogglePopover: () => void;
  children: ReactNode;
  testId: string;
  label?: string;
  value: string;
  required?: boolean;
  hasError?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  id?: string;
}

const FloatingLabelSelect = (props: FloatingLabelSelectProps): JSX.Element => {
  const {
    open,
    children,
    label,
    testId,
    value,
    error,
    onClose,
    required,
    disabled,
    hasError,
    placeholder,
    id,
    onTogglePopover,
  } = props;
  const selectContainerRef = useRef(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(selectContainerRef, (event) => {
    if (open && !optionsRef?.current?.contains(event.target as Node)) {
      onClose();
    }
  });

  return (
    <div className={styles.container}>
      <div
        className={`${styles.selectContainer} ${hasError ? styles.hasError : ""} ${
          disabled ? styles.disabled : ""
        }`}
      >
        <div
          ref={selectContainerRef}
          onClick={() => {
            !disabled && (!open ? onTogglePopover() : onClose());
          }}
          onKeyDown={(event) => {
            if (event.key === "Tab" && open) {
              onClose();
            }
            if (event.key === "Enter" || event.code === "Space") {
              onTogglePopover();
            }
          }}
          className={`${styles.inputContainer} `}
          tabIndex={0}
          data-qa={testId}
        >
          {!placeholder && (
            <>
              <div
                aria-labelledby={`${id}-multiple-checkbox-label`}
                className={`${styles.label} ${open || value ? styles.isFocused : ""}`}
              >
                {label}
                {required ? "*" : ""}
              </div>
              {!!value.length && <span className={styles.value}>{value}</span>}
            </>
          )}
          {placeholder && (
            <>
              {!value.length && (
                <div className={styles.label} aria-labelledby={`${id}-multiple-checkbox-label`}>
                  {placeholder}
                  {required ? "*" : ""}
                </div>
              )}
              {!!value.length && <span className={styles.value}>{value}</span>}
            </>
          )}
          <FontAwesomeIcon icon={open ? faSortUp : faSortDown} />
        </div>
      </div>
      {hasError && !open && (
        <p className={styles.error} data-qa={`${testId}-error`}>
          {error}
        </p>
      )}
      {open && (
        <Popover className={styles.popoverContent} isOpen={open} placement="bottom-end">
          <div ref={optionsRef}>{children}</div>
        </Popover>
      )}
    </div>
  );
};

export { FloatingLabelSelect };
