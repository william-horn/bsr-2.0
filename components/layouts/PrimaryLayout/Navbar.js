
import Container from '../../Container';
import buildClassName from '../../../lib/helpers/buildClassName';
import Enum from '../../../enum';
import React from 'react';
import { useAppContext } from '../../../providers/AppProvider';
import Button from '../../buttons/Button';
import { v4 as uuidv4 } from 'uuid';

const Navbar = React.forwardRef(({ className, remove }, ref) => {
  const { currentPage } = useAppContext();

  const navPages = [
    Enum.Pages.Home,
    Enum.Pages.Explore,
    Enum.Pages.About,
    Enum.Pages.News,
    Enum.Pages.Donate
  ];

  return (
    <nav 
    ref={ref}
    className={buildClassName({
      className: "navbar-container flex flex-wrap sticky top-0 z-50 justify-center p-3 bg-zinc-500",
      extend: className,
      remove
    })}
    >
    </nav>
  );
});

export default Navbar;

