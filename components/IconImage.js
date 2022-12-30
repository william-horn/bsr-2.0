
import Image from "next/image";
import Container from "./Container";

import buildClassName from "../lib/helpers/buildClassName";

const IconImage = ({ className="", remove, src, size="48px" }) => {
  if (!src) return <></>;
  
  return (
    <Container
    className={buildClassName({
      className: "icon-container relative inline-block",
      extend: className,
      remove
    })}
    style={{minWidth: size, height: size}}
    >
      <Image src={src} alt="icon" sizes={size} fill />
    </Container>
  );
};

export default IconImage;

