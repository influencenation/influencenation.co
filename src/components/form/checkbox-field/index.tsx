import classNames from 'classnames';
import { Field, getIn } from 'formik';
import { FieldProps } from 'formik/dist/Field';
import React from 'react';

interface Props {
  classes?: { group?: string; label?: string; input?: string; error?: string };
  label?: string | React.ReactNode;
  description?: string;
  id?: string;
  name: string;
  htmlFor?: string;
  validate?: (value: unknown) => void;
}

const CheckboxField: React.FC<Props> = ({ id, classes, name, label, description, validate }) => {
  const labelInfo = description ? `(${description})` : undefined;

  return (
    <Field
      name={name}
      validate={validate}
      render={({ field, form }: FieldProps) => {
        const error = !!form?.submitCount && getIn(form.errors, name);
        return (
          <div className={classNames('mb-3', classes?.group)}>
            <div className="form-check" onClick={() => form.setFieldValue(name, !field.value)}>
              {label && (
                <label className={classNames('form-check-label', classes?.label)} htmlFor={id}>
                  {label}
                  <small>{labelInfo}</small>
                </label>
              )}
              <input
                name={name}
                id={id}
                className={classNames('form-check-input', classes?.input)}
                type="checkbox"
                checked={Boolean(field.value)}
                onChange={e => form.setFieldValue(name, e.target.checked)}
              />
            </div>
            <div className={classNames('invalid-feedback', classes?.error)}>{error && <div>{error}</div>}</div>
          </div>
        );
      }}
    />
  );
};

export default CheckboxField;
