import React from 'react'
import ReactDOM from 'react-dom'
import { ClientRoutes } from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider, createDataClient } from 'react-isomorphic-data'

const dataClient = createDataClient({
    initialCache: window.__cache,
    ssr: false,
})

const App = () => (
    <DataProvider client={dataClient}>
        <BrowserRouter>
            <ClientRoutes />
        </BrowserRouter>
    </DataProvider>
)

ReactDOM.hydrate(<App />, document.getElementById('app'))
