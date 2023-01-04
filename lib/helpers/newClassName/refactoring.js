/*
  @author: William J. Horn

  a thing
*/

const DIRECTIVE_PREFIX = ":";

const DIRECTIVE_NAMES = {
  Remove: 'rm',
  Replace: 'rp',
  Add: 'add'
}

const DIRECTIVE_COLLECTION_METHODS = {
  contains: function(dirName) {
    if (this.directives[dirName]) return true;
    return false;
  },
  get: function(dirName) {
    return this.directives[dirName];
  },
  getAll: function() {
    return this.directives;
  },
  add: function(name, data) {
    this.directiveCount++;
    this.directives[name] = data;
  },
  hasAny: function() {
    return this.directiveCount > 0;
  },
  hasCount: function(num) {
    return this.directiveCount === num;
  }
}

const DirectiveCollection = function() {
  this.directiveCount = 0;
  this.directives = {};
}

Object.assign(DirectiveCollection.prototype, DIRECTIVE_COLLECTION_METHODS);

const createDirectiveData = (name, apply) => ({
  name,
  apply
});

const DIRECTIVES = {
  // assumes child directive is: remove
  [DIRECTIVE_NAMES.Remove]: createDirectiveData(
    DIRECTIVE_NAMES.Remove, 
    (parent, child) => {
    }
  ),

  // assumes child directive is: replace
  [DIRECTIVE_NAMES.Replace]: createDirectiveData(
    DIRECTIVE_NAMES.Replace, 
    (parent, child) => {
    }
  ),

  // assumes child directive is: add
  [DIRECTIVE_NAMES.Add]: createDirectiveData(
    DIRECTIVE_NAMES.Add, 
    (parent, parentData, childData) => {
      const allDirectives = parentData.allDirectives;
      const dirs = allDirectives.getAll();

      if (dirs.add && !dirs.rm) {
        parent[dirs.add.originalKey] = childData.val + ' ' + parentData.val;
        return;
      }

      if (dirs.rm) {

      }
    }
  ),
}

const ERRORS = {
  SELF_TYPE: "Field 'self' must be a string or undefined",
}

const throwError = ({ header="", message="", got="", path="" }) => {
  throw Error(`${header}: ${message} ${got ? ('(got: ' + got + ')') : ''} (at path: ${path})`);
}

const buildDirectiveName = (dirName, key) => {
  return dirName + DIRECTIVE_PREFIX + key;
}

const parseDirective = (key, defaultDirective) => {
  let dirMatch = key.match(new RegExp(`^(.+)${DIRECTIVE_PREFIX}(.+)$`)) 
  let originallyUnformatted = false;
  
  if (!dirMatch) {
    dirMatch = [null, defaultDirective, key];
    originallyUnformatted = true;
  }

  const dirName = dirMatch[1];
  const parsedKey = dirMatch[2];
  const directive = DIRECTIVES[dirName];

  return {
    directive,
    parsedKey,
    originallyUnformatted,
    formattedKey: buildDirectiveName(dirName, parsedKey),
  }
}

const findAllDirectives = (parent, parsedKey) => {
  const directives = new DirectiveCollection();

  for (let dirKey in DIRECTIVES) {
    const build = buildDirectiveName(dirKey, parsedKey);
    const val = parent[build];
    const valType = typeof val;

    if (parentData.valType !== "undefined") {
      const directive = DIRECTIVES[dirKey];
      directives.add(directive.name, {
        directive,
        parentData: { val, valType },
        originalKey: build,
      });
    }
  }

  return directives;
}

