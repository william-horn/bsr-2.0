
import Container from '../../Container';
import buildClassName from '../../../lib/helpers/buildClassName';
import React from 'react';

const Navbar = React.forwardRef(({ children, className, remove }, ref) => {
  return (
    <Container 
    ref={ref}
    className={buildClassName({
      className: '',
      extend: className,
      remove
    })}
    >
      {children}
    </Container>
  );
});

export default Navbar;

