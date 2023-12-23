import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import type { RootState, Dispatch } from '@app/common';

export const useAppDispatch = () => useDispatch<Dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
