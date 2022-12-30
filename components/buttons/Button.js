
import IconImage from "../IconImage";
import Container from "../Container";
import Link from "next/link";

import buildClassName from "../../lib/helpers/buildClassName";

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
    base: "relative flex items-center px-2 m-2 bg-black transition-all rounded custom-button min-w-fit",
    extend: className,
    remove
  });

  const renderIcon = (src, size) => 
    <IconImage className="filter invert" size={size} src={src}/>;

  const renderInnerButton = () => <>
    {renderIcon(leftIcon, leftIconSize)}

    <span 
    className="flex-auto p-2 text-left rounded text-md">
      {children}
    </span>

    {renderIcon(rightIcon, rightIconSize)}
  </>;

  return (
    url
      ? <Link
        className={buttonClass}
        href={url}>
          {renderInnerButton()}
        </Link>
      : <button
      className={buttonClass}
      onClick={onClick}>
        {renderInnerButton()}
      </button>
  );
};

// Button.Member = ({ children }) => {
//   return (
//     <Button
//     className="button-member"
//     remove="custom-button">
//       {children}
//     </Button>
//   );
// }

// Button.Group = ({ children, className }) => {
//   return (
//     <Container className="button-group">
//       {children}
//     </Container>
//   );
// }

export default Button;

