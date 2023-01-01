import buildClassName from "./buildClassName";

const computeStyleData = (baseStyles, { className, remove, computeStyles }) => {

  // const baseStylesExample = {
  //   outer: "something",
  //   inner: "something",

  //   image: {
  //     inner: "another thing",
  //     header: {
  //       title: "p-5"
  //     }
  //   }
  // }

  let baseRemoved = {};

  for (let component in baseStyles) {
    baseRemoved[component] = '';
  }

  let finalStyles = {...baseStyles};

  /*
    Type check the className and remove props to extract class info
  */
  if (typeof remove === 'string') {
    baseRemoved.outer = remove;

  } else if (typeof remove === 'object') {
    for (let component in baseRemoved) {
      baseRemoved[component] = remove[component] || baseRemoved[component];
    }
  }

  if (typeof computeStyles === 'function') {
    const computedStyles = computeStyles(baseStyles, baseRemoved);
    finalStyles = {...finalStyles, ...computedStyles};

  } else { 
    if (typeof className === 'string') {
      finalStyles = {
        ...finalStyles, 
        outer: buildClassName({ 
          className: baseStyles.outer, 
          extend: className, 
          remove: baseRemoved.outer 
        })
      };

    } else if (typeof className === 'object') {
      for (let component in finalStyles) {
        finalStyles[component] = buildClassName({ 
          className: baseStyles[component], 
          extend: className[component], 
          remove: baseRemoved[component] 
        });
      }
    }
  }

  return finalStyles;
}

export default computeStyleData;