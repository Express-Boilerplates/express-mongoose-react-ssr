import express from 'express'
import cookie from 'cookie-parser'
import morgan from 'morgan'
import catchGlobalError from './middlewares/catchGlobalError'
import { promisify } from 'util'

/**
 * React App
 */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import routes, { ClientRoutes } from '../app/Routes'
import sass from 'node-sass'
import serialize from 'serialize-javascript'
import Home from '../app/pages/HomePage'
import { StaticRouter, matchPath } from 'react-router-dom'
import { DataProvider, createDataClient } from 'react-isomorphic-data'
import { renderToStringWithData } from 'react-isomorphic-data/ssr'
import fetch from 'node-fetch'
// react-isomorphic-data needs fetch to be available in the global scope
global.fetch = fetch

/**
 * V1
 */
import apiBootstrap_v1 from './api'

/**
 * Initialize Express application
 */
const app = express()

app.use(express.static('public'))

app.use(cookie(process.env.APP_SECRET))

/**
 * Express Logger
 */
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

/**
 * Parse request Body
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * Apis
 */
app.get('/status', (req, res) => {
    res.json({
        status: '🔥 🔥 Server is working 🔥 🔥',
        NODE_ENV: process.env.NODE_ENV,
        database: {
            dbUrl: process.env.DATABASE_URL,
            ssl: process.env.DB_SSL,
        },
    })
})

app.use('/api/v1/', apiBootstrap_v1)
app.all('/api/*', (_, res) => {
    res.status(404).json({
        message: 'Invalid api route',
    })
})

app.all('*', async (req, res, next) => {
    const dataClient = createDataClient({
        initialCache: {},
        ssr: true, // set this to true on server side
    })

    const tree = (
        <DataProvider client={dataClient}>
            <StaticRouter location={req.url} context={{}}>
                <ClientRoutes />
            </StaticRouter>
        </DataProvider>
    )
    let renderedHtml = await renderToStringWithData(tree, dataClient)

    let styles = await promisify(sass.render)({
        file: './app/styles/app.scss',
        outputStyle: 'compressed',
    })
    let template = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <title>Tech Diary</title>
                    <style>
                        ${styles.css}
                    </style>

                </head>
                <body>
                    <div id="app">${renderedHtml}</div>
                    <script src="/dist/index.js"></script>
                </body>
            </html>
        `
    res.send(template)
})

app.use(catchGlobalError)

export default app
