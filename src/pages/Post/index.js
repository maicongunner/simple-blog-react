/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import api from '../../Service/api';
import { toast } from 'react-toastify';

import { Container } from './styles';

import Loading from '../../Components/Loading';

export default function Post({ match }) {

  const { slug } = match.params;

  const [ post, setPost ] = useState([]);
  const [ author, setAuthor ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  function formatSlugPost(text) {
    return text.title.replace(/[^A-Z1-9]/ig,'-');
  }

  function returnMonth(month) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month];
  }

  function formatDataPost(date) {
    const datePost = new Date(date); 
    return returnMonth(datePost.getMonth()) + ' ' + ((datePost.getDate() < 10) ? '0'+datePost.getDate() : datePost.getDate()) + ', ' + datePost.getFullYear();
  }

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const response = await api.get('/5be5e3fa2f000082000fc3f8');
        filterAuthor(response.data);
      } catch (error) {
        toast.error(`Error loading data posts [${error.message}]`);
      } 
      setLoading(false);
    }
    loadPosts();
  },[slug]);

  function filterAuthor(data) {
    data.filter(title => formatSlugPost(title) === slug).map( filteredPost => {
      setPost(filteredPost);
      loadAuthor((filteredPost.metadata.authorId));
    });
  }

  async function loadAuthor(idAuthor) {   
    try {
      const responseAuthor = await api.get('/5be5e3ae2f00005b000fc3f6');
      responseAuthor.data.filter(authorData => authorData.id === idAuthor).map(authorFiltered => setAuthor(authorFiltered.name));    
    } catch (error) {
      toast.error(`Error loading data authors [${error.message}]`);
    }
  }

  return (
    <Container>
      { loading ? (
        <Loading />
      ) : (
        <>
          <h4>{post.title}</h4>
          <h5> by {author} </h5>
          <h6>{post?.metadata?.publishedAt && formatDataPost(post?.metadata?.publishedAt)}</h6>
          <p>{post.body}</p>
        </>
      )}
    </Container>
  );
}
