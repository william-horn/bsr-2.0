const Child = ({ className }) => {
  const baseComponent = {
    self: "omega",
    keyA: "alpha theta",
    keyB: "beta phi",
    keyC: {
      self: "parent",
      key_C1: "gamma delta",
      key_C2: "kappa lambda",
    }
  }

  baseComponent.compileClasses();

  return (
    <div className={baseComponent.self}>
      <h2 className={baseComponent.keyA}></h2>
    </div>
  );
}

const Parent = ({ className }) => {
  const parentComponent = {
    self: "parent",
    _baseComponent: {
      self: "zeta",
      keyA: "epsilon",
      "keyB:remove": "beta",
      keyC: {
        "key_C2:remove": "kappa",
        key_C2: "iota",
        key_C1: "upsilon"
      }
    }
  }

  return (
    <Child className={parentComponent._baseComponent}>
    </Child>
  );
}

const Grandparent = ({ className }) => {
  const grandparentComponent = inheritClassName(className, {
    self: "grandparent",
    _baseComponent: {
      keyA: "beta mu",
      "keyA:remove": "epsilon",
      "keyB:remove": "phi",
      keyC: {
        key_C2: "nu pi",
        "key_C2:remove": "lambda",
        key_C1: "beta-gamma"
      }
    }
  })

  read(className, grandparentComponent);

  return (
    <Parent className={grandparentComponent._baseComponent}>
    </Parent>
  );
}

 <Grandparent

className={{
  leftIcon: {
    rightSide: {
      title: "lol"
    }
  }
}}

removeClassName={{
  leftIcon: {
    rightSide: {
      title: "no"
    }
  }
}}


className={{
  leftIcon: {
    rightSide: {
      title: "lol",
      "rm:title": "no"
    }
  }
}}

className="testing"
className={{ "add:self": "testing" }}

className={{
  "rm:iconLeft": {
    title: "lol"
  }

  iconLeft: {
    "rm:thing": {
      title: "lol"
    },

    "rm:thing": "self-thing",

    thing: {
      "rm:self": "self-thing",
    }
  },

  rightIcon: {
    thing: {
      key0: "lol",
      "rm:self": "cautious"
    }
  },


  test: {

    "rp:thing": {
      sub: "lol",
      another: "idk"
    },

    "rp:thing": {
      "rp:sub": { "rp:self": "lol" },
      "rp:another": { "rp:self": "idk" },

      // "add:more": "lol",

      "rm:more": {
        "add:self": "lol"
      }
    },

    "rp:thing": "apple",

    thing: {
      "rp:self": "apple",
    }

    obj: {
      key0: "lol"
    }
  },

  parent: {
    // thing: "parent",
    obj: "asd",

    thing: {
      sub: "sure",
      another: { self: "idk" },
      more: { self: "cool" },
      coffee: { self: "brown" }
    }
  }

  /*

  */
}}
>
</Grandparent> 