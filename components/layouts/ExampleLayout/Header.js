
import Container from '../../Container';
import { useAppContext } from '../../../providers/AppProvider';

const Header = ({ children }) => {
  return (
    <header className="header h-[150px]">
      {children}
    </header>
  );
};

Header.Title = ({ children }) => {
  return (
    <h1 className="text-center text-black">{children}</h1>
  );
}

export default Header;

