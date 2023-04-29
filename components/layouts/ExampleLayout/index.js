
import Container from '../../Container';
import React from 'react';
// import Text from '../../typography/Text';
import Header from './Header';
import Footer from './Footer';
import { useAppContext } from '../../../providers/AppProvider';

const ExampleLayout = ({ children }) => {
  const { currentPage } = useAppContext();

  return (
    <Container className="example-layout">
      <Header>
        <Header.Title>Example Header</Header.Title>
      </Header>

      <Container className="layout-body">
        {children}
      </Container>

      <Footer>
        <Footer.Title>Example Footer</Footer.Title>
      </Footer>
    </Container>
  );
};

ExampleLayout.Header = Header;
ExampleLayout.Footer = Footer;

export default ExampleLayout;


