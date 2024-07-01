import style from "common/sass/modules/forms.module.scss";
import dayjs, { Dayjs } from "dayjs";
import React, {
  ChangeEventHandler,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import { DatepickerDateFormat } from "common/constants/format-strings";
import { formatter } from "common/formatters/formatters";
import { mergeRefs } from "common/functions/merge.refs";
import { useOnClickOutside } from "common/hooks/on-click-out-side";
import { Popover } from "../popover/popover";
import { Tooltip, TooltipPlacement } from "../tooltip/tooltip";

interface BaseControlProps {
  label?: string;
  showErrors?: boolean;
  errors?: string[];
  showWarnings?: boolean;
  warnings?: string[];
}

export interface AutoCompleteOptionProps {
  id: number;
  [key: string]: string | number;
}

interface InputControlProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseControlProps {
  type?: "number" | "button" | "email" | "password" | "text";
  iconLocation?: "before" | "after";
  onClear?: () => void;
}

interface AutoCompleteProps extends InputControlProps {
  options: AutoCompleteOptionProps[];
  renderOption: (value: any) => string | React.ReactElement;
  searchField: string;
  onSelect: (value: any) => void;
  renderValue: (value: any) => string;
  selectedId?: number | undefined | string;
  onSearch?: (filteredOptions: any) => void;
  popoverStyle?: string;
  hideList?: boolean;
}

interface DateInputProps extends BaseControlProps {
  selectedDate?: Dayjs | null;
  minDate: Dayjs;
  maxDate?: Dayjs;
  id?: string;
  name?: string;
  disabled?: boolean;
  toolTip?: string;
  toolTipPlacement?: TooltipPlacement;
  onSelectDate: (date: string) => void;
  readOnly?: boolean;
  dataInvalid?: boolean;
  excludeDates?: Dayjs[];
  ariaLabelledBy?: string;
  onKeyPressEnter?: (date?: string) => void;
  disableIgnoreOutsideClickClass?: boolean;
}
export interface DatePickerRef {
  setOpen: (value: boolean) => void;
  setFocus: () => void;
  isCalendarOpen: () => boolean;
}

interface TimeInputControlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    BaseControlProps {
  onSelectTime: (time: string) => void;
}

interface PhoneInputControlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "maxLength">,
    BaseControlProps {
  value: string;
}

interface ExpirationInputControlProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "type" | "maxLength" | "minLength" | "onChange"
    >,
    BaseControlProps {
  value: string;
  onChange: (value: string) => void;
}

interface SelectControlProps
  extends React.InputHTMLAttributes<HTMLSelectElement>,
    BaseControlProps {
  labelStyles?: string;
}

interface SelectOptionControlProps extends React.InputHTMLAttributes<HTMLOptionElement> {
  label?: string;
}

interface CheckInputControlProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseControlProps {
  type: "radio" | "checkbox";
  labelClassName?: string;
}

interface FileInputControlProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseControlProps {}

interface TextAreaControlProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseControlProps {
  showRemaining?: boolean;
}

type FormControlType = {
  FloatingLabelInput: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLInputElement> & InputControlProps
  >;
  Input: React.ForwardRefExoticComponent<React.RefAttributes<HTMLInputElement> & InputControlProps>;
  Select: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLSelectElement> & SelectControlProps
  >;
  SelectOption: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLOptionElement> & SelectOptionControlProps
  >;
  CheckInput: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLInputElement> & CheckInputControlProps
  >;
  TextArea: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLTextAreaElement> & TextAreaControlProps
  >;
  FloatingLabelTextArea: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLTextAreaElement> & TextAreaControlProps
  >;
  FileInput: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLInputElement> & FileInputControlProps
  >;
  FormattedPhoneInput: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLInputElement> & PhoneInputControlProps
  >;

  FormattedDateInput: React.ForwardRefExoticComponent<
    DateInputProps & React.RefAttributes<DatePickerRef>
  >;
  CustomFormattedDateInput: React.ForwardRefExoticComponent<
    DateInputProps & React.RefAttributes<DatePickerRef>
  >;
  TimeInput: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLInputElement> & TimeInputControlProps
  >;
  ExpirationDateInput: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLInputElement> & ExpirationInputControlProps
  >;
  AutoComplete: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLInputElement> & AutoCompleteProps
  >;
};

const CustomDateInput = forwardRef((forwardedProps: any, inputRef) => {
  const [dateCursor, setDateCursor] = useState<number | null>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [currentSelectionStart, setcurrentSelectionStart] = useState<number | null>(null);

  useLayoutEffect(() => {
    const input = dateRef.current;
    if (input) input.setSelectionRange(dateCursor, dateCursor);
  }, [dateCursor, forwardedProps.value]);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, selectionStart } = event.target;
    const formatted = formatter.date(value);

    let cursorPosition = 0;
    if (selectionStart !== null) {
      const offset = selectionStart >= value.length ? formatted.length - value.length : 0;
      cursorPosition = selectionStart + offset;

      if (
        currentSelectionStart !== null &&
        currentSelectionStart < selectionStart &&
        formatted.at(Math.max(0, cursorPosition - 1)) === "/"
      )
        cursorPosition++;
    }

    setDateCursor(cursorPosition);

    forwardedProps.onChange?.(event);
  };
  return (
    <input
      {...forwardedProps}
      value={formatter.date(forwardedProps.value)}
      onChange={changeHandler}
      ref={mergeRefs(inputRef, dateRef)}
      onSelect={(event) => {
        const target = event.target as HTMLInputElement;
        setcurrentSelectionStart(target.selectionStart);
      }}
      maxLength={10}
    />
  );
});

