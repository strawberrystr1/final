import { useEffect, useState } from 'react';

import { useAppSelector } from '../redux/hooks';

export const useOwner = (userId: number | undefined | null, role: string) => {
  const { id } = useAppSelector(state => state.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsOwner(id === userId);
    if (role === 'admin') setIsOwner(true);
  }, [userId, id, role]);

  return isOwner;
};
