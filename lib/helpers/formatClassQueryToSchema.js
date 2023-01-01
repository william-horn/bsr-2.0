
import removeExtraWhitespace from "./removeExtraWhitespace";

const updateCommonPaths = (input, schema, callback) => {

  const mutationQueue = [];

  const deepSearch = (obj, original) => {
    for (let inputKey in obj) {
      const keyDirective = inputKey.match(/(.+?):(.+)/);
      const directiveName = keyDirective && keyDirective[2];
      let finalInputKey = keyDirective ? keyDirective[1] : inputKey;

      console.log('directive: ', directiveName, finalInputKey);

      const inputValue = obj[inputKey];
      const inputValue_type = typeof inputValue;

      if (inputValue_type === "string") {
        let schemaValue = original[finalInputKey];
        const schemaValue_type = typeof schemaValue;

        let newOriginal = original;

        if (schemaValue_type === "object") {
          schemaValue = schemaValue.self;
          newOriginal = original[finalInputKey];
          finalInputKey = 'self';

          if (typeof schemaValue !== "string") {
            throw Error('Component.self is not a string');
          }
        }

        const mutation = callback({ 
          initial: schemaValue, 
          change: inputValue, 
          directive: directiveName
        })

        if (mutation) {
          const { result, apply='first' } = mutation;
          const resultIsFunction = typeof result === "function";

          switch (apply) {
            case 'first':
              newOriginal[finalInputKey] = result;
              break;

            case 'second': 
              mutationQueue.unshift({ 
                original: newOriginal,           // ref to the schema object
                inputKey: finalInputKey,           // index of value to change
                inputValue,         // value inside the input object
                result,
                resultIsFunction,
              });
              break;

            case 'last': 
              mutationQueue.push({
                original: newOriginal,
                inputKey: finalInputKey,
                inputValue,
                result,
                resultIsFunction,
              });
              break;
          } 
        }

      } else if (inputValue_type === "object") {
        console.log('before next iteration: ', inputValue, ' | ', finalInputKey, original[finalInputKey]);
        deepSearch(inputValue, original[finalInputKey]);
      }
    }
  }

  deepSearch(input, schema);

  // execute deferred mutations 
  for (let i = 0; i < mutationQueue.length; i++) {
    const { 
      original, 
      inputKey, 
      result, 
      inputValue,
      resultIsFunction,
    } = mutationQueue[i];

    switch (resultIsFunction) {
      case true: 
        original[inputKey] = result(original[inputKey], inputValue);
        break;

      // !this case isn't ideal. 'result' could be an out-dated value and it may overwrite a more current value.
      case false: 
        original[inputKey] = result;
        break;
    }
  }

}

const formatClassQueryToSchema = (inputClassName, schema) => {
  if (typeof inputClassName === "string") inputClassName = { self: inputClassName };

  const onQueryMatch = ({ initial, change, directive }) => {
    switch (directive) {
      case 'remove': 
        let result = initial;
        const allRemoved = change.matchAll(/\S+/g);
        console.log('removing: ', change);
        
        for (const removed of allRemoved) {
          result = result.replace(new RegExp(`(.?)${removed[0]}(.?)`), ' ');
        }

        result = removeExtraWhitespace(result);

        return { 
          result, 
          apply: 'first' 
        };

      default:
        return {
          result: (initial, change) => {
            return initial + ' ' + change;
          },
          apply: 'second'
        }
    }
  }

  updateCommonPaths(inputClassName, schema, onQueryMatch);
  return schema;
}

export default formatClassQueryToSchema;
