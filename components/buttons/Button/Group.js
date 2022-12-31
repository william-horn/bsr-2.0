
import Container from "../../Container";
import React, { useState } from 'react';
import ButtonGroupProvider from '../../../providers/ButtonGroupProvider';
import buildClassName from "../../../lib/helpers/buildClassName";

const ButtonGroup = ({ 
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

export default ButtonGroup;