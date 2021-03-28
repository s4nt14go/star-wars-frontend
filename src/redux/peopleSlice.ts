import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { loadState } from "./localStorage";

/*export enum mode {
  ALL = 1,
  SEARCH
}*/

interface PeopleState {
  // mode: mode
  count: number;
  currResults: [object];
  currPage: number;
  maxPage: number;
  fetching: boolean;
}

export const defaultState = {
  // mode: mode.ALL,
  count: 0,
  currResults: [],
  currPage: 0,
  maxPage: 0,
  fetching: false,
};

const initialState: PeopleState = loadState()?.people || defaultState;

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.fetching = action.payload;
    },
    /*setMode: (state, action: PayloadAction<mode>) => {
      state.mode = action.payload;
    },*/
    setCurrPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload;
    },
    setResults: (state, action: PayloadAction<any>) => {
      const { count, currResults } = action.payload;
      state.count = count;
      state.currResults = currResults;
      state.maxPage = Math.floor(count/10);
    },
  },
});

export const { setFetching, setResults, setCurrPage/*, setMode*/ } = peopleSlice.actions;

// region --------------------------------------------------------------------------------- Selectors
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCounterValue = (state: RootState) => state.counter.value;

export const selectPeopleState = (state: RootState) => state.people;
// endregion

export default peopleSlice.reducer;
