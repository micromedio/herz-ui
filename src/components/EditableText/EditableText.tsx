/** @jsxImportSource theme-ui */
import { get, ThemeUICSSObject } from 'theme-ui';
import {
  forwardRef,
  HTMLAttributes,
  useMemo,
  useRef,
  useImperativeHandle,
  useCallback,
  FocusEvent,
  MouseEvent,
} from 'react';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import Icon from '../Icon/Icon';

export interface EditableTextProps {
  /** The text value and initial value of the `input` element */
  defaultValue: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  status?: 'error' | 'success' | 'loading';
  helperText?: string;

  onSave?: (value: string) => void;

  saveOnBlur?: boolean;
  resetOnBlur?: boolean;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

/**
 * @deprecated Component depracated, use `EditableField.Text` instead
 */
const EditableText = forwardRef<HTMLInputElement, EditableTextProps>(
  function EditableText(
    {
      value,
      defaultValue,
      onChange,
      status,
      helperText = '',
      onSave,
      saveOnBlur = false,
      resetOnBlur = true,
      className,
    }: EditableTextProps,
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef.current
    );

    const state = useMemo(() => {
      if (status) return status;
      return 'default';
    }, [status]);

    const styles: Record<string, ThemeUICSSObject> = {
      active: {
        borderColor: 'secondary',
        boxShadow: (theme) =>
          `0px 0px 0px 4px ${get(theme, 'colors.secondary.alpha.90')}`,
        backgroundColor: '#FFF',
      },
    };

    const handleOnChange = useCallback(
      (_: unknown, _event: FocusEvent | MouseEvent) => {
        const event = Object.create(_event);
        event.type = 'change';
        event.target = inputRef.current;
        event.currentTarget = inputRef.current;
        if (inputRef.current) inputRef.current.value = defaultValue;

        onChange?.(event);
      },
      [defaultValue, onChange]
    );

    return (
      <div
        sx={{
          borderRadius: 2,

          ...{
            default: {},
            loading: {},
            success: {
              backgroundColor: 'success.alpha.95',
            },
            error: {
              backgroundColor: 'primary.alpha.95',
            },
          }[state],
        }}
        className={className}
      >
        <div
          ref={containerRef}
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: 2,

            paddingY: 1,
            paddingX: 3,
            backgroundColor: 'transparent',
            outline: 0,
            borderRadius: 2,
            border: '2px solid transparent',
            ...(state === 'loading' ? styles.active : {}),

            ...{
              default: {},
              loading: {},
              success: {
                borderColor: 'success',
              },
              error: {
                borderColor: 'primary',
              },
            }[state],

            transition: 'all 0.2s',
            '&:hover': {
              ...(state === 'default' && {
                backgroundColor: 'text.alpha.95',
              }),
            },
            '&:focus-within': {
              ...styles.active,
            },
          }}
          onBlur={(event) => {
            if (state === 'loading') return;

            const blurredInside =
              containerRef.current?.contains(event.target) &&
              containerRef.current?.contains(event.relatedTarget as Element);
            if (blurredInside) return;

            if (saveOnBlur) {
              if (value !== defaultValue) onSave?.(value);
            } else if (resetOnBlur) {
              handleOnChange(defaultValue, event);
            }
          }}
        >
          <input
            type="text"
            ref={inputRef}
            value={onChange ? value : undefined}
            defaultValue={onChange ? undefined : value}
            placeholder={defaultValue}
            onChange={onChange}
            disabled={status === 'loading'}
            aria-invalid={status === 'error'}
            size={1} // input has a default size property of 20, which limits it's minimum width. Setting it to 1 and handling width through the parent so that we can control the input width better.
            sx={{
              width: '100%',
              flexGrow: 1,
              outline: 0,
              backgroundColor: 'transparent',
              border: 'none',
              p: 0,
              py: '2px', // the 2px border counts towards height, so we need 6px instead of 8px for the correct height
              color: 'text',
              variant: 'text.body1',
            }}
          />
          {
            {
              default: '',
              error: (
                <Icon
                  name="IconAlertCircle"
                  size={16}
                  sx={{ color: 'primary' }}
                />
              ),
              loading: <Spinner />,
              success: (
                <Icon
                  name="IconCircleCheck"
                  size={16}
                  sx={{ color: 'success' }}
                />
              ),
            }[state]
          }
          {value !== defaultValue && (
            <div
              sx={{
                display: 'flex',
                gap: 1,
              }}
              className="editable-text-actions"
            >
              <Button
                size="small"
                color="text"
                iconName="IconX"
                aria-label="reset"
                onClick={(_event) => {
                  handleOnChange(defaultValue, _event);
                  const target = _event.currentTarget;
                  setTimeout(() => target.blur()); // unfocus element in the next tick, when value is already reset
                }}
              />
              <Button
                size="small"
                color="text"
                iconName="IconCheck"
                aria-label="save"
                onClick={() => onSave?.(value)}
              />
            </div>
          )}
        </div>
        {helperText && (
          <div
            sx={{
              px: 3,
              py: 2,
              variant: 'text.body1',
              ...{
                default: {},
                loading: {},
                success: {
                  color: 'success',
                },
                error: {
                  color: 'primary',
                },
              }[state],
            }}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

export default EditableText;
