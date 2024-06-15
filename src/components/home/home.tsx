import MainSideBar from 'components/side-bar/main-side-bar/main-side.bar';
import styles from './home.module.scss';
import { HomeRoutes } from '../../Router';
const Home = (): JSX.Element => {
  return (
    <div className={styles.home}>
      <MainSideBar />
      <div className={styles.content} id="scrollable-div">
        <HomeRoutes />
      </div>
    </div>
  );
};

export default Home;
