
import Container from "../../Container";
import Header from "./Header";
import Footer from "./Footer";
import { useAppContext } from "../../../providers/AppProvider";

const PrimaryLayout = ({ children }) => {
  const { currentPage } = useAppContext();

  return (
    <Container className="primary-layout">
      <Header>
        <Header.Title>Raven</Header.Title>
      </Header>

      <Container className="layout-body">
        {children}
      </Container>

      <Footer>
        <Footer.Title>Welcome</Footer.Title>
      </Footer>
    </Container>
  );
};

export default PrimaryLayout;