const inheritClassFromParentToChild = (parent, child) => {
  let path = "{root}";
  let currentDirective = DIRECTIVE_NAMES.Add;

  for (let key in parent) {
    const parsedData = parseDirective(key, currentDirective);
    const parentVal = parent[key];

    if (parsedData.originallyUnformatted) {
      parent[parsedData.formattedKey] = parentVal;
      delete parent[key];
    }
  }

  const deepSearch = (_parent, _child) => {
    let parentDirectivesCache = {}; //!clear this object before doing another recursive call

    for (let _childKey in _child) {
      const _path = path + `/${_childKey}`;
      const recurseData = [_parent, _child];

      /*
        * > CONSTRUCT CHILD DATA & MUTATE CHILD OBJECT
      */
      const childData = {
        originalKey: null,
        val: null,
        valType: null,
        directive: null,
        parsedKey: null,
        originallyUnformatted: null,
        formattedKey: null
      }

      {
        // get original child data
        const _childVal = _child[_childKey];
        const childValType = typeof _childVal;
        const keyData = parseDirective(_childKey, currentDirective);

        // initialize variables for potentially updating the original data
        let 
          newKey = _childKey, 
          newVal = _childVal,
          newValType = childValType,
          newDirective = keyData.directive;

        // if the child value type is a string, convert it to an object and transfer it's value to 'object.self'
        if (childValType === "string" && keyData.parsedKey !== "self") {
          newKey = buildDirectiveName(currentDirective, keyData.parsedKey);
          newVal = { [buildDirectiveName(keyData.directive.name, "self")]: _childVal };

          newDirective = DIRECTIVES[currentDirective];
          newValType = "object";

        // if child value is an object
        } else if ((childValType === "object" || keyData.parsedKey === "self") && originallyUnformatted) {
          newKey = keyData.formattedKey;

        } else {
          throwError({ message: "Invalid datatype for child value" });
        }

        childData.val = newVal;
        childData.valType = newValType;
        childData.directive = newDirective;
        childData.parsedKey = keyData.parsedKey; // *always the same
        childData.formattedKey = newKey;
        childData.originallyUnformatted = keyData.originallyUnformatted; // *always the same

        childData.initial = {
          val: _childVal,
          key: _childKey,
          keyData
        }

        _child[newKey] = newVal;
        delete _child[_childKey];
      }

      /*
        * < CONSTRUCT CHILD DATA & MUTATE CHILD OBJECT
      */

      /*
        * > CONSTRUCT PARENT DATA
        ? maybe make this into a function?
      */
      const parentData = {
        val: null,
        valType: null,
        allDirectives: null,
      }

      {
        let cachedDirectives = parentDirectivesCache[childData.parsedKey];
        let parentValOriginal = _parent[childData.formattedKey] 

        parentData.val = parentValOriginal;
        parentData.valType = typeof parentValOriginal;

        // todo: make a loop before recursion starts to format initial parent keys instead of doing this
        // if (parentData.valType !== "undefined" && _parent[childData.parsedKey]) {
        //   _parent[buildDirectiveName(DIRECTIVE_NAMES.Add, childData.parsedKey)] = parentValOriginal;
        //   delete _parent[childData.parsedKey];
        // }

        if (cachedDirectives) {
          parentData.allDirectives = cachedDirectives;
        } else {
          const allDirectives = findAllDirectives(_parent, childData.parsedKey);
          parentDirectivesCache[childData.parsedKey] = allDirectives;
          parentData.allDirectives = allDirectives;
        }
      }
      /*
        * < CONSTRUCT PARENT DATA
      */

      console.log('for child key: ', childData.originalKey, ' | ', childData);
      // console.log('parent data: ', parentData.allDirectives);

      // *check to see if there are any parent directives for this individual child key
      // if (!parentData.allDirectives.hasAny()) {
      //   console.log('creating new field for: ', childData.originalKey);
      //   _parent[childData.formattedKey] = childData.val;
      //   continue;
      // }

      // *this is fine
      if (parentData.allDirectives.contains(DIRECTIVE_NAMES.Replace)) {
        console.log('replaced key: ', childData.formattedKey);
        continue;
      }

      if (!parentData.allDirectives.hasAny()) {
        _parent[childData.formattedKey] = {};
        [recurseData[0], recurseData[1]] = [_parent[childData.formattedKey], childData.val];
      }


      // *this is fine
      const prevDefaultDirective = currentDirective;
      currentDirective = childData.directive.name;
      path += `/${_childKey}`; 
      parentDirectivesCache = null;

      deepSearch(...recurseData);

      // *this is fine
      path = path.substring(0, path.match(/\/[^\/]+$/).index); 
      currentDirective = prevDefaultDirective;

    }
  }

  deepSearch(parent, child);
  return parent;
}


const child = {
  self: "base-self",
  "add:objA": {
    "add:keyA": "yoyo",
    "add:keyB": "terp",
    "add:nested": {
      "add:key0": 'new',
      "add:key1": 'key',
    },
  }
}

const parent = {
  // self: "some new self",
  // "rm:self": "something"
  self: "lol",
  "add:objA": {
    "add:keyA": "test",
  },
  "rp:new": "thing",
  "rp:new": {
    "rm:key": "thing"
  }
}

const newParent = {
  "rm:new": "test",
  "rm:new": {
    "rm:self": "test",
    key0: "new",
  },
  self: "more??",
  "add:objA": {
    "add:keyA": "should add",
    "add:nested": {
      "add:key0": "test",
    }
  }
}

console.log('---------------------------------------------');
let p = inheritClassFromParentToChild(newParent, parent);
// console.log(p);
p = inheritClassFromParentToChild(p, child);
console.log(p);

