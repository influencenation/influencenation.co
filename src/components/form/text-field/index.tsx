import classNames from 'classnames';
import { Field, getIn } from 'formik';
import { FieldProps } from 'formik/dist/Field';
import IMask, { AnyMaskedOptions } from 'imask';
import React, { createRef, useEffect } from 'react';

interface Props {
  classes?: { group?: string; label?: string; input?: string; error?: string };
  label?: string;
  description?: string;
  id?: string;
  name: string;
  htmlFor?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'number' | 'password';
  validate?: (value: unknown) => void;
  maskConfig?: AnyMaskedOptions;
  children?: React.ReactNode;
}

const TextField: React.FC<Props> = ({ id, classes, name, placeholder, label, description, type = 'text', disabled, maskConfig, validate, children }) => {
  const inputRef = createRef<HTMLInputElement>();
  const labelInfo = description ? `(${description})` : undefined;

  return (
    <Field
      name={name}
      validate={validate}
      render={({ field, form }: FieldProps) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          let inputMask: IMask.InputMask<any>;
          if (inputRef.current && maskConfig?.mask) {
            inputMask = IMask(inputRef.current, maskConfig)
              .on('accept', (e: InputEvent) => {
                if (e?.inputType === 'deleteContentBackward') {
                  form.setFieldValue(name, undefined);
                }
              })
              .on('complete', () => {
                form.setFieldValue(name, inputMask.value);
              });
            if (field.value) {
              inputMask.value = field.value;
              inputMask?.alignCursor();
            }
          }

          return () => {
            inputMask?.destroy();
          };
        }, [maskConfig]);

        const error = !!form?.submitCount && getIn(form.errors, name);
        return (
          <div className={classNames('mb-3', classes?.group)}>
            {label && (
              <label className={classNames('form-label', classes?.label)} htmlFor={id}>
                {label}
                <small>{labelInfo}</small>
              </label>
            )}
            <input
              ref={inputRef}
              type={type}
              id={id}
              name={name}
              value={field.value}
              className={classNames('form-control', error && 'is-invalid', classes?.input)}
              placeholder={placeholder}
              onChange={field.onChange}
              disabled={disabled}
            />
            {children}
            <div className={classNames('invalid-feedback', classes?.error)}>{error && <div>{error}</div>}</div>
          </div>
        );
      }}
    />
  );
};

export default TextField;
