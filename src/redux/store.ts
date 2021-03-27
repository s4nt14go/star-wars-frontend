import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer, { defaultState as counterStateDefault } from './counterSlice';
import peopleReducer, { defaultState as peopleStateDefault } from './peopleSlice';
import {saveState} from './localStorage';
import throttle from 'lodash/throttle';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
  const counterState = store.getState().counter;
  const peopleState = store.getState().people;
  console.log('store.subscribe currPage', peopleState.currPage);
  saveState({
    counter: {
      ...counterStateDefault,
      value: counterState.value,
    },
    people: {
      ...peopleStateDefault,
      // mode: peopleState.mode,
      count: peopleState.count,
      currResults: peopleState.currResults,
      currPage: peopleState.currPage,
      maxPage: peopleState.maxPage,
    }
  });
}, 1000));
