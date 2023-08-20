import { useEffect, useState } from 'react';

type localStorageValue = string | number | {} | null | Function;

const useLocalStorage = (key: string, initialValue: localStorageValue) => {

  const [storedValue, setStoredValue] = useState(() => {

    try {
      // const item = window.localStorage.getItem(key);
      // return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }

  });

  const setValue = (value: localStorageValue) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      // window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage('dark-theme', null);

  useEffect(() => {
    // const className = 'dark';
    // let targetElement = document.documentElement;
    // if(enabled){
    //   targetElement.classList.add(className);
    // }else{
    //   targetElement.classList.remove(className);
    // }
    // console.log(enabled);
    
  }, [enabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;
