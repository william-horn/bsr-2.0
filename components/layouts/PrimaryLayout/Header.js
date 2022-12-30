
import Title from "../../typography/Title";
import Text from "../../typography/Text";
import buildClassName from "../../../lib/helpers/buildClassName";
import React from "react";

const Header = React.forwardRef(({ children, className, remove }, ref) => {
  return (
    <header 
    ref={ref}
    className={buildClassName({
      className: "bg-zinc-800 relative",
      extend: className,
      remove,
    })}
    >
      {children}
    </header>
  );
});

Header.Title = ({ children, className, remove }) => {
  return (
    <h1 
    className={buildClassName({
      className: "text-6xl font-bold text-center select-none text-stone-100 logo-font drop-shadow-[2px_4px_6px_black]",
      extend: className,
      remove,
    })}
    >
      {children}
    </h1>
  );
}

export default Header;