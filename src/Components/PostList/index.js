import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../Service/api';
import { toast } from 'react-toastify';

import { Container } from './styles';

import Loading from '../Loading';

export default function PostList() {

  const [ posts, setPosts ] = useState([]);
  const [ authors, setAuthors ] = useState([]); 
  const [ loading, setLoading ] = useState(false);
  const [ order, setOrder ] = useState('');
  const [ author, setAuthor ] = useState('');
  const history = useHistory();

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const response = await api.get('/5be5e3fa2f000082000fc3f8');      
        setPosts(response.data);
      } catch (error) {
        toast.error(`Error loading data posts [${error.message}]`);
      }       
      setLoading(false);
    }
    loadPosts();
    loadAuthors();
  },[]);

  async function loadAuthors() {
    setLoading(true);
    try {
      const responseAuthors = await api.get('/5be5e3ae2f00005b000fc3f6');
      setAuthors(responseAuthors.data); 
    } catch (error) {
      toast.error(`Error loading data authors [${error.message}]`);
    }    
    setLoading(false);
  }

  function formatDate(date) {
    if (date) {
      const datePost = new Date(date); 
      return (((datePost.getMonth()+1) < 10) ? '0'+(datePost.getMonth()+1) : (datePost.getMonth()+1)) + '-' + ((datePost.getDate() < 10) ? '0'+datePost.getDate() : datePost.getDate()) + '-' + datePost.getFullYear(); 
    } else return '';   
  }

  function formatUrlPost(date) {
    if (date) {
      const datePost = new Date(date); 
      return (((datePost.getMonth()+1) < 10) ? '/'+(datePost.getMonth()+1) : (datePost.getMonth()+1)) + '/' + ((datePost.getDate() < 10) ? '0'+datePost.getDate() : datePost.getDate()) + '/' + datePost.getFullYear();
    } else return '';   
  }

  function formatSlugPost(slug) {
    if (slug) {
      return slug.replace(/[^A-Z1-9]/ig,'-');
    } else return '';
  }

  async function filterPostsToAuthor(authorIdSelected) {    
    setLoading(true);
    setAuthor(authorIdSelected);    
    try {
      const response = await api.get('/5be5e3fa2f000082000fc3f8');
      if (authorIdSelected) {
        response.data.filter(post => post.metadata.authorId === parseInt(authorIdSelected)).map(filteredPosts => setPosts(filteredPosts));
        history.push('/');
      } else setPosts(response.data);
    } catch (error) {
      toast.error(`Error loading data posts [${error.message}]`);
    }
    setLoading(false);
  }

  async function filterPostsToDate(order) {  
    setLoading(true);      
    setOrder(order);
    try {
      const response = await api.get('/5be5e3fa2f000082000fc3f8');
      if (order) {
        if (order === 'asc') setPosts(response.data.sort((a, b) => b.metadata.publishedAt - a.metadata.publishedAt));
        else setPosts(response.data.sort((a, b) => a.metadata.publishedAt - b.metadata.publishedAt));
      } else setPosts(response.data);
    } catch (error) {
      toast.error(`Error loading data posts [${error.message}]`);
    }
    setLoading(false);
  }

  return (
    <Container>
      <div className="box-filters">
        <div>
          <span>filter posts to date:</span>
          <select onChange={e => filterPostsToDate(e.target.value)} defaultValue={order}>
            <option value="">Select an option</option>            
            <option value="asc">Crescent</option>
            <option value="desc">Decrescent</option>
          </select>
        </div>
        <div>
          <span>filter posts to author:</span>
          <select onChange={e => filterPostsToAuthor(e.target.value)} defaultValue={author}>
            <option value="">All authors</option>
            { authors?.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>    
      </div>
      <div className="box-list-posts">
        { loading ? (
          <Loading />
        ) : (              
          <ul>      
          { 
            posts.length ? (
              posts?.map(post => (
                <li key={post.title}>
                  <Link to={`/post${formatUrlPost(post.metadata.publishedAt)}/${formatSlugPost(post.title)}`}>
                    <h3>{post.title}</h3>
                    <p>{formatDate(post.metadata.publishedAt)}</p>
                  </Link>
                </li>
              ))
            ) : (
              <li key={posts.title}>
                <Link to={`/post${formatUrlPost(posts?.metadata?.publishedAt)}/${formatSlugPost(posts?.title)}`}>
                  <h3>{posts?.title}</h3>
                  <p>{ formatDate(posts?.metadata?.publishedAt)}</p>
                </Link>
              </li>
            )
          }
          </ul>      
        )}
      </div>
    </Container>
  );
}
