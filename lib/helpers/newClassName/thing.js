
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
    (parent, child) => {
      const allDirectives = parent.allDirectives;
      let final = parent.val;

      if (allDirectives.contains(DIRECTIVE_NAMES.Replace)) {
        console.log('parent has replacement, no changes');
        return;
      }

      if (allDirectives.contains(DIRECTIVE_NAMES.Add) && !allDirectives.contains(DIRECTIVE_NAMES.Remove)) {
        
      }

      return final;
    }
  ),
}

const ERRORS = {
  SELF_TYPE: "Field 'self' must be a string or undefined",
}

const throwError = ({ header, message, got, path }) => {
  throw Error(`${header}: ${message} ${got ? ('(got: ' + got + ')') : ''} (at path: ${path})`);
}

const getValue = (obj, key) => {
  const val = obj[key];
  return {
    val,
    valType: typeof val
  }
}

const parseDirective = (key, defaultDirective) => {
  const dirMatch = key.match(new RegExp(`^(.+)${DIRECTIVE_PREFIX}(.+)$`)) 
    || [null, defaultDirective, key];

  const dirName = dirMatch[1];
  const parsedKey = dirMatch[2];
  const directive = DIRECTIVES[dirName];

  return {
    directive,
    parsedKey,
    formattedKey: dirName + DIRECTIVE_PREFIX + parsedKey,
  }
}

const getValueWithDirective = (obj, key, currentDirective) => {
  return {
    ...parseDirective(key, currentDirective),
    ...getValue(obj, key),
    originalKey: key,
  }
}

const findAllDirectives = (parent, childData) => {
  const directives = new DirectiveCollection();
  
  // check for case where parsed child key (add directive) is in parent
  if (parent[childData.parsedKey] !== undefined) {
    const directive = DIRECTIVES[DIRECTIVE_NAMES.Add];
    directives.add(directive.name, {
      directive,
      ...(getValue(parent, childData.parsedKey)),
      originalKey: childData.parsedKey //! may not need
    });
  }

  for (let dirKey in DIRECTIVES) {
    const build = dirKey + DIRECTIVE_PREFIX + childData.parsedKey;
    const parentData = getValue(parent, build);

    if (parentData.valType !== "undefined") {
      const directive = DIRECTIVES[dirKey];
      directives.add(directive.name, {
        directive,
        ...parentData,
        originalKey: build //! may not need
      });
    }
  }

  return directives;
}

const inheritClassFromParentToChild = (parent, child) => {
  const path = "{root}";
  let currentDirective = DIRECTIVE_NAMES.Add;

  const deepSearch = (_parent, _child) => {
    const parentDirectivesCache = {}; //!clear this object before doing another recursive call

    for (let _childKey in _child) {

      const childData = getValueWithDirective(_child, _childKey, currentDirective);

      /*
        * > CONSTRUCT PARENT DATA
      */
      const parentData = {
        val: null,
        valType: null,
        allDirectives: null,
      }

      {
        let cachedDirectives = parentDirectivesCache[childData.parsedKey];
        let parentValOriginal = _parent[childData.originalKey];

        if (cachedDirectives) {
          parentData.allDirectives = cachedDirectives;
        } else {
          const allDirectives = findAllDirectives(_parent, childData);
          parentDirectivesCache[childData.parsedKey] = allDirectives;
          parentData.allDirectives = allDirectives;
        }

        if (parentValOriginal === undefined) {
          console.log('looking for formatted key...');
          parentValOriginal = _parent[childData.formattedKey];
        }

        parentData.val = parentValOriginal;
        parentData.valType = typeof parentValOriginal;
      }
      /*
        * < CONSTRUCT PARENT DATA
      */

      console.log('for child key: ', childData.originalKey, ' | ', childData);
      console.log('parent data: ', parentData);

      if (!parentData.allDirectives.hasAny()) {
        console.log('creating new field for: ', childData.originalKey);
        _parent[_childKey] = childData.val;
        continue;
      }

      childData.directive.apply(parentData, childData);


      // parentData.val 
      // parentData.valType
      // parentData.key
      // parentData.directive
      // parentData.allDirectives
      // parentData.allDirective.has(DIRECTIVE_NAMES.Add)


    }
  }

  deepSearch(parent, child);
  return parent;
}


const child = {
  self: "base-self",
}

const parent = {
  // self: "some new self",
  // "rm:self": "something"
  "self": "lol"
}

console.log('---------------------------------------------');
console.log(inheritClassFromParentToChild(parent, child));

