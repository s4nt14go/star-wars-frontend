import React, {useRef, useState} from 'react';
import './App.css';
import chewbacca from './img/chewbacca.png';
import { useQuery, gql } from '@apollo/client';
import {client} from "./index";

const PEOPLE = gql`
    query People ($page: String) {
        people (page: $page) {
            count
            next
            previous
            people {
                name
                mass
                height
            }
        }
    }
`;

function App() {

  const [ people, setPeople ] = useState([]);
  const [ currPage, setCurrPage ] = useState(0);
  const [ changingPage, setChangingPage ] = useState(false);
  const initialQuery = useRef(true);

  const { loading, error, data, fetchMore } = useQuery(PEOPLE, {
    onCompleted(data) {
      if (initialQuery.current) {
        setPeople(data.people.people);
        initialQuery.current = false;
      }
    }
  });

  let pagination, footerPages = [], maxPage: number;
  if (data) {
    pagination = data.people;
    maxPage = Math.ceil(pagination.count/10);
    for (let i = 0; i < maxPage; i++) {
      footerPages.push(<a key={i} href="#" className={"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 " + (i === currPage? 'bg-gray-100':'')} onClick={() => goToPage(i)}>{i+1}</a>);
    }
  }

  async function goToPage(i:number) {
    setChangingPage(true);
    const variables = {page:(i+1).toString()};
    const cache = client.readQuery({
      query: PEOPLE,
      variables,
    });
    if (cache) {
      setPeople(cache.people.people);
      setCurrPage(i);
    }
    const more = await fetchMore({variables});
    setCurrPage(i);
    setPeople(more.data.people.people);
    setChangingPage(false);
  }
  const goToPrevious = async () => await goToPage(currPage-1);
  const goToNext = async () => await goToPage(currPage+1);
  const showPrevious = () => currPage !== 0;
  const showNext = () => currPage !== maxPage - 1;

  return (
    <div className="App">

      <div className="container px-5 pb-12 mx-auto">
        <section className="text-gray-600 body-font">
          <div className="flex flex-col text-center w-full mb-4">
            <img src={chewbacca} alt="Polly" className='mx-auto w-1/5' />
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">List Star Wars characters</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Using the Star Wars API <a href="https://swapi.dev" target='_blank' rel="noreferrer" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>swapi.dev</a></p>
          </div>
        </section>

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
                  error?
                    <p>Error: {error.toString()}</p>
                    :
                    loading && !people?
                    <p>Loading...</p>
                    :
                    (people.map((person: any) => (

                      <tr key={person.name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {person.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{person.mass}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{person.height}</div>
                        </td>
                      </tr>
                    )))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

        {pagination && (
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          {showPrevious() && <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                                     onClick={goToPrevious}>
            Previous
          </a>}
          {showNext() && <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                                 onClick={goToNext}>
            Next
          </a>}
        </div>

        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>

            <p className="text-sm text-gray-700 inline">
              {'Showing '}
              <span className="font-medium">1</span>
              {' to '}
              <span className="font-medium">10</span>
              {' of '}
              <span className="font-medium">{pagination.count}</span>
              {' results'}
            </p>
            <div className={`border-gray-200 ease-linear h-5 inline-block loader rounded-full w-5 align-bottom ml-2 ${changingPage? 'border-4 border-t-4':''}`}></div>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {showPrevious() && <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                         onClick={goToPrevious}>
                <span className="sr-only">Previous</span>
                {/* Heroicon name: solid/chevron-left */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </a>}
              {footerPages}
              {showNext() && <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                     onClick={goToNext}>
                <span className="sr-only">Next</span>
                {/* Heroicon name: solid/chevron-right */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </a>}
            </nav>
          </div>
        </div>
      </div>
        )}

      </div>

      </div>

    </div>
  );
}

export default App;
