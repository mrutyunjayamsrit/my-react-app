import React from 'react';

export const Link = ({ label, onClick }) => {
  return (
    <a className="btn-links" onClick={onClick} href={`#${label}`}> {label} </a>
  );
}