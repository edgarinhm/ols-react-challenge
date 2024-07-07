import { flip, Placement } from "@floating-ui/react-dom-interactions";
import { SyntheticEvent, useRef, useState, forwardRef, ReactNode } from "react";
import styles from "./actions-popover.module.scss";
import { PopoverActions } from "common/models/popover-actions";
import { Popover } from "./popover";
import { useOnClickOutside } from "common/hooks/on-click-out-side";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faCaretDown,
  faChevronCircleRight,
  faEllipsisVertical,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
export const GearButton = forwardRef<HTMLDivElement>(function GearButton(_, ref) {
  return (
    <div className={styles.popoverMenuButton} tabIndex={0} ref={ref}>
      <div className={styles.gear}>
        <FontAwesomeIcon icon={faGear} />
      </div>
      <div className={styles.caretDown}>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
    </div>
  );
});

export const GearButtonNoCaret = forwardRef<HTMLDivElement>(function GearButtonNoCaret(_, ref) {
  return (
    <div className={styles.popoverMenuButton} tabIndex={0} ref={ref}>
      <div className={styles.gear}>
        <FontAwesomeIcon icon={faGear} />
      </div>
    </div>
  );
});

export const ArrowButton = forwardRef<HTMLDivElement>(function ArrowButton(_, ref) {
  return (
    <div className={styles.popoverMenuButton} tabIndex={0} ref={ref}>
      <div>
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </div>
    </div>
  );
});

export const MenuButton = forwardRef<HTMLDivElement>(function MenuButton(_, ref) {
  return (
    <div className={styles.popoverMenuButton} tabIndex={0} ref={ref}>
      <div>
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
    </div>
  );
});

export const MenuVerticalButton = forwardRef<HTMLDivElement>(function MenuButton(_, ref) {
  return (
    <div className={styles.popoverMenuButton} tabIndex={0} ref={ref}>
      <div>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
    </div>
  );
});

export const CaretDownButton = forwardRef<HTMLDivElement>(function CaretDownButton(_, ref) {
  return (
    <div className={styles.popoverMenuButton} tabIndex={0} ref={ref}>
      <div className={styles.popoverCaretButton}>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
    </div>
  );
});

const ActionsPopover = ({
  menuOptions,
  placement,
  children: actionButton,
  disabled,
}: {
  menuOptions: PopoverActions[];
  placement: Placement;
  children: ReactNode;
  disabled?: boolean;
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
      data-qa="actions-button"
      tabIndex={-1}
      role="button"
    >
      <Popover
        className={styles.popoverContent}
        isOpen={popoverOpen}
        placement={placement}
        tabIndex={0}
        onMouseLeave={() => setPopoverOpen(false)}
        data-qa="action-popover"
        middleware={[flip()]}
        actionElement={actionButton}
      >
        {menuOptions.map((link) => (
          <div
            className={styles.link + ` ${link.disabled ? styles.disabled : ""}`}
            key={link.text}
            tabIndex={0}
            onClick={() => !link.disabled && link.action()}
            onKeyDown={(event) => {
              if (event.key.toLowerCase() === "enter" && !link.disabled) {
                link.action();
              }
            }}
            data-qa="action-popover-item"
            role="link"
          >
            {link.text}
          </div>
        ))}
      </Popover>
    </div>
  );
};

export { ActionsPopover };
