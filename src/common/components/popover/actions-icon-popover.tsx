import { flip, Placement } from "@floating-ui/react-dom-interactions";
import { SyntheticEvent, useRef, useState, ReactNode } from "react";
import styles from "./actions-popover.module.scss";
import { PopoverActionsIcon } from "common/models/popover-actions";
import { Popover } from "./popover";
import { useOnClickOutside } from "common/hooks/on-click-out-side";

const ActionsIconPopover = ({
  menuOptions,
  placement,
  children: actionButton,
  disabled,
  title,
}: {
  menuOptions: PopoverActionsIcon[];
  placement: Placement;
  children: ReactNode;
  disabled?: boolean;
  title?: string;
}): JSX.Element => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleKeyDown = (event: SyntheticEvent<HTMLElement, KeyboardEvent>) => {
    const { key } = event.nativeEvent;
    if (key.toLowerCase() === "escape") {
      setPopoverOpen(false);
    }
  };

  const tabRef = useRef(null);
  useOnClickOutside(tabRef, () => popoverOpen && setPopoverOpen(false));

  const setRef = (node: never) => {
    if (node) {
      tabRef.current = node;
    }
  };

  return (
    <div
      ref={setRef}
      className={styles.actionsPopover}
      onClick={(e) => {
        e.stopPropagation();
        if (disabled) {
          return;
        }
        setPopoverOpen(!popoverOpen);
      }}
      onKeyDown={handleKeyDown}
      data-qa="actions-icon-button"
      tabIndex={-1}
      role="button"
    >
      <Popover
        className={styles.popoverContent}
        isOpen={popoverOpen}
        placement={placement}
        tabIndex={0}
        onMouseLeave={() => setPopoverOpen(false)}
        data-qa="action-icon-popover"
        middleware={[flip()]}
        actionElement={actionButton}
      >
        {title ? <div className={styles.title}>{title}</div> : null}
        {menuOptions.map((link) => (
          <div
            className={styles.link + ` ${styles.iconGroup} ${link.disabled ? styles.disabled : ""}`}
            key={`${link.idKey ?? link.text}}`}
            tabIndex={0}
            onClick={() => !link.disabled && link.action()}
            onKeyDown={(event) => {
              if (event.key.toLowerCase() === "enter" && !link.disabled) {
                link.action();
              }
            }}
            data-qa="action-icon-popover-item"
            role="link"
          >
            <div className={styles.icon}>{link.icon}</div>
            <div className={styles.text}> {link.children ?? link.text}</div>
          </div>
        ))}
      </Popover>
    </div>
  );
};

export { ActionsIconPopover };
