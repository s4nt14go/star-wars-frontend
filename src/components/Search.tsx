import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectPeopleState, Mode, setMode, setNameSearched} from "../redux/peopleSlice";

type Props = { goToPage: any, search: any };
function Search ({ goToPage, search }: Props) {

  const dispatch = useDispatch();
  const state = useSelector(selectPeopleState);
  const mounting = useRef(true);

  if (mounting.current) {
    console.log('mounting.current', state);
    if (state.mode === Mode.SEARCH) {
      search({
        variables: {
          name: state.nameInSearch,
          page: state.currPage + 1,
        }
      });
    }
    mounting.current = false;
  }
  function onChange(e:React.BaseSyntheticEvent) {
    dispatch(setNameSearched(e.target.value));
    if (e.target.value === '') {
      console.log('Going into Mode.ALL ya que se borró el texto ingresado');
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

  return <div className="">
    <div className="">
      <div className="h-16">
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
      </div>
    </div>
  </div>;
}

export default Search;
