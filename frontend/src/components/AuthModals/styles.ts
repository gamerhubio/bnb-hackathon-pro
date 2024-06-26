import styled from "styled-components";


export const ModalWrapperStyled = styled.div`
  padding: 60px 40px;
  background: rgb(0,20,71);
  background: linear-gradient(90deg, rgba(0,20,71,1) 0%, rgba(46,0,61,1) 84%);
  border: none;
  > div {
    display: flex;
    justify-content: center;
  }
  h2 {
    margin-bottom: 28px;
    text-align: center;
    font-size: 36px;
    min-width: 500px;
  }
  .container {
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    padding: 30px 8px;
    margin:20px;
    width: 94vw;
    h2 {
      margin-bottom: 18px;
      text-align: center;
      font-size: 26px;
      min-width: 100px;
    }
  }
`;
