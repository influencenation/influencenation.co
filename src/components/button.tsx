import classNames from 'classnames';
import React from 'react';

interface Props {
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  block?: boolean;
}
const Button: React.FC<Props> = ({ className, loading, children, block, type = 'button', ...rest }) => {
  return (
    <button className={classNames('btn btn-primary', block && 'w-100', className)} {...rest}>
      {loading && <span className="spinner-border me-1" role="status" aria-hidden="true"></span>}
      {children}
    </button>
  );
};

export default Button;
