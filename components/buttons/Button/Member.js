
import buildClassName from "../../../lib/helpers/buildClassName";
import Button from ".";

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