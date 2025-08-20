import React from 'react';
import './Button.css';

function Button({ onClick, children, icon, className = '' }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {icon && <span className="material-icons">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
