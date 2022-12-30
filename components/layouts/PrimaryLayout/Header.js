
import Title from "../../typography/Title";
import Text from "../../typography/Text";

const Header = ({ children }) => {
  return (
    <header className="py-4 bg-zinc-800">
      {children}
    </header>
  );
};

Header.Title = ({ children }) => {
  return (
    <h1 className="text-6xl font-bold text-center select-none text-stone-100 logo-font">{children}</h1>
  );
}

export default Header;