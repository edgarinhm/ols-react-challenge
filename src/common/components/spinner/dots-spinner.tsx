import style from './dots-spinner.module.scss';

interface DotsSpinnerProps {
  show: boolean;
}
const DotsSpinner = ({ show }: DotsSpinnerProps): JSX.Element => {
  return show ? (
    <div className={style.dotsSpinner} data-qa="dots-spinner">
      <div className={style.bounce1}></div>
      <div className={style.bounce2}></div>
      <div></div>
    </div>
  ) : (
    <></>
  );
};

export { DotsSpinner };
