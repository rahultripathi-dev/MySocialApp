import React, {useCallback, useState} from 'react';

const useReferesh = (initialCallingFunction = () => {}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
     initialCallingFunction();
    setRefreshing(false);
  }, [initialCallingFunction]);

  return {
    setRefreshing,
    refreshing,
    onRefresh,
  };
};

export default useReferesh;
