
import { useButtonGroupContext } from '../../../providers/ButtonGroupProvider';
import buildClassName from "../../../lib/helpers/buildClassName";
import Button from './Button';

const Report = ({ 
  children,
  onClick,
  onReport=() => {}
}) => {
  const groupContext = useButtonGroupContext();

  const processReport = () => {
    onReport();
  }

  return (
    <Button
    onClick={onClick}
    onReport={processReport}
    >
      {children}
    </Button>
  );
};

export default Report;