import styles from "./avatar.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

interface AvatarProps {
  url?: string;
  alt?: string;
}

const Avatar = ({ url, alt = "User Avatar" }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      {url ? <img src={url} alt={alt} /> : <FontAwesomeIcon icon={faCircleUser} />}
    </div>
  );
};

export default Avatar;
