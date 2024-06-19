/** @jsxImportSource theme-ui */
import { get } from 'theme-ui';
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  RefObject,
  TextareaHTMLAttributes,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Icon, { IconProps } from '../Icon/Icon';
import { InputGroupContext } from '../InputGroup/Context';

export type InputProps = {
  /** Input type */
  type?: HTMLInputElement['type'];
  /** The value of the `input` element, required for a controlled component */
  value?: string;
  /** Callback fired when the value is changed */
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  /** Callback fired when the input is unfocused */
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Placeholder text content */
  placeholder?: string;

  /** Controls which state the input will be displayed in */
  state?: 'default' | 'error' | 'success';
  /** If `true`, the `input` element will be disabled */
  disabled?: boolean;
  /** If `true`, the `input` is required */
  required?: boolean;

  /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
  id?: string;
  /** Text at the end of the input */
  unit?: string;
  /** Name of the icon to be placed at the end of the input */
  iconName?: IconProps['name'];

  /** Will render a textarea instead of an input if `true` */
  multiline?: boolean;
  /** If true, the textarea will grow as the user types */
  autoExpand?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export function autoExpander(element?: HTMLTextAreaElement): void {
  if (!element || !element.scrollHeight) return;
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  function Input(
    {
      id,
      type = 'text',
      value,
      onChange,
      onBlur,
      placeholder,
      disabled = false,
      state = 'default',
      required = false,
      iconName,
      unit,
      className,
      style,
      multiline = false,
      autoExpand = true,
      rows = 1,
      cols,
      readOnly,
      ...htmlProps
    }: InputProps,
    ref
  ) {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const inputGroupContext = useContext(InputGroupContext);
    const isGrouped = !!inputGroupContext;

    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputType = useMemo(() => {
      if (type === 'password') {
        return passwordVisible ? 'text' : 'password';
      }
      return type;
    }, [passwordVisible, type]);

    useImperativeHandle<
      HTMLInputElement | HTMLTextAreaElement | null,
      HTMLInputElement | HTMLTextAreaElement | null
    >(ref, () => inputRef.current);

    useEffect(() => {
      autoExpander(inputRef?.current as HTMLTextAreaElement);
    }, []);

    return (
      <div
        sx={{
          flexGrow: 1,
          ...(isGrouped && {
            ...(!inputGroupContext?.isLast && {
              borderRight: '1px solid',
              borderColor: 'text.90',
            }),
          }),
        }}
      >
        <div
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: 2,

            paddingY: '6px', // the 2px border counts towards height, so we need 6px instead of 8px for the correct height
            paddingX: 3,
            ...{
              default: {
                backgroundColor: value ? 'secondary.alpha.90' : 'text.alpha.95',
              },
              success: {
                backgroundColor: 'success.alpha.95',
              },
              error: {
                backgroundColor: 'primary.alpha.95',
              },
            }[state],
            outline: 0,
            borderRadius: 2,
            border: '2px solid transparent',
            ...(isGrouped && {
              ...(!inputGroupContext?.isFirst && {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }),
              ...(!inputGroupContext?.isLast && {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }),
            }),

            transition: 'all 0.2s',
            '&:hover': {
              ...(state === 'default' && {
                backgroundColor: value ? 'secondary.alpha.85' : 'text.alpha.90',
              }),
            },
            ...{
              default: {},
              success: {
                borderColor: 'success',
              },
              error: {
                borderColor: 'primary',
              },
            }[state],
            ...(!readOnly && {
              '&:focus-within': {
                borderColor: 'secondary',
                boxShadow: (theme) =>
                  `0px 0px 0px 4px ${get(theme, 'colors.secondary.alpha.90')}`,
                backgroundColor: '#FFF',
              },
            }),
          }}
          className={className}
          style={style}
        >
          {multiline ? (
            <textarea
              id={id}
              ref={inputRef as RefObject<HTMLTextAreaElement>}
              required={required}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              rows={rows}
              cols={cols}
              onChange={onChange}
              onBlur={onBlur}
              onInput={
                autoExpand
                  ? (event) => autoExpander(event.currentTarget)
                  : undefined
              }
              aria-invalid={state === 'error'}
              size={1} // Input has a default size property of 20, which limits it's minimum width. Setting it to 1 and handling width through the parent so that we can control the input width better.
              {...htmlProps}
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'text',
                flexGrow: 1,
                outline: 0,
                p: 0,
                resize: 'none',
                variant: 'text.body1',
                width: '100%',

                // removes background color when input was filled with autofill in chromium
                '&:-webkit-autofill': {
                  WebkitBackgroundClip: 'text',
                },
              }}
            />
          ) : (
            <input
              id={id}
              type={inputType}
              ref={inputRef as RefObject<HTMLInputElement>}
              required={required}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={state === 'error'}
              readOnly={readOnly}
              size={1} // Input has a default size property of 20, which limits it's minimum width. Setting it to 1 and handling width through the parent so that we can control the input width better.
              {...htmlProps}
              sx={{
                width: '100%',
                flexGrow: 1,
                outline: 0,
                backgroundColor: 'transparent',
                border: 'none',
                p: 0,
                color: 'text',
                variant: 'text.body1',

                // removes background color when input was filled with autofill in chromium
                '&:-webkit-autofill': {
                  WebkitBackgroundClip: 'text',
                },
              }}
            />
          )}

          {unit && (
            <label
              htmlFor={id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'text.40',
              }}
            >
              {unit}
            </label>
          )}
          {iconName && (
            <Icon name={iconName} size={16} sx={{ color: 'text.40' }} />
          )}
          {type === 'password' && (
            <div
              onClick={() => setPasswordVisible((value) => !value)}
              sx={{
                display: 'flex',
                color: passwordVisible ? 'secondary' : 'text.40',
                cursor: 'pointer',
              }}
            >
              <Icon
                name={passwordVisible ? 'IconEye' : 'IconEyeOff'}
                size={16}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