const ExpirationDateInput = forwardRef<HTMLInputElement, ExpirationInputControlProps>(
  (props, inputRef) => {
    const [cursor, setCursor] = useState<number | null>(null);
    const cursorRef = useRef<HTMLInputElement>(null);
    const [currentSelectionStart, setcurrentSelectionStart] = useState<number | null>(null);
    const { id, label, showErrors, errors, value, onChange, onSelect, ...rest } = props;
    const displayError = showErrors && !!errors?.length;

    useLayoutEffect(() => {
      const input = cursorRef.current;
      if (input) input.setSelectionRange(cursor, cursor);
    }, [cursor, props.value]);

    const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
      const { value, selectionStart } = event.target;
      const formatted = formatter.creditCardExpiration(value);

      let cursorPosition = 0;
      if (selectionStart !== null) {
        const offset = selectionStart >= value.length ? formatted.length - value.length : 0;
        cursorPosition = selectionStart + offset;

        if (
          currentSelectionStart !== null &&
          currentSelectionStart < selectionStart &&
          formatted.at(Math.max(0, cursorPosition - 1)) === "/"
        )
          cursorPosition++;
      }

      setCursor(cursorPosition);

      onChange?.(formatted);
    };
    return (
      <div className={displayError ? `${style.formControl} ${style.error}` : style.formControl}>
        {!!label && <label htmlFor={id}>{label}</label>}
        <span>
          <input
            id={id}
            ref={mergeRefs(cursorRef, inputRef)}
            type="text"
            {...rest}
            value={value}
            onChange={changeHandler}
            maxLength={5}
            minLength={5}
            onSelect={(event) => {
              const target = event.target as HTMLInputElement;
              setcurrentSelectionStart(target.selectionStart);
              onSelect?.(event);
            }}
          />
        </span>
        {displayError && <p>{errors[0]}</p>}
      </div>
    );
  }
);

export const DateInputIgnoreOutsideClickClass = "react-datepicker-ignore-onclickoutside";

