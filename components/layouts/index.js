
import Enum from '../../enum';
const {
  Layouts
} = Enum;

import Container from "../Container";
import { useAppContext } from "../../providers/AppProvider";

const LayoutController = ({ children }) => {
  const { currentPage } = useAppContext();
    
  const getRenderedLayout = () => {
    switch (currentPage.layout) {
      case Layouts.ExampleLayout:
        return (
          <Layouts.ExampleLayout.Root.value>
            {children}
          </Layouts.ExampleLayout.Root.value>
        )
      default:
        return children;
    }
  }

  return (
    <Container className="layout-controller">
      {getRenderedLayout()}
    </Container>
  );
};

export default LayoutController;

