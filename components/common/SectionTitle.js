import React from 'react';

const SectionTitle = ({ subtitle, dark, title, centerAlign, description }) => {
  return (
    <>
      {subtitle ? (
        <div
          className={`${
            centerAlign ? 'section-heading text-center' : 'section-heading'
          }`}
          data-aos='fade-up'
        >
          <h4 className={`h5 ${dark ? 'text-warning' : 'text-primary'}`}>
            {subtitle}
          </h4>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      ) : (
        <div
          className={`${
            centerAlign ? 'section-heading text-center' : 'section-heading'
          }`}
          data-aos='fade-up'
        >
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      )}
    </>
  );
};

export default SectionTitle;