export const FormattedDateInput = forwardRef<DatePickerRef, DateInputProps>((props, ref) => {
  const {
    selectedDate,
    id,
    label,
    onSelectDate,
    minDate,
    maxDate,
    showErrors,
    errors,
    showWarnings,
    warnings,
    disabled,
    name,
    toolTip,
    toolTipPlacement,
    readOnly,
    dataInvalid,
    excludeDates,
    ariaLabelledBy,
    disableIgnoreOutsideClickClass,
  } = props;

  const displayError = showErrors && !!errors?.length;
  const displayWarning = showWarnings && !!warnings?.length;
  const displayNonDefault = displayError || displayWarning;
  const inputRef = useRef<DatePickerRef | null>(null);
  const [displayToolTip, setDisplayToolTip] = useState<boolean>(false);

  return (
    <div
      className={`${style.inputDate} ${
        !disableIgnoreOutsideClickClass ? DateInputIgnoreOutsideClickClass : ""
      }`}
    >
      {label && (
        <label htmlFor={id}>
          {label}
          {!!toolTip && (
            <Tooltip
              open={displayToolTip}
              content={<div className={style.tooltipContent}>{toolTip}</div>}
              placement={toolTipPlacement}
            >
              <i
                className={`es-info-circle ${style.tooltipIcon}`}
                data-qa={`date-input-${id}-tooltip-icon`}
                onMouseEnter={() => setDisplayToolTip(true)}
                onMouseLeave={() => setDisplayToolTip(false)}
              ></i>
            </Tooltip>
          )}
        </label>
      )}
      <div
        className={
          displayNonDefault
            ? `${style.formControl} ${style.container} ${
                displayError ? style.error : style.warning
              }`
            : `${style.formControl} ${style.container}`
        }
        data-qa={`date-input-${id}`}
        data-invalid={dataInvalid}
      >
        <DatePicker
          ariaLabelledBy={ariaLabelledBy}
          name={name}
          disabled={disabled}
          dateFormat="MM/dd/yyyy"
          placeholderText="mm/dd/yyyy"
          ref={mergeRefs(ref, inputRef)}
          id={id}
          customInput={<CustomDateInput readOnly={readOnly} />}
          minDate={minDate.toDate()}
          maxDate={maxDate ? maxDate.toDate() : undefined}
          excludeDates={
            excludeDates?.length ? excludeDates.map((date) => date.toDate()) : undefined
          }
          selected={selectedDate ? selectedDate.toDate() : null}
          onChange={(date) => {
            const formatted = date ? formatter.date(dayjs(date).format(DatepickerDateFormat)) : "";
            onSelectDate(formatted && dayjs(formatted).format("YYYY-MM-DD"));
          }}
          onChangeRaw={(event: any) => {
            const formatted = formatter.date(event.target.value);
            const date = dayjs(formatted);
            if (date.isValid()) {
              onSelectDate(date.format("YYYY-MM-DD"));
            }
          }}
          popperPlacement="bottom-start"
          popperClassName={style.popper}
          popperModifiers={[
            {
              name: "arrow",
              options: {
                padding: ({ popper }: { popper: any }) => popper.width / 2,
              },
              fn(state) {
                return state;
              },
            },
          ]}
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={150}
          enableTabLoop={false}
          wrapperClassName={style.datepickerWrapper}
        ></DatePicker>
        <button
          onClick={() => {
            const open = inputRef.current?.isCalendarOpen();
            inputRef.current?.setOpen(!open);
            if (!open) {
              inputRef.current?.setFocus();
            }
          }}
          className={`${style.iconAfter} ${disabled ? style.iconAfterDisabled : ""}`}
          data-qa={`date-input-icon-${id}`}
          type="button"
        >
          <i className={"es-calendar"} />
        </button>
      </div>
      {displayNonDefault && (
        <p
          className={displayError ? style.errorBlock : style.warningBlock}
          data-qa={`input-error-${id}`}
        >
          {displayError ? errors[0] : warnings?.[0]}
        </p>
      )}
    </div>
  );
});

