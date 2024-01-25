import styled from 'styled-components';

export const WrapperHeader = styled.div`
  display: flex;
  background-color: #ddd;
  height: 40px;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 1rem;
  position: absolute;

  > button {
    border: none;
    background: transparent;
    cursor: pointer;
    position: absolute;
    &:hover {
      opacity: 0.7;
    }
  }

  @media (max-width: 1200px) {
    position: relative;
  }
`;
