


import IconImage from "../../IconImage";
import Link from "next/link";
import buildClassName from "../../../lib/helpers/buildClassName";
import { useEffect } from 'react';

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
  initClickHandlers,
  leftIcon,
  leftIconSize="24px",
  rightIconSize="24px",
  url,
}) => {

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

  useEffect(() => {
    if (initClickHandlers) onClick();
  }, []);

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

export default Button;