export const CustomFormattedDateInput = forwardRef<DatePickerRef, DateInputProps>((props, ref) => {
  const {
    selectedDate,
    id,
    label,
    onSelectDate,
    minDate,
    maxDate,
    showErrors,
    errors,
    showWarnings,
    warnings,
    disabled,
    name,
    dataInvalid,
    excludeDates,
    ariaLabelledBy,
    onKeyPressEnter,
  } = props;

  const displayError = showErrors && !!errors?.length;
  const displayWarning = showWarnings && !!warnings?.length;
  const displayNonDefault = displayError || displayWarning;
  const inputRef = useRef<DatePickerRef | null>(null);

  return (
    <div className={style.inputDate}>
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={
          displayNonDefault
            ? `${style.formControl} ${style.container} ${
                displayError ? style.error : style.warning
              }`
            : `${style.formControl} ${style.container}`
        }
        data-qa={`date-input-${id}`}
        data-invalid={dataInvalid}
      >
        <DatePicker
          ariaLabelledBy={ariaLabelledBy}
          name={name}
          disabled={disabled}
          dateFormat="M/d/yy"
          placeholderText="M/D/YY"
          ref={mergeRefs(ref, inputRef)}
          id={id}
          minDate={minDate.toDate()}
          maxDate={maxDate ? maxDate.toDate() : undefined}
          excludeDates={
            excludeDates?.length ? excludeDates.map((date) => date.toDate()) : undefined
          }
          selected={selectedDate ? selectedDate.toDate() : null}
          onChange={(date) => {
            const formatted = date ? formatter.date(dayjs(date).format(DatepickerDateFormat)) : "";
            onSelectDate(formatted && dayjs(formatted).format("YYYY-MM-DD"));
          }}
          onChangeRaw={(event: any) => {
            const formatted = formatter.date(event.target.value);
            const date = dayjs(formatted);
            if (date.isValid()) {
              onSelectDate(date.format("YYYY-MM-DD"));
            }
          }}
          onSelect={(date) => {
            const formatted = date ? formatter.date(dayjs(date).format(DatepickerDateFormat)) : "";
            onKeyPressEnter?.(dayjs(formatted).format("YYYY-MM-DD"));
          }}
          popperPlacement="bottom-start"
          popperClassName={style.popper}
          popperModifiers={[
            {
              name: "arrow",
              options: {
                padding: ({ popper }: { popper: any }) => popper.width / 2,
              },
              fn(state) {
                return state;
              },
            },
          ]}
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={150}
          enableTabLoop={false}
          wrapperClassName={style.datepickerWrapper}
          onKeyDown={(event: any) => {
            const value = event.target.value;
            if (event.key === "Tab") {
              const regex = new RegExp(`^(0?[1-9]|1[0-2])/(0?[1-9]|1\\d|2[0-9]|3[01])/\\d{2}$`);
              if (regex.test(value)) {
                inputRef.current?.setOpen(false);
                onKeyPressEnter?.();
              } else {
                event.preventDefault();
                if (dayjs(value).isValid()) {
                  event.target.value = value + "/";
                } else {
                  inputRef.current?.setOpen(false);
                }
              }
            }
            if (event.key === "Enter") {
              onKeyPressEnter?.();
            }
          }}
        ></DatePicker>
        <button
          onClick={() => {
            const open = inputRef.current?.isCalendarOpen();
            inputRef.current?.setOpen(!open);
            if (!open) {
              inputRef.current?.setFocus();
            }
          }}
          tabIndex={-1}
          className={`${style.iconAfter} ${disabled ? style.iconAfterDisabled : ""}`}
          data-qa={`date-input-icon-${id}`}
          type="button"
        >
          <i className={"es-calendar"} />
        </button>
      </div>
      {displayNonDefault && (
        <p
          className={displayError ? style.errorBlock : style.warningBlock}
          data-qa={`input-error-${id}`}
        >
          {displayError ? errors[0] : warnings?.[0]}
        </p>
      )}
    </div>
  );
});

