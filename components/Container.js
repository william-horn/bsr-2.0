

import React from 'react';

// const thing = () => {
//   return (
//     <Something
//     className={{
//       add_self: "bg-blue",
//       rm_self: "bg-red",
//       header: {
//         self: "bg-red",
//         rm_self: "bg-black"
//       }
//     }}>

//     </Something>
//   );
// }

// const something = ({className: _parentClass}) => {

//   const className = {
//     add_self: "bg-red",
//     header: {
//       self: "bg-blue",
//     }
//   }

//   const mergedClassData = mergeClassQuery(className, _parentClass);

//   return (
//     <Container
//     className={mergedClassData.header}>
//     </Container>
//   )
// }

const Container = React.forwardRef(({
  className: _parentClass, 
  children,
  onClick,
  style,
}, ref) => {

  // const className = {
  //   add_self: "bg-black"
  // }

  // const mergedClassData = mergeClassQuery(className, _parentClass); // merge two class objects into a new class object
  // const compiledClassData = compileClassName(mergedClassData); // compiled the class object data into a className string

  return (
    <div 
    style={style}
    onClick={onClick}
    ref={ref} 
    className={_parentClass}
    >
      {children}
    </div>
  );
});

export default Container;
