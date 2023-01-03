
import removeExtraWhitespace from "./removeExtraWhitespace";

const updateCommonPaths = (input, schema, callback) => {

  const mutationQueue = [];

  const deepSearch = (obj, original) => {
    for (let inputKey in obj) {
      const keyDirective = inputKey.match(/(.+?):([A-Za-z0-9]+)(\*?)/);

      let directiveName, 
        directiveRule,
        finalInputKey; 

      if (keyDirective) {
        finalInputKey = keyDirective[1];
        [directiveName, directiveRule] = [keyDirective[2], keyDirective[3]];
      } else {
        finalInputKey = inputKey;
      }

      const inputValue = obj[inputKey];
      const inputValue_type = typeof inputValue;

      if (inputValue_type === "string") {
        let schemaValue = original[finalInputKey];
        let finalOriginal = original;

        if (typeof schemaValue === "object") {
          schemaValue = schemaValue.self;
          finalOriginal = original[finalInputKey];
          finalInputKey = 'self';

          if (typeof schemaValue !== "string") {
            throw Error('Component.self is not a string (or self field is missing)');
          }
        }

        const mutation = callback({ 
          initial: schemaValue, 
          change: inputValue, 
          directive: directiveName,
          rule: directiveRule
        })

        if (mutation) {
          const { result, apply='first' } = mutation;
          const resultIsFunction = typeof result === "function";

          if (directiveRule === '*') {
            
            continue;
          }

          switch (apply) {
            case 'first':
              if (resultIsFunction) throw Error(`'result' cannot be a function if the apply rule is set to 'first'`);
              finalOriginal[finalInputKey] = result;
              break;

            case 'second': 
              mutationQueue.unshift({ 
                original: finalOriginal,       
                inputKey: finalInputKey, 
                inputValue,       
                result,
                resultIsFunction,
              });
              break;

            case 'last': 
              mutationQueue.push({
                original: finalOriginal,
                inputKey: finalInputKey,
                inputValue,
                result,
                resultIsFunction,
              });
              break;
          } 
        }

      } else if (inputValue_type === "object") {
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
        
        for (const removed of change.matchAll(/\S+/g)) {
          result = result.replace(new RegExp(`(.?)${removed[0]}(.?)`), ' ');
        }

        return { 
          result: removeExtraWhitespace(result), 
          apply: 'first' 
        };

      default:
        return {
          result: (initial, change) => {
            return removeExtraWhitespace(initial + ' ' + change);
          },
          apply: 'second'
        }
    }
  }

  updateCommonPaths(inputClassName, schema, onQueryMatch);
  return schema;
}

export default formatClassQueryToSchema;
