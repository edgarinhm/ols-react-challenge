import { createPortal } from 'react-dom';
import style from './spinner.module.scss';

interface SpinnerProps {
  show: boolean;
  text?: string;
  size?: 'Small';
  overlay?: 'None' | 'Component' | 'Page';
}

const Spinner = (props: SpinnerProps): JSX.Element => {
  const { text = '', size = '', show, overlay = 'Page' } = props;
  const loadingSpinnerSize = style[`loadingSpinner${size}`];
  const loadingOverlay =
    overlay !== 'None' ? style[`loadingOverlay${overlay}`] : '';

  const spinner = (
    <div
      className={`${loadingSpinnerSize} ${loadingOverlay}`}
      data-qa="loading-spinner"
    >
      <div className={style[`loading${size}`]}>
        <div className={`${style.loading1} ${style.lCircle}`}></div>
        <div className={`${style.loading2} ${style.lCircle}`}></div>
        <div className={`${style.loading3} ${style.lCircle}`}></div>
        <div className={`${style.loading4} ${style.lCircle}`}></div>
        <div className={`${style.loading5} ${style.lCircle}`}></div>
        <div className={`${style.loading6} ${style.lCircle}`}></div>
        <div className={`${style.loading7} ${style.lCircle}`}></div>
        <div className={`${style.loading8} ${style.lCircle}`}></div>
        <div className={`${style.loading9} ${style.lCircle}`}></div>
        <div className={`${style.loading10} ${style.lCircle}`}></div>
        <div className={`${style.loading11} ${style.lCircle}`}></div>
        <div className={`${style.loading12} ${style.lCircle}`}></div>
      </div>
      <div className={style[`loadingText${size}`]}>{text.toUpperCase()}</div>
    </div>
  );

  if (show) {
    // NOTE: portal used for page level spinner so that it works inside components
    // using the transfrom css prop (like our modals)
    return overlay === 'Page'
      ? createPortal(
          spinner,
          document.getElementById('modal-root') ?? document.body
        )
      : spinner;
  }

  return <></>;
};

export { Spinner };
