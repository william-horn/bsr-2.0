
import { useButtonGroupContext } from '../../../providers/ButtonGroupProvider';
import { useEffect } from 'react';
import Button from './Button';

const Report = ({ 
  children,
  className,
  remove,
  onReport=() => {},
  initClickHandlers,
  initReportHandlers,
}) => {
  const {
    reportData,
  } = useButtonGroupContext();

  const processReport = () => {
    onReport(reportData.current);
  }

  useEffect(() => {
    if (initReportHandlers) processReport();
  }, []);

  return (
    <Button
    className={className}
    remove={remove}
    initClickHandlers={initClickHandlers}
    onClick={processReport}
    >
      {children}
    </Button>
  );
};

export default Report;