import React, { ReactNode } from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import {QueryClient, QueryClientProvider} from 'react-query'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { createFirestoreInstance } from 'redux-firestore';
import { Provider } from 'react-redux'
import store from '../redux/index'
import { rfConfig } from '../utils/config'
 
const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps):ReactNode {
  return (
      <>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
          <ReactReduxFirebaseProvider
            firebase={firebase}
            config={rfConfig}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}>
              <Component {...pageProps} />
            </ReactReduxFirebaseProvider>
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
      </>
    )
}

export default App