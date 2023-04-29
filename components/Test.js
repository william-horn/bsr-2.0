

import formatClassQueryToSchema from "../lib/helpers/formatClassQueryToSchema";
import TestAgain from './TesAgain';

const Test = ({ className: _className, children }) => {

  const className = {
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
  };

  const compiledClass = formatClassQueryToSchema(className, _className);

  return (
    <div className={compiledClass.self}>
      <h2 className={compiledClass.title}>Some title</h2>
      <div className={compiledClass.header.self}>
        <h2 className={compiledClass.header.title}>New title</h2>
        <TestAgain className={compiledClass.header.body}>
          <p>Idk</p>
        </TestAgain>
      </div>
      {children}
    </div>
  );
};

export default Test;