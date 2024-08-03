import { GetEnvironmentFromLocationUrl } from "common/functions/environment";
import styles from "./top-bar.module.scss";
import logoImg from "/logo.png";
import { useTopBarStorage } from "common/state-management/top-bar-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Brand = () => {
  const { name: environmentName } = GetEnvironmentFromLocationUrl();

  const { isMainSideBarOpen, setTopBarState } = useTopBarStorage((state) => ({
    isMainSideBarOpen: state.isMainSideBarOpen,
    setTopBarState: state.setState,
  }));

  const handleMainSideBar = (): void => {
    setTopBarState((state) => {
      state.isMainSideBarOpen = !state.isMainSideBarOpen;
    });
  };

  return (
    <div className={`${!isMainSideBarOpen ? styles.sideBarCollapsed : styles.sideBarOpen}`}>
      <div className={`${styles.brand}`}>
        <a href="#">
          <img src={logoImg} alt={"logo"} />
        </a>
      </div>
      <div className={styles.userMenuEnvironment}>
        <button
          type="button"
          className={styles.sideBarMenuBtn}
          title={"sidebar menu"}
          onClick={handleMainSideBar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className={styles.environment}>
          {"OLS:"} <strong>{environmentName}</strong>
        </span>
      </div>
    </div>
  );
};

export default Brand;
