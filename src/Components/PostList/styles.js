import styled from 'styled-components';

export const Container = styled.aside`

  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  width: 300px;

  .box-filters {
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    border-radius: 2px;
    padding: 10px;

    div {
      margin-bottom: 20px;
      span {
        font-weight: bold;
      }
      select {
        display: block;
        border-radius: 2px;
        padding: 5px;
        width: 200px;
      }
    }
  }

  .box-list-posts {
    
    min-height: 350px;

    ul {
      margin: 30px 0 30px 20px;
      list-style-type: disc;
      li {
        margin-bottom: 10px;

        h3 {
          color: #333333;
        }
        p {
          color: #999999;
          font-size: 12px;
        }
      }
    }
  }  

`;