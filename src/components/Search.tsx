import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectPeopleState, Mode, setMode, setNameSearched} from "../redux/peopleSlice";

type Props = { goToPage: any };
function Search ({ goToPage }: Props) {

  const dispatch = useDispatch();
  const state = useSelector(selectPeopleState);

  function onChange(e:React.BaseSyntheticEvent) {
    dispatch(setNameSearched(e.target.value));
    if (e.target.value === '') {
      console.log('Going into Mode.ALL because entered text was removed');
      dispatch(setMode(Mode.ALL));
      return goToPage(0, Mode.ALL);
    }
  }

  function onClick(){
    if (state.nameInSearch === '') return console.log('Return as no name was entered.');
    console.log('Setting mode to SEARCH');
    dispatch(setMode(Mode.SEARCH));
    goToPage(0, Mode.SEARCH, state.nameInSearch);
  }

  return <div className="h-16">
        <div className="relative">
          <input type="search" name="query" placeholder="Search characters"
                 value={state.nameInSearch}
                 onChange={onChange}
                 required
                 className="p-4 text-gray-700 w-full bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-0"
                 onKeyPress={event => {
                   if (event.key === 'Enter') {
                     onClick();
                   }
                 }}/>
          <button className="bg-primary text-white rounded font-lg absolute top-0 right-0 bottom-0 mt-1 mr-1 mb-1 px-8 font-semibold hover:bg-teal-300 focus:outline-none focus:ring"
                  onClick={onClick}>
            Search
          </button>
        </div>
      </div>;
}

export default Search;
