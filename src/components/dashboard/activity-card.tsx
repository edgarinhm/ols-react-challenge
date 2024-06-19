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
    <div className={`${styles.card} ${styleColor}`}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardCount}>{count}</div>
      <div className={styles.cardDescription}>{bodyText}</div>
    </div>
  );
};

export default ActivityCard;
