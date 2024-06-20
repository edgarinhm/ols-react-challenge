import styles from "./activity-card.module.scss";

interface ActivityCardProps {
  title: string;
  bodyText: string;
  count?: number;
  styleColor?: string;
}

const ActivityCard = ({
  title,
  bodyText,
  count = 0,
  styleColor = "white",
}: ActivityCardProps): JSX.Element => {
  return (
    <div className={`${styles.card} ${styles[styleColor]}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles.count}>{count}</div>
      <div className={styles.description}>{bodyText}</div>
    </div>
  );
};

export default ActivityCard;
