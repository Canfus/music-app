import { useLayoutEffect } from 'react';

import { useAppDispatch, setAlbum } from '@app/common/store';
import { useTracklist } from '@app/api';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { data } = useTracklist();

  useLayoutEffect(() => {
    dispatch(setAlbum(data));
  }, [data, dispatch]);

  return <div>Eto main</div>;
};
