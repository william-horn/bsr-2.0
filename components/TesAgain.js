

import formatClassQueryToSchema from "../lib/helpers/formatClassQueryToSchema";

const Test = ({ className, children, directives }) => {

  const classes = formatClassQueryToSchema(className, {
    self: "the body",
    header: {
      self: 'h-[123px] text-green',
      title: 'somethinbg'
    }
  });

  return (
    <div className={classes.self}>
      <header className={classes.header.self}></header>
      {children}
    </div>
  );
};

export default Test;