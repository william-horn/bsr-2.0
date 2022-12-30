

import buildClassName from "../../lib/helpers/buildClassName";

const Title = ({ className="", remove, children }) => {
  return (
    <h2 
    className={buildClassName({
      className: "text-center",
      extend: className,
      remove})
    }>
      {children}
    </h2>
  );
};


export default Title;