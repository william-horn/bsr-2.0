
import buildClassName from "../../lib/helpers/buildClassName";

const Text = ({ className="", remove, children }) => {
  return (
    <p
    className={buildClassName({
      className: "text-white",
      extend: className,
      remove})
    }>
        {children}
    </p>
  );
};

export default Text;

