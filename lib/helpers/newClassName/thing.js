
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

      if (dirs.rp) {
        console.log('parent has replacement, no changes');
        return;
      }

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

const getValueInfo = (obj, key) => {
  const val = obj[key];
  return {
    val,
    valType: typeof val
  }
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

const findAllDirectives = (parent, childData) => {
  const directives = new DirectiveCollection();

  for (let dirKey in DIRECTIVES) {
    const build = buildDirectiveName(dirKey, childData.parsedKey);
    const parentData = getValueInfo(parent, build);

    if (parentData.valType !== "undefined") {
      const directive = DIRECTIVES[dirKey];
      directives.add(directive.name, {
        directive,
        parentData,
        originalKey: build,
      });
    }
  }

  return directives;
}

const inheritClassFromParentToChild = (parent, child) => {
  const path = "{root}";
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
    const parentDirectivesCache = {}; //!clear this object before doing another recursive call

    for (let _childKey in _child) {

      /*
        * > CONSTRUCT CHILD DATA & MUTATE CHILD OBJECT
      */
      const childData = {    
        ...parseDirective(_childKey, currentDirective),
        ...getValueInfo(_child, _childKey),
        originalKey: _childKey,
      }

      if (childData.originallyUnformatted) {
        _child[childData.formattedKey] = childData.val;
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
          const allDirectives = findAllDirectives(_parent, childData);
          parentDirectivesCache[childData.parsedKey] = allDirectives;
          parentData.allDirectives = allDirectives;
        }
      }
      /*
        * < CONSTRUCT PARENT DATA
      */

      console.log('for child key: ', childData.originalKey, ' | ', childData);
      console.log('parent data: ', parentData.allDirectives);

      // check to see if there are any parent directives for this individual child key
      if (!parentData.allDirectives.hasAny()) {
        console.log('creating new field for: ', childData.originalKey);
        _parent[childData.formattedKey] = childData.val;
        continue;
      }

      switch (childData.valType) {
        case "string":
          childData.directive.apply(_parent, parentData, childData);

        case "object":
          if (childData.originalKey === "self") throwError({ message: "Self cannot be an object" });

          switch (parentData.valType) {
            case "string":
              _parent[childData.formattedKey] = { 
                [buildDirectiveName(DIRECTIVE_NAMES.Add, "self")]: parentData.val 
              };

              parentData.valType = "object"; // *continue to object case

            case "object":
              const prevDefaultDirective = currentDirective;
              currentDirective = childData.directive.name;
              path += `/${k}`; 
              deepSearch(_parent, _child);
              path = path.substring(0, path.match(/\/[^\/]+$/).index); 
              currentDirective = prevDefaultDirective;
              break;

            default: throwError({ message: "Invalid datatype for parent field" });
          }
      }

    }
  }

  deepSearch(parent, child);
  return parent;
}


const child = {
  self: "base-self",
  objA: {
    keyA: "yoyo",
  }
}

const parent = {
  // self: "some new self",
  // "rm:self": "something"
  self: "lol",
  objA: "yee"
}

console.log('---------------------------------------------');
console.log(inheritClassFromParentToChild(parent, child));

