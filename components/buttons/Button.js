
import IconImage from "../IconImage";
import Container from "../Container";
import Link from "next/link";
import { useState, useEffect } from 'react';
import ButtonGroupProvider, { useButtonGroupContext } from '../../providers/ButtonGroupProvider';
import buildClassName from "../../lib/helpers/buildClassName";
import React from "react";

// const PageContext = createContext();
// export const usePageContext = () => useContext(PageContext);

// const Page = ({ title }) => {
//   return (
//     <PageContext.Provider value={title}>
//       {...}
//     </PageContext.Provider>
//   );
// }

const Button = ({ 
  className,
  remove,
  children, 
  onClick, 
  rightIcon, 
  leftIcon,
  leftIconSize="24px",
  rightIconSize="24px",
  url,
}) => {

  // todo: maybe don't give buttons a hover effect by default?
  const buttonClass = buildClassName({
    className: "relative flex items-center px-2 m-2 bg-black transition-all rounded custom-button min-w-fit",
    extend: className,
    remove
  });

  const renderIcon = (src, size) => 
    <IconImage className="filter invert" size={size} src={src}/>;

  const renderInnerButton = () => <>
    {renderIcon(leftIcon, leftIconSize)}

    <span 
    className="flex-auto p-2 text-left rounded text-md"
    >
      {children}
    </span>

    {renderIcon(rightIcon, rightIconSize)}
  </>;

  return (
    url
      ? <Link
        className={buttonClass}
        href={url}
        >
          {renderInnerButton()}
        </Link>
      : <button
      className={buttonClass}
      onClick={onClick}
      >
        {renderInnerButton()}
      </button>
  );
};

Button.Member = ({ 
  children, 
  onClick=() => {},
  id,
  value,
  onSelect=() => {},
  onUnselect=() => {},
}) => {
  if (!id) throw Error('Button members must be given a unique id within the button group');

  const { 
    updateActiveIds,
    onSelect: group_onSelect,
    onClick: group_onClick,
    onUnselect: group_onUnselect,
    findActiveId,
    selectedStyle,
    selectedStyleRemove,
    defaultStyle,
    defaultStyleRemove,
  } = useButtonGroupContext();

  const isSelected = findActiveId(id).found;

  /* 
  */
  const processClick = () => {
    onClick(id, value);
    group_onClick(id, value);

    if (isSelected) {
      onUnselect(id, value);
      group_onUnselect(id, value);

    } else {
      onSelect(id, value);
      group_onSelect(id, value);
    }
    
    updateActiveIds(id, isSelected);
  }

  // console.log('re-rendered button with state: ', activeIds);
  const removedClasses = (isSelected ? selectedStyleRemove : "");

  return (
    <Button
    className={buildClassName({
      className: "button-member " + defaultStyle + (isSelected ? selectedStyle : ""),
      remove: removedClasses
    })}
    remove={"custom-button " + defaultStyleRemove + removedClasses}
    onClick={processClick}
    >
      {children}
    </Button>
  );
}

Button.Group = ({ 
  children, 
  className, 
  remove, 
  selectedStyle="",
  selectedStyleRemove="",
  defaultStyle="",
  defaultStyleRemove="",
  initial="",
  onSelect=() => {},    // fires only when a button is unselected
  onUnselect=() => {},  // fires only when a button is selected 
  onClick=() => {}      // fires whenever a button is clicked
}) => {
  const multiple = Array.isArray(initial);

  const [activeIds, _setActiveIds] = useState(() => {
    if (!multiple) return [initial];
    return initial;
  });

  const findActiveId = (buttonId) => {
    const idIndex = activeIds.findIndex(id => id === buttonId);
    return { found: idIndex !== -1, index: idIndex };
  }

  const updateActiveIds = (buttonId, isSelected) => {
    if (isSelected) {
      _setActiveIds(prev => {
        const idResult = findActiveId(buttonId);

        // ? checking to prevent duping button ids in react strict mode
        if (idResult.found) {
          prev.splice(idResult.index, 1);
          return [...prev];
        }

        return prev;
      });
      
    } else {
      _setActiveIds(prev => {
        if (multiple) {

          // ? checking to prevent duping button ids in react strict mode
          if (!prev.some(id => id === buttonId)) {
            prev.push(buttonId);
            return [...prev];
          }

        } else {
          prev[0] = buttonId;
          return [...prev];
        }

        return prev;
      });
    }

    // console.log('new state: ', activeIds);
  }

  return (
    <ButtonGroupProvider 
    value={{
      selectedStyle,
      selectedStyleRemove,
      defaultStyle,
      defaultStyleRemove,
      updateActiveIds,
      onSelect,
      onUnselect,
      onClick,
      findActiveId,
    }}
    >
      <Container
      className={buildClassName({
        className: "button-group",
        extend: className,
        remove,
      })}
      >
        {children}
      </Container>
    </ButtonGroupProvider>
  );
}

export default Button;

