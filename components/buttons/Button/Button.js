
/*
  <Button
  className={{
    leftIcon: ""
  }}

  leftIcon={{ 
    rendered: Boolean,
    src: Img, 
    size: "" 
  }}

  remove={{

  }}
  >
    Content
  </Button>

*/

import IconImage from "../../IconImage";
import Link from "next/link";
import { useEffect, useState } from 'react';

const Button = ({ 
  className,
  children, 
  onClick, 
  initClickHandlers,
  url,
}) => {
  /*
    Handle initial errors/warnings
  */

  /*
    Create initial classes for button and button sub-elements
  */
  const baseStyles = {
    self: 'relative flex items-center px-2 m-2 bg-black transition-all rounded custom-button min-w-fit',
    inner: 'flex-auto p-2 text-left rounded text-md',
    leftIcon: 'filter invert',
    rightIcon: 'filter invert',
  };

  const finalStyles = computeStyles(baseStyles, className);

  /* 
    Utility
  */
  const processClick = () => {
    onClick(clickReport);
  } 

  const renderIcon = (icon) => {
    if (icon.rendered !== false && !icon._empty) {
      return <IconImage className={icon.className} src={icon.src} size={icon.size}/>;
    }
  }

  const renderInnerButton = () => <>
    {renderIcon(state_leftIcon)}

    <span className={finalStyles.inner}>
      {children}
    </span>

    {renderIcon(state_rightIcon)}
  </>;

  /*
    On component mount
  */
  useEffect(() => {
    if (initClickHandlers) processClick();
  }, []);

  /*
    Render
  */
  return (
    url
      ? <Link className={finalStyles.outer} href={url}>
          {renderInnerButton()}
        </Link>
      : <button className={finalStyles.outer} onClick={processClick}>
          {renderInnerButton()}
        </button>
  );
};

export default Button;