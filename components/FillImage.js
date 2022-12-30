
import Image from 'next/image';
import Container from './Container';
import buildClassName from '../lib/helpers/buildClassName';
import React from 'react';

const FillImage = ({ 
  className, 
  remove, 
  imgClassName,
  imgRemove,
  src, 
  sizes="100px", 
  alt="placeholder", 
  offsetX="0px",
  offsetY="0px"
}) => {
  return (
    <Container
    className={buildClassName({
      className: "relative",
      extend: className,
      remove
    })}
    >
      <Image
      style={{left: offsetX, top: offsetY}}
      className={buildClassName({
        className: "absolute pointer-events-none select-none",
        extend: imgClassName,
        remove: imgRemove
      })}
      src={src}
      alt={alt}
      sizes={sizes}
      fill
      />
    </Container>
  );
};

export default FillImage;