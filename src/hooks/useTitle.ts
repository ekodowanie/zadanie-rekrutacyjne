import { useEffect, useRef, useState, useCallback } from 'react';

export const useTitle = (title = '') => {
  const previousTitle = useRef('');
  const [titleState, setTitleState] = useState(title);

  const updateTitle = useCallback(
    (newTitle: string, append = false) => {
      setTitleState(!append ? newTitle : `${titleState}${newTitle}`);
    },
    [titleState],
  );

  useEffect(() => {
    previousTitle.current = document.title;
    document.title = titleState
      ? `${process.env.REACT_APP_NAME} - ${titleState}`
      : process.env.REACT_APP_NAME
      ? process.env.REACT_APP_NAME
      : '';
    return () => {
      document.title = previousTitle.current;
    };
  }, [titleState]);

  return {
    updateTitle,
  };
};
