import { InputHTMLAttributes, forwardRef } from 'react';
import style from 'common/sass/modules/forms.module.scss';

interface BaseControlProps {
  label?: string;
  showErrors?: boolean;
  errors?: string[];
  showWarnings?: boolean;
  warnings?: string[];
}

interface InputControlProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BaseControlProps {
  type?: 'number' | 'button' | 'email' | 'password' | 'text';
  iconLocation?: 'before' | 'after';
  onClear?: () => void;
}

type FormControlType = {
  Input: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLInputElement> & InputControlProps
  >;
};

const Input = forwardRef<HTMLInputElement, InputControlProps>((props, ref) => {
  const {
    id,
    label,
    type = 'text',
    iconLocation,
    showErrors,
    errors,
    children: icon,
    ...rest
  } = props;
  const displayError = showErrors && !!errors?.length;

  return (
    <div
      className={
        displayError ? `${style.formControl} ${style.error}` : style.formControl
      }
    >
      {!!label && <label htmlFor={id}>{label}</label>}
      <span>
        {iconLocation === 'before' && icon}

        <input
          className={`${iconLocation === 'before' ? style.inputRight : ''} ${
            iconLocation === 'after' ? style.inputLeft : ''
          }`}
          id={id}
          ref={ref}
          type={type}
          {...rest}
        />

        {iconLocation === 'after' && icon}
      </span>
      {displayError && <p data-qa={`input-error-${id}`}>{errors[0]}</p>}
    </div>
  );
});

const FormControl: FormControlType = {
  Input: Input,
};

export { FormControl };
