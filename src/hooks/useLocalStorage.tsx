import { useState } from 'react';

type UseLocalStorage = (
  keyName: string,
  defaultValue: any
) => [storedValue: any, setValue: SetValue];

type SetValue = (newValue: any) => void;

export const useLocalStorage: UseLocalStorage = (
  keyName: string,
  defaultValue: any
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value: string | null = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as any;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue: SetValue = (newValue: any) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
