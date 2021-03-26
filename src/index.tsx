import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthOptions, createAuthLink} from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import config from './config';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const _config = {
  url: config.API as string,
  region: config.REGION as string,
  auth: {
    type: config.authType,
    apiKey: config.API_KEY,
  } as AuthOptions,
};
export const client = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink(_config),
    // @ts-ignore
    createSubscriptionHandshakeLink(_config),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client as any}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
