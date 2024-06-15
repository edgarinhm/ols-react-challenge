import styles from './avatar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface AvatarProps {
  url: string;
}

const Avatar = ({ url }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      {url ? (
        <img src={url} alt={'Avatar'} />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
    </div>
  );
};

export default Avatar;
