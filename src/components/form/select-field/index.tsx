import classNames from 'classnames';
import { Field, getIn } from 'formik';
import { FieldProps } from 'formik/dist/Field';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import './select-field.css';

interface Props {
  classes?: { group?: string; label?: string; input?: string; error?: string };
  label?: string;
  description?: string;
  id?: string;
  name: string;
  htmlFor?: string;
  validate?: (value: unknown) => void;
  clearable?: boolean;
  searchable?: boolean;
  options?: Array<unknown>;
  remoteOptions?: (query: string) => Promise<Array<unknown>>;
  valueMapper: (obj: unknown) => unknown;
}

const SelectField: React.FC<Props> = ({
  id,
  classes,
  name,
  label,
  description,
  options,
  remoteOptions,
  clearable,
  searchable,
  validate,
  valueMapper = (obj: any) => obj.value,
}) => {
  const labelInfo = description ? `(${description})` : undefined;
  const [loading, setLoading] = useState(false);
  const [internalOptions, setInternalOptions] = useState<Array<unknown>>([]);

  const loadOptions = (inputValue: string, callback: (options: unknown[]) => void) => {
    if (remoteOptions) {
      setLoading(true);
      remoteOptions(inputValue).then(data => {
        setLoading(false);
        callback(data);
      });
    }
  };

  return (
    <Field
      name={name}
      validate={validate}
      render={({ field, form }: FieldProps) => {
        const error = !!form?.submitCount && getIn(form.errors, name);
        const value = field.value;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if ((!searchable || value) && remoteOptions) {
            setLoading(true);
            remoteOptions(value).then(data => {
              setLoading(false);
              setInternalOptions(data);
            });
          }
        }, []);

        return (
          <div className={classNames('mb-3', classes?.group)}>
            {label && (
              <label className={classNames('form-check-label', classes?.label)} htmlFor={id}>
                {label}
                <small>{labelInfo}</small>
              </label>
            )}
            {!remoteOptions ? (
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={value}
                isClearable={clearable}
                isSearchable={searchable}
                name={name}
                options={options}
              />
            ) : (
              <AsyncSelect
                className={classNames('basic-single', error && 'is-invalid')}
                classNamePrefix="select"
                defaultValue={value}
                value={internalOptions.find(obj => valueMapper(obj) === value)}
                isLoading={loading}
                isClearable={clearable}
                isSearchable={searchable}
                name={name}
                defaultOptions={internalOptions}
                loadOptions={loadOptions}
                onChange={newValue => form.setFieldValue(name, valueMapper(newValue.value))}
              />
            )}
            <div className={classNames('invalid-feedback', classes?.error)}>{error && <div>{error}</div>}</div>
          </div>
        );
      }}
    />
  );
};

export default SelectField;
