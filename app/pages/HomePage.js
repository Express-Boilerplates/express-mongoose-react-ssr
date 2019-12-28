import React, { useEffect, useState } from 'react'

import { useData } from 'react-isomorphic-data'

const HomePage = () => {
    const { data, loading } = useData(
        `https://jsonplaceholder.typicode.com/posts`
    )

    return (
        <div>
            <h1>Home Page</h1>
            {data?.data.map(article => (
                <article key={article._id}>
                    <h1>{article.title}</h1>
                    <p>{article.body}</p>
                </article>
            ))}
        </div>
    )
}

export default HomePage
