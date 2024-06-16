import styles from "./activity-card.module.scss";
interface ActivityCardProps {
  title: string;
  bodyText: string;
  count: number;
  styleColor?: string;
}

const ActivityCard = ({
  title,
  bodyText,
  count: counts,
  styleColor = "white",
}: ActivityCardProps): JSX.Element => {
  return (
    <div className={`${styles.card} ${styleColor}`}>
      <div>{title}</div>
      <div>{counts}</div>
      <div>{bodyText}</div>
    </div>
  );
};

export default ActivityCard;
