import styled from 'styled-components';

export const WraperScheduleEvent = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  width: 70%;

  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* > div {
    background-color: #deb887;
  } */
`;
