import styled from 'styled-components';

export const WrapperLogin = styled.div`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  > div h2 {
    width: 100%;
  }

  > div form {
    width: 100%;
    > button {
      width: 100%;
      max-width: 150px;
      height: 30px;
    }
  }

  > div span {
    width: 100%;
  }
`;
