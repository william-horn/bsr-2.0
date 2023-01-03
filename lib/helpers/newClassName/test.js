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

  apply(baseComponent, everything)

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
  self: "more",
  _baseComponent: {
    "rm:keyA": "epsilon",
    keyA: "epsilon",
    keyC: {
      "rm:self": "parent",
      key_C1: "c1",
      "rm:key_C1": "beta-gamma"
    }
  }
}}
>
</Grandparent> 