
import { useButtonGroupContext } from '../../../providers/ButtonGroupProvider';
import buildClassName from "../../../lib/helpers/buildClassName";
import Button from './Button';

const Reset = ({ 
  children,
  onClick,
  className,
  remove,
  onReset=() => {}
}) => {
  const {
    reportData
  } = useButtonGroupContext();

  const processReset = () => {
    onReset();
  }

  return (
    <Button
    className={className}
    remove={remove}
    onClick={processReset}
    >
      {children}
    </Button>
  );
};

export default Reset;