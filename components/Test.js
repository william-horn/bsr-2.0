

import formatClassQueryToSchema from "../lib/helpers/formatClassQueryToSchema";
import TestAgain from './TesAgain';

const Test = ({ className, children }) => {

  const classes = formatClassQueryToSchema(className, {
    self: 'text-blue-500 bg-red-700',
    title: 'text-4xl font-bold',
    header: {
      self: 'h-[50px] bg-white',
      title: 'bg-green-500',
      body: {
        self: '',
        header: "YOINK",
      }
    }
  });

  return (
    <div className={classes.self}>
      <h2 className={classes.title}>Some title</h2>
      <div className={classes.header.self}>
        <h2 className={classes.header.title}>New title</h2>
        <TestAgain className={classes.header.body}>
          <p>Idk</p>
        </TestAgain>
      </div>
      {children}
    </div>
  );
};

export default Test;