
import removeExtraWhitespace from './removeExtraWhitespace';

const buildClassName = ({ className='', extend='', remove='' }) => {
  let newClassName = className;
  const removed = remove.matchAll(/\S+/g);

  if (remove === '*') {
    newClassName = '';
  } else {
    for (let match of removed) {
      newClassName = newClassName.replace(
        new RegExp(`(.?)${match[0]}(.?)`, 'g'), // change to non-alphanumeric only
        (initial, bef, aft) => {
          const befSpace = bef === ' ';
          const aftSpace = aft === ' ';
          const befEmpty = bef === '';
          const aftEmpty = aft === '';

          return (befSpace && aftSpace)
            ? ' '
            : (befEmpty && aftSpace || befSpace && aftEmpty || befEmpty && aftEmpty)
              ? ''
              : initial;
        }
      );
    }
  }

  newClassName += ' ' + extend;
  return removeExtraWhitespace(newClassName);
}


export default buildClassName;
