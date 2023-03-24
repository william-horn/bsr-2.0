
import { isClient } from "../lib/helpers/machine";
import { useRef } from 'react';

const useLocalStorageRequest = (key, value) => {
  let dataRef = useRef(value);

  if (isClient()) {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      dataRef.current = saved;
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  const updater = (func) => {
    const updated = func(dataRef.current);
    if (isClient()) {
      localStorage.setItem(key, JSON.stringify(updated));
    }
    dataRef.current = updated;
  }

  /*
    return the literal value:
      const value = getter();

    return an index from the value:
      const value = getter("someIndex") => getter()["someIndex"]
  */
  const getter = (domain) => {
    if (domain) {
      return dataRef.current[domain] || [];
    } else {
      return dataRef.current;
    }
  }

  return [getter, updater];
}

export default useLocalStorageRequest;