const TimeInput = forwardRef<HTMLInputElement, TimeInputControlProps>((props, ref) => {
  const { id, label, showErrors, errors, onSelectTime, ...rest } = props;
  const displayError = showErrors && !!errors?.length;
  const timeRef = useRef<HTMLInputElement>(null);
  const [hour, minute] = rest?.value ? rest.value.toString().split(":") : ["", ""];

  const timeSuffix = hour ? (hour >= "12" ? "PM" : "AM") : "";

  const handleToAM = () => {
    if (hour >= "12") {
      const newTime = dayjs()
        .set("hour", Number(hour) - 12)
        .set("minute", Number(minute))
        .format("HH:mm");
      onSelectTime(newTime);
    }
  };

  const handleToPM = () => {
    if (hour < "12") {
      const newTime = dayjs()
        .set("hour", Number(hour) + 12)
        .set("minute", Number(minute))
        .format("HH:mm");
      onSelectTime(newTime);
    }
  };

  return (
    <div className={displayError ? `${style.formControl} ${style.error}` : style.formControl}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <span className={style.timeInput}>
        <input
          className={style.inputLeft}
          id={id}
          ref={mergeRefs(ref, timeRef)}
          type="time"
          onChange={(e) => onSelectTime(e.target.value)}
          {...rest}
        />
        <div
          className={`${style.iconAfter} ${style.inputLeft} ${
            !props.disabled ? (timeSuffix === "AM" ? style.active : "") : style.disabled
          }`}
          onClick={!props.disabled ? handleToAM : undefined}
          role="button"
        >
          AM
        </div>
        <div
          className={`${style.iconAfter} ${
            !props.disabled ? (timeSuffix === "PM" ? style.active : "") : style.disabled
          }`}
          onClick={!props.disabled ? handleToPM : undefined}
          role="button"
        >
          PM
        </div>
      </span>
      {displayError && <p>{errors[0]}</p>}
    </div>
  );
});

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>((props, ref) => {
  const {
    showErrors,
    options,
    searchField,
    errors,
    id,
    label,
    renderOption,
    type = "text",
    renderValue,
    onSelect,
    selectedId,
    onSearch,
    popoverStyle,
    hideList,
    ...rest
  } = props;
  const displayError = showErrors && !!errors?.length;
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [optionData, setOptionData] = useState<AutoCompleteOptionProps[]>(
    options || ([] as AutoCompleteOptionProps[])
  );
  const [active, setActive] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(inputRef, (event) => {
    if (!inputRef?.current?.contains(event.target as Node)) {
      setOpen(false);
    }
  });

  useEffect(() => {
    const selected = selectRef.current?.querySelector(`.${style.active}`);
    if (selected) {
      selected.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [active]);

  // run only on initial render
  useEffect(() => {
    if (selectedId) {
      setActive(options.findIndex((option) => option.id === selectedId) || 0);
      const selectedOption = options.find((option) => option.id === selectedId);
      if (selectedOption) {
        setSearch(renderValue(selectedOption));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  // reset  search value
  useEffect(() => {
    if (!selectedId) {
      setActive(0);
      setSearch("");
      setOptionData(options);
    }
  }, [selectedId, options]);

  const handleOnFocus = () => setOpen(true);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    setActive(0);
    if (value === "") {
      setOptionData(options);
      onSelect(null);
      if (!open) setOpen(true);
      return;
    }
    const filteredOptions = options.filter(
      (option) => option[searchField].toString().toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    if (onSearch) onSearch(filteredOptions);
    setOptionData(filteredOptions);
    if (filteredOptions.length && !open) setOpen(true);
  };

  const onClickHandler = (option: AutoCompleteOptionProps): void => {
    const selectedIndex = optionData.findIndex((opt) => opt.id === option.id);
    setActive(selectedIndex);
    setSearch(renderValue(option));
    onSelect(option);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const selectedItem = optionData[active];
      if (selectedItem) {
        onSelect(selectedItem);
        setSearch(renderValue(selectedItem));
      }
      setActive(active);
      setOpen(false);
    } else if (e.key === "ArrowUp") {
      return active === 0 ? null : setActive(active - 1);
    } else if (e.key === "ArrowDown") {
      return active === optionData.length - 1 ? optionData.length : setActive(active + 1);
    } else if (e.key === "Tab") {
      if (open) setOpen(false);
    }
  };

  useEffect(() => {
    setOpen(false);
    inputRef.current?.blur();
  }, [hideList]);

  return (
    <div
      ref={ref}
      className={`${style.autoComplete} ${
        displayError ? `${style.formControl} ${style.error}` : style.formControl
      }`}
    >
      {!!label && <label htmlFor={id}>{label}</label>}
      <input
        value={search}
        onChange={onChangeHandler}
        onFocus={handleOnFocus}
        onKeyDown={onKeyDown}
        id={id}
        ref={inputRef}
        type={type}
        {...rest}
      />
      {
        <div ref={selectRef}>
          <Popover isOpen={open} placement="bottom-start" className={style.autoCompleteOptions}>
            <div className={popoverStyle}>
              {optionData.map((option, index) => {
                const label = renderOption(option);
                return (
                  <div
                    data-qa={`autocomplete-option-${option.id}`}
                    key={option.id}
                    onClick={() => onClickHandler(option)}
                    className={`${style.renderOption} ${active === index ? `${style.active}` : ""}`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </Popover>
        </div>
      }
      {displayError && <p data-qa={`input-error-${id}`}>{errors[0]}</p>}
    </div>
  );
});

const FloatingLabelInput = forwardRef<HTMLInputElement, InputControlProps>((props, ref) => {
  const {
    id,
    label,
    disabled,
    required,
    type = "text",
    showErrors,
    value,
    errors,
    onClear,
    ...rest
  } = props;
  const displayError = showErrors && !!errors?.length;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClear = () => {
    if (onClear) {
      inputRef?.current?.focus();
      onClear();
    }
  };
  return (
    <div
      className={`${style.floatingInputContainer} ${displayError ? style.floatingInputError : ""} `}
      ref={ref}
    >
      <input
        required={required}
        disabled={disabled}
        value={value}
        id={id}
        ref={inputRef}
        type={type}
        autoComplete="off"
        {...rest}
      />
      <label
        className={`${value ? style.focused : ""} ${disabled ? style.disabledLabel : ""}`}
        htmlFor={id}
      >
        {`${label}${required ? "*" : ""}`}
      </label>
      {value && <i onClick={handleOnClear} className={`es-times ${style.cross}`} />}
      {displayError && <p data-qa={`input-error-${id}`}>{errors[0]}</p>}
    </div>
  );
});

const FloatingLabelTextArea = forwardRef<HTMLTextAreaElement, TextAreaControlProps>(
  (props, ref) => {
    const { id, label, disabled, required, showErrors, value, errors, ...rest } = props;
    const displayError = showErrors && !!errors?.length;

    return (
      <div
        className={`${style.floatingInputContainer}  ${
          displayError ? style.floatingInputError : ""
        }`}
      >
        <textarea
          required={required}
          disabled={disabled}
          value={value}
          id={id}
          ref={ref}
          autoComplete="off"
          {...rest}
        />
        <label
          className={`${value ? style.focused : ""} ${disabled ? style.disabledLabel : ""}`}
          htmlFor={id}
        >
          {`${label}${required ? "*" : ""}`}
        </label>
        {displayError && <p data-qa={`input-error-${id}`}>{errors[0]}</p>}
      </div>
    );
  }
);

const Input = forwardRef<HTMLInputElement, InputControlProps>((props, ref) => {
  const {
    id,
    label,
    type = "text",
    iconLocation,
    showErrors,
    errors,
    children: icon,
    ...rest
  } = props;
  const displayError = showErrors && !!errors?.length;

  return (
    <div className={displayError ? `${style.formControl} ${style.error}` : style.formControl}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <span>
        {iconLocation === "before" && icon}

        <input
          className={`${iconLocation === "before" ? style.inputRight : ""} ${
            iconLocation === "after" ? style.inputLeft : ""
          }`}
          id={id}
          ref={ref}
          type={type}
          {...rest}
        />

        {iconLocation === "after" && icon}
      </span>
      {displayError && <p data-qa={`input-error-${id}`}>{errors[0]}</p>}
    </div>
  );
});

const FormattedPhoneInput = forwardRef<HTMLInputElement, PhoneInputControlProps>((props, ref) => {
  const { id, label, showErrors, errors, value, onChange, ...rest } = props;
  const displayError = showErrors && !!errors?.length;

  // needed to manage cursor position due to formatting
  const [phoneCursor, setPhoneCursor] = useState<number | null>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const input = phoneRef.current;
    if (input) input.setSelectionRange(phoneCursor, phoneCursor);
  }, [phoneCursor, value]);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, selectionStart } = event.target;
    const formatted = formatter.phone(value);

    let cursorPosition = 0;
    if (selectionStart !== null) {
      const offset = selectionStart >= value.length ? formatted.length - value.length : 0;
      cursorPosition = selectionStart + offset;
    }

    setPhoneCursor(cursorPosition);

    onChange?.(event);
  };

  return (
    <div className={displayError ? `${style.formControl} ${style.error}` : style.formControl}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <span>
        <input
          id={id}
          ref={mergeRefs(phoneRef, ref)}
          type="tel"
          {...rest}
          value={formatter.phone(value)}
          onChange={changeHandler}
          maxLength={14}
        />
      </span>
      {displayError && <p>{errors[0]}</p>}
    </div>
  );
});

const Select = forwardRef<HTMLSelectElement, SelectControlProps>((props, ref) => {
  const { id, label, showErrors, errors, children: options, labelStyles, ...rest } = props;
  const displayError = showErrors && !!errors?.length;
  return (
    <div className={displayError ? `${style.formControl} ${style.error}` : style.formControl}>
      {!!label && (
        <label htmlFor={id} className={labelStyles}>
          {label}
        </label>
      )}
      <span>
        <select id={id} ref={ref} {...rest}>
          {options}
        </select>
      </span>
      {displayError && <p data-qa={`input-error-${id}`}>{errors[0]}</p>}
    </div>
  );
});

const SelectOption = forwardRef<HTMLOptionElement, SelectOptionControlProps>((props, ref) => {
  const { label, value, ...rest } = props;
  return (
    <option ref={ref} value={value} {...rest}>
      {label ?? value}
    </option>
  );
});

const CheckInput = forwardRef<HTMLInputElement, CheckInputControlProps>((props, ref) => {
  const { id, label, showErrors, errors, type, labelClassName, ...rest } = props;
  const displayError = showErrors && !!errors?.length;

  return (
    <div className={displayError ? `${style.formControl} ${style.error}` : style.formControl}>
      <div className={style.checkInput}>
        <input id={id} ref={ref} type={type} {...rest} />
        {!!label && (
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
        )}
      </div>
      {displayError && <p>{errors[0]}</p>}
    </div>
  );
});

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaControlProps>((props, ref) => {
  const { id, label, showErrors, errors, showRemaining, ...rest } = props;
  const displayError = showErrors && !!errors?.length;

  return (
    <div className={displayError ? `${style.formControl} ${style.error}` : style.formControl}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <textarea id={id} ref={ref} {...rest} />
      {showRemaining && rest.maxLength !== undefined && (
        <div className={style.remainingCount}>
          {`${rest.maxLength - String(rest.value || "").length}`} characters remaining
        </div>
      )}
      {displayError && (
        <div className={style.errorBlock} data-qa={`input-error-${id}`}>
          {errors[0]}
        </div>
      )}
    </div>
  );
});

const FileInput = forwardRef<HTMLInputElement, FileInputControlProps>((props, ref) => {
  const { id, label, showErrors, errors, ...rest } = props;
  const displayError = showErrors && !!errors?.length;

  return (
    <div className={displayError ? `${style.formControl} ${style.error}` : style.formControl}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <span className={style.fileInput}>
        <label htmlFor={id} className={displayError ? style.fileInputError : ""}>
          Choose File
        </label>
        <input id={id} ref={ref} type="file" {...rest} />
      </span>
      {displayError && <p>{errors[0]}</p>}
    </div>
  );
});

const FormControl: FormControlType = {
  FloatingLabelInput: FloatingLabelInput,
  FloatingLabelTextArea: FloatingLabelTextArea,
  Input: Input,
  Select: Select,
  SelectOption: SelectOption,
  CheckInput: CheckInput,
  TextArea: TextArea,
  FileInput: FileInput,
  FormattedPhoneInput: FormattedPhoneInput,
  TimeInput: TimeInput,
  FormattedDateInput: FormattedDateInput,
  ExpirationDateInput: ExpirationDateInput,
  AutoComplete: AutoComplete,
  CustomFormattedDateInput: CustomFormattedDateInput,
};

export { FormControl };
