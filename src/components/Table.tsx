import React, {useRef} from "react";
import {useSelector} from "react-redux";
import {selectPeopleState, Mode} from "../redux/peopleSlice";
import {Route} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Character from "./Character";

type Props = { goToPage: any, getPeople: any };
function Search ({ goToPage, getPeople }: Props) {

  const state = useSelector(selectPeopleState);
  const mounting = useRef(true);
  const history = useHistory();

  if (mounting.current) {
    console.log('mounting.current', state);
    if (state.mode === Mode.ALL) getPeople({
      variables: {
        page: state.currPage + 1,
      }
    });
    mounting.current = false;
  }

  const goToPrevious = () => goToPage(state.currPage-1);
  const goToNext = () => goToPage(state.currPage+1);
  const showPrevious = () => state.currPage !== 0;
  const showNext = () => state.currPage !== state.maxPage;

  function rowClicked(characterIndex:number) {
    history.push(`/${characterIndex}`);
  }

  return <>
    <div className="bg-white overflow-hidden shadow sm:rounded-lg">

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 text-left border-t">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mass
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Height
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">

                {
                  (state.currResults.map((character: any, i:number) => (<>

                    <tr key={character.name} className='cursor-pointer' onClick={() => rowClicked(i)}>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {character.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{character.mass}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{character.height}</div>
                      </td>
                    </tr>

                    <Route path={`/${i}`} render={(props) => (
                      <Character {...props} character={character} />
                    )} />
                  </>)))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          {showPrevious() && <div
            className="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            onClick={goToPrevious}>
            Previous
          </div>}
          {showNext() && <div
            className="cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            onClick={goToNext}>
            Next
          </div>}
        </div>

        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>

            <p className="text-sm text-gray-700 inline">
              {'Showing '}
              <span className="font-medium">1</span>
              {' to '}
              <span className="font-medium">10</span>
              {' of '}
              <span className="font-medium">{state.count}</span>
              {' results'}
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                 aria-label="Pagination">
              {showPrevious() && <div
                className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={goToPrevious}>
                <span className="sr-only">Previous</span>
                {/* Heroicon name: solid/chevron-left */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                     fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"/>
                </svg>
              </div>}

              {new Array(state.maxPage + 1).fill(0).map((e, i) => {
                return <div key={i}
                            className={"cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 " + (i === state.currPage ? 'bg-gray-200' : '')}
                            onClick={() => goToPage(i)}>{i + 1}</div>;
              })}

              {showNext() && <div
                className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={goToNext}>
                <span className="sr-only">Next</span>
                {/* Heroicon name: solid/chevron-right */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                     fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"/>
                </svg>
              </div>}
            </nav>
          </div>
        </div>
      </div>

    </div>

    {state.fetching?
      <div className='my-3'>
        Ongoing network fetch
        <div
          className='border-gray-200 ease-linear h-5 inline-block loader rounded-full w-5 align-bottom ml-2 border-4 border-t-4' />

      </div>
      : <div className='my-3'><p>&nbsp;</p></div>
    }

  </>;
}

export default Search;
