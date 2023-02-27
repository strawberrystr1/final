import { useEffect, useState } from 'react';

import { useAppSelector } from '../redux/hooks';

export const useOwner = (userId: number | undefined | null) => {
  const { id } = useAppSelector(state => state.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsOwner(id === userId);
  }, [userId, id]);

  return isOwner;
};
