import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Routes from './routes';
import PostList from './Components/PostList';
import Header from './Components/Header';

import GlobalStyle from './global/style';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container-blog">        
        <PostList />
        <Routes />
      </div>      
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
