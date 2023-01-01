/*
  @author: William J. Horn

  Extension of <Button> intended for child of <Button.Group>
*/

import { useButtonGroupContext } from '../../../providers/ButtonGroupProvider';
import buildClassName from "../../../lib/helpers/buildClassName";
import Button from './Button';
import { useEffect } from 'react';

const ButtonGroupMember = ({ 
  children, 
  id,
  value,
  className="",
  remove="",
  selectedStyle="",
  selectedStyleRemove="",
  initSelectHandlers,
  initUnselectHandlers,
  initClickHandlers,
  onClick=() => {},
  onSelect=() => {},
  onUnselect=() => {},
}) => {
  if (!id) throw Error('Button members must be given a unique id within the button group');

  /*
    Imports from the current button group context.
  */
  const buttonGroupContext = useButtonGroupContext();

  const { 
    updateActiveIds,
    onSelect: group_onSelect,
    onClick: group_onClick,
    onUnselect: group_onUnselect,
    findActiveId,
    defaultStyle: group_defaultStyle,
    defaultStyleRemove: group_defaultStyleRemove,
    reportData,
    initClickHandlers: group_initClickHandlers,
    initSelectHandlers: group_initSelectHandlers,
    initUnselectHandlers: group_initUnselectHandlers,
  } = buttonGroupContext;

  // Momentary constants
  const isSelected = findActiveId(id).found;
  const buttonData = { id, value };

  // Momentary vars
  let {
    selectedStyle: group_selectedStyle, 
    selectedStyleRemove: group_selectedStyleRemove
  } = buttonGroupContext;

  if (!isSelected) {
    group_selectedStyle = '';
    group_selectedStyleRemove = '';
  }

  /*
    @runOnSelectHandlers

    Run all handlers for onSelect.

    Handler execution order:
      (Local Button Select) ->
      (Button Group Select)
  */
  const runOnSelectHandlers = (...args) => {
    onSelect(...args);
    group_onSelect(...args);
  }

  /*
    @runOnUnselectHandlers

    Run all handlers for onUnselect.

    Handler execution order:
      (Local Button Unselect) ->
      (Button Group Unselect)
  */
  const runOnUnselectHandlers = (...args) => {
    onUnselect(...args);
    group_onUnselect(...args);
  }

  /* 
    @processClick

    Handle when the user physically clicks the <Button.Member> component.

    Handler execution order:
      (Local Button Click) -> 
      (Button Group Click) -> 
      (Local Button Select & Local Button Unselect) ->
      (Update Button Group State)
  */
  const processClick = () => {
    onClick(buttonData);
    group_onClick(buttonData);

    if (isSelected) {
      runOnUnselectHandlers(buttonData);

    } else {
      runOnSelectHandlers(buttonData);
    }
    
    updateActiveIds(id, isSelected);
  }

  /*
    @computeRenderedClassName 

    Implements priority between the local <Button.Member> class names and 
    the global <Button.Group> class names.

    todo: come up with a better className hierarchy system later

    Priority:
      defaultStyle = base + defaultStyle
      defaultStyleRemove > base
      className = defaultStyle + className
      className > defaultStyleRemove
      remove > defaultStyle 
      selectedStyle > remove
      selectedStyleRemove > className
  */
  const computeRenderedClassName = () => {
    let _className = 'button-member ' + group_defaultStyle;
    
    if (isSelected) {
      _className = buildClassName({
        className: _className,
        extend: group_selectedStyle,
        remove: group_selectedStyleRemove
      });
    }

    _className = buildClassName({
      className: _className,
      extend: className,
      remove: remove
    });

    if (isSelected) {
      _className = buildClassName({
        className: _className,
        extend: selectedStyle,
        remove: selectedStyleRemove
      });
    }

    return {
      className: _className,
      remove: group_defaultStyleRemove + ' ' 
        + remove + ' ' 
        + group_selectedStyleRemove + ' ' 
        + selectedStyleRemove
    };
  }

  /*
    Update the report data based on whether or not the current button is selected.

    isSelected: 
      TRUE -> insert the button data (id and value props) into the report object
      FALSE -> remove the button data from the report object
  */
  if (isSelected) {
    if (!reportData.current.some(data => data.id === id)) {
      reportData.current.push(buttonData);
    }
  
  } else {
    const currentButton = reportData.current.findIndex(data => data.id === id);

    if (currentButton !== -1) {
      reportData.current.splice(currentButton, 1);
    }
  }

  /*
    On page mount, run all event handlers if the initial handler props have been 
    set in the button group component.
  */
  useEffect(() => {
    if (isSelected) {
      if (initSelectHandlers    || group_initSelectHandlers)     onSelect(buttonData);
      if (initUnselectHandlers  || group_initUnselectHandlers)   onUnselect(buttonData);
      if (initClickHandlers     || group_initClickHandlers)      onClick(buttonData);
    }
  }, []);

  return (
    <Button
    {...computeRenderedClassName()}
    onClick={processClick}
    >
      {children}
    </Button>
  );
}

export default ButtonGroupMember;