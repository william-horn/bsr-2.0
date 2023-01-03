/*
  @author: William J. Horn

  mutates (query_2) into (query_1 + query_2)
*/

const _selfTypeError = "Field 'self' must be a string or undefined";
const _fieldStringOrObject = "Field must be a string or object";
const _fieldStringOrUndefined = "Field must be a string or undefined";

const throwError = ({ query, message, got, path }) => {
  throw Error(`${query}: ${message} ${got ? ('(got: ' + got + ')') : ''} (at path: ${path})`);
}

const mergeQuery = (q1, q2) => {
  let q_path = '{root}';

  const deepSearch = (_q1, _q2) => {
    for (let k in _q1) {
      const _q1_v = _q1[k];
      const _q2_v = _q2[k];
      const _q1_vt = typeof _q1_v;
      const _q2_vt = typeof _q2_v;
      const path = q_path + `/${k}`;

      switch (_q1_vt) {
        case "object":
          if (k === "self") throwError({ query: 'QUERY_1', message: _selfTypeError, got: _q1_vt, path });

          switch (_q2_vt) {
            case "string":  
              let _q2_self;

              switch (typeof _q1_v.self) {
                case "string": 
                  _q2_self = _q2_v + ' ' + _q1_v.self; 
                  delete _q1_v.self;
                  break;

                case "undefined": _q2_self = _q2_v; break;
                default: throwError({ query: 'QUERY_1', message: _selfTypeError, got: typeof _q1_v.self, path });
              } 

              _q2[k] = { self: _q2_self, ..._q1_v }; 
              break;

            case "object": 
              q_path += `/${k}`; 
              deepSearch(_q1_v, _q2_v); 
              q_path = q_path.substring(0, q_path.match(/\/[^\/]+$/).index); 
              break;

            case "undefined": _q2[k] = _q1_v; break;
            default: throwError({ query: 'QUERY_2', message: _fieldStringOrObject, got: _q2_vt, path });
          }
          break;

        case "string":

          switch (_q2_vt) {
            case "object":
              switch (typeof _q2_v.self) {
                case "string": 
                _q2_v.self += ' ' + _q1_v; 
                break;

                case "undefined": _q2_v.self = _q1_v; break;
                default: throwError({ query: 'QUERY_2', message: _selfTypeError, got: typeof _q2_v.self, path });
              }
              break;

            case "string": _q2[k] += ' ' + _q1_v; break;
            case "undefined": _q2[k] = _q1_v; break;
            default: throwError({ query: 'QUERY_2', message: _fieldStringOrUndefined, got: _q2_vt, path });
          }
          break;

        default: throwError({ query: 'QUERY_1', message: _fieldStringOrObject, got: _q1_vt, path }); 
      }
    }
  }

  deepSearch(q1, q2);
  return q2;
}

export default mergeQuery;
