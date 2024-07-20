import { ReactNode, useId } from "react";
import styles from "./card.module.scss";

interface CardContainerProps {
  children: ReactNode;
  width?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

const Card = (props: CardContainerProps): JSX.Element => {
  const id = useId();
  const fallbackId = `modal-dialog-content-${id}`.replaceAll(":", "");
  const { width = "750px", children, ariaDescribedBy, ariaLabelledBy } = props;
  return (
    <div
      className={styles.card}
      style={{ width: width }}
      data-qa="card-dialog"
      role="dialog"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <div className={styles.cardBody} id={fallbackId} tabIndex={-1}>
        {children}
      </div>
    </div>
  );
};

interface CardHeaderProps {
  title: string | JSX.Element | (() => JSX.Element);
  type?: "warning" | "standard" | "inProgress" | "success";
  id?: string;
}

const header = (props: CardHeaderProps): JSX.Element => {
  const { title, type = "standard", id } = props;
  return (
    <div className={`${styles.header} ${styles[type]}`}>
      {typeof title === "function" ? (
        title()
      ) : (
        <h3 data-qa={`modal-dialog-${title}`} id={id}>
          {title}
        </h3>
      )}
    </div>
  );
};

Card.Header = header;

export default Card;
