import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import peopleReducer, { defaultState as peopleStateDefault } from './peopleSlice';
import {saveState} from './localStorage';
import throttle from 'lodash/throttle';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;

store.subscribe(throttle(() => {
  const peopleState = store.getState().people;
  saveState({
    people: {
      ...peopleStateDefault,
      mode: peopleState.mode,
      count: peopleState.count,
      currResults: peopleState.currResults,
      currPage: peopleState.currPage,
      maxPage: peopleState.maxPage,
      nameInSearch: peopleState.nameInSearch,
    }
  });
}, 1000));
