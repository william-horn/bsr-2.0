
import { Layouts } from '../../enum';
import Container from "../Container";
import { useAppContext } from "../../providers/AppProvider";

import ExampleLayout from './ExampleLayout';
import PrimaryLayout from './PrimaryLayout';

// export { 
//   ExampleLayout,
//   PrimaryLayout
// };

const LayoutController = ({ children }) => {
  const { currentPage } = useAppContext();
    
  const getRenderedLayout = () => {
    switch (Layouts[currentPage.layout.name]) {
      case Layouts.ExampleLayout:
        return (
          <ExampleLayout>
            {children}
          </ExampleLayout>
        );

      case Layouts.PrimaryLayout:
        return (
          <PrimaryLayout>
            {children}
          </PrimaryLayout>
        );
        
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

