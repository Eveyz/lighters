import React, { Suspense } from 'react';

import {AppContextProvider} from '../AppContext'
import Loading from '../components/Loading'

const Routes = React.lazy(() => import('./Routes'))

const App = (props) => {

  return (
    <AppContextProvider path={props.location.pathname}>
      <Suspense fallback={
        <Loading />
      }>
        <Routes />
      </Suspense>
    </AppContextProvider>
  )
}

export default App