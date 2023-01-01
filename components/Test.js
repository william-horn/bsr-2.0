

import formatClassQueryToSchema from "../lib/helpers/formatClassQueryToSchema";

const Test = ({ className, children }) => {

  className = formatClassQueryToSchema(className, {
    self: 'text-blue-500 bg-red-700',
    title: 'text-4xl font-bold',
    header: {
      self: 'h-[50px] bg-white',
      title: 'bg-green-500'
    }
  });

  console.log(className);

  return (
    <div className={className.self}>
      <h2 className={className.title}>Some title</h2>
      <div className={className.header.self}>
        <h2 className={className.header.title}>New title</h2>
      </div>
      {children}
    </div>
  );
};

export default Test;