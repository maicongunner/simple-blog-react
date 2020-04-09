import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0 auto;
    min-height: 100%;
  }

  body {
    color: #333333;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    line-height: 20px;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
  }

  .container-blog {
    display: flex;    
  }

  h4 {
    margin-bottom: 20px;
  }

  ul {
    padding-left: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
