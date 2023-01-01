
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
import computeStyleData from '../../../lib/helpers/computeStyleData';
import { useEffect, useState } from 'react';

const Button = ({ 
  className,
  remove,
  children, 
  onClick, 
  rightIcon={ _empty: true }, 
  initClickHandlers,
  leftIcon={ _empty: true },
  url,
  computeStyles
}) => {
  const [_mutableProps, _setMutableProps] = useState({
    className,
    remove,
    rightIcon,
    leftIcon
  });

  const {
    className: state_className,
    remove: state_remove,
    rightIcon: state_rightIcon,
    leftIcon: state_leftIcon
  } = _mutableProps;

  const clickReport = {
    buttonState: {
      ..._mutableProps,
      update: query => {
        _setMutableProps(prev => {
          return {...prev, ...query};
        });
      }
    }
  };

  /*
    Handle initial errors/warnings
  */
  if (!state_leftIcon.src && !state_leftIcon._empty) throw Error(`Left icon is missing 'src' prop`);
  if (!state_rightIcon.src && !state_rightIcon._empty) throw Error(`Right icon is missing 'src' prop`);

  const leftIconSize = state_leftIcon.size || '48px';
  const rightIconSize = state_rightIcon.size || '48px';

  if (!state_rightIcon.size && !state_rightIcon._empty) console.warn(`Right icon is missing 'size' prop (defaulting to ${rightIconSize})`);
  if (!leftIcon.size && !state_leftIcon._empty) console.warn(`Left icon is missing 'size' prop (defaulting to ${leftIconSize})`);

  state_leftIcon.size = leftIconSize;
  state_rightIcon.size = rightIconSize;

  /*
    Create initial classes for button and button sub-elements
  */
  const baseStyles = {
    outer: 'relative flex items-center px-2 m-2 bg-black transition-all rounded custom-button min-w-fit',
    inner: 'flex-auto p-2 text-left rounded text-md',
    leftIcon: 'filter invert',
    rightIcon: 'filter invert',
  };

  const finalStyles = computeStyleData(baseStyles, {
    className: state_className,
    remove: state_remove,
    computeStyles
  });

  state_leftIcon.className = finalStyles.leftIcon;
  state_rightIcon.className = finalStyles.rightIcon;

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