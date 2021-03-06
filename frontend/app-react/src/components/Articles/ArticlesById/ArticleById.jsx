import React, { useState, useEffect } from 'react'
import './ArticleById.css'

import { baseApiUrl } from '../../../global'
import axios from 'axios'

import PageTitle from '../../Template/PageTitle/PageTitle'

export default function ArticleById(props) {
    const { match } = props
    const [article, setArticle] = useState({ id: parseInt(match.params.id) })

    console.log(match)
    
    function createMarkup() {
        return { __html: article.content };
    }

    useEffect(() => {
        async function loadByArticle() {
            const url = `${baseApiUrl}/articles/${article.id}`
            return await axios.get(url).then(res => setArticle(res.data))
        }

        loadByArticle()
    }, [article.id])

    return (
        <div className="article-by-id">
            <PageTitle icon="fa fa-file-o" namePage={article.nome} subtitle={article.description} />
            <div className="article-content" dangerouslySetInnerHTML={createMarkup()} />
        </div>
    )
}