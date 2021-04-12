import React, {useRef} from 'react';
import './App.css';
import { useLazyQuery, gql } from '@apollo/client';
import {client} from "./index";
import Header from './components/Header';
import {useDispatch, useSelector} from "react-redux";
import {setFetching, setResults, selectPeopleState, setCurrPage, Mode, setNavigatingToPage} from "./redux/peopleSlice";
import Search from "./components/Search";
import Table from "./components/Table";
import {Route, Switch} from "react-router-dom";
import Character from "./components/Character";
import SyntaxHighlighter from 'react-syntax-highlighter';

const FIELDS = gql`
    fragment Fields on PeoplePage {
        count
        next
        previous
        people {
            name
            mass
            height
            gender
            homeworld
        }
    }
`;

const PEOPLE = gql`
    ${FIELDS}
    query People ($page: String) {
        people (page: $page) {
            ...Fields
        }
    }
`;

const SEARCH = gql`
    ${FIELDS}
    query Search ($name: String!, $page: String) {
        search (name: $name, page: $page) {
            ...Fields
        }
    }
`;

function App() {

  const dispatch = useDispatch();
  const state = useSelector(selectPeopleState);
  const mounting = useRef(true);

  function setPeople({count, people: currResults }: {count:number, people:[object]} ) {
    dispatch(setResults({
      count,
      currResults,
    }));
  }

  const [getPeople, { loading: loadingP, error: errorP }] = useLazyQuery(PEOPLE, {
    onCompleted(data) {
      console.log('getPeople completed', data);
      setPeople(data.people);
      if (typeof state.navigatingToPage === 'number') dispatch(setCurrPage(state.navigatingToPage));
      dispatch(setFetching(false));
    },
    onError(e) {
      console.log(e);
      localStorage.removeItem('redux');
    },
  });

  const [search, { loading: loadingS, error: errorS }] = useLazyQuery(SEARCH, {
    onCompleted(data) {
      console.log('search completed', data);
      setPeople(data.search);
      if (typeof state.navigatingToPage === 'number') dispatch(setCurrPage(state.navigatingToPage));
      dispatch(setFetching(false));
    },
    onError(e) {
      console.log(e);
      localStorage.removeItem('redux');
    },
  });

  if (mounting.current) {
    console.log('mounting.current', state);
    if (typeof state.currPage === 'number') {
      dispatch(setCurrPage(state.currPage));
    } else {
      dispatch(setCurrPage(0));
    }

    switch (state.mode) {
      case Mode.ALL:
        getPeople({
          variables: {
            page: state.currPage + 1,
          }
        });
        break;
      case Mode.SEARCH:
        search({
          variables: {
            name: state.nameInSearch,
            page: state.currPage + 1,
          }
        });
        break;
      default:
        console.log(`Unknown mode: ${state.mode}`);
    }
    mounting.current = false;
  }

  function goToPage(i:number, _mode?:number, name?:string) {
    console.log('goToPage', i, _mode, name);
    const mode = _mode || state.mode;
    console.log('mode', mode);
    dispatch(setNavigatingToPage(i));
    let variables = {
      page: i + 1,
    } as any;
    let cache;
    switch (mode) {
      case Mode.ALL:
        cache = client.readQuery({
          query: PEOPLE,
          variables,
        });
        if (cache) {
          dispatch(setCurrPage(i));
          setPeople(cache.people);
        }
        dispatch(setFetching(true));
        getPeople({variables});
        break;
      case Mode.SEARCH:
        variables.name = state.nameInSearch;
        cache = client.readQuery({
          query: SEARCH,
          variables,
        });
        if (cache) {
          dispatch(setCurrPage(i));
          setPeople(cache.search);
        }
        dispatch(setFetching(true));
        search({variables});
        break;
      default:
        console.log(`Unknown mode: ${mode}`);
    }
  }

  const anyError = errorS || errorP;
  const anyLoading = loadingS || loadingP;
  return (
    <div className="App">

      <div className="container px-5 pb-12 mx-auto">

        <Header />

        {
          anyError ? <>
              <p>Error received! The <a href="https://github.com/s4nt14go/star-wars-backend" target='_blank' rel="noreferrer" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>backend</a> actually is just an API proxy that GETs data from <a href="https://swapi.dev" target='_blank' rel="noreferrer" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>https://swapi.dev</a>, so maybe something is wrong in it:</p>
              <SyntaxHighlighter language='json'>
                {anyError}
              </SyntaxHighlighter>
            </>:
            anyLoading && !state.currResults.length ?
              <p>Loading... {anyLoading.toString}</p>
              :
              <Switch>
                <Route path="/:id" component={Character} />
                <Route path="/" render={(props) => (<>
                  <Search {...props} goToPage={goToPage} />
                  <Table {...props} goToPage={goToPage} />
                </>)} />
              </Switch>
        }
      </div>

    </div>
  );
}

export default App;
