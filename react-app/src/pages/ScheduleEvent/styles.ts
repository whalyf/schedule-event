import styled from 'styled-components';

export const WraperScheduleEvent = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .picker {
    padding: 1rem;
    border-radius: 1rem;
    height: 350px;
    width: 350px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(70, 70, 70, 0.58);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(70, 70, 70, 0.3);
  }
`;
export const ListEvents = styled.div`
  padding: 10px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
  max-height: 500px;

  .card div button {
    border: none;
    background: transparent;
    padding: 5px;
    cursor: pointer;
    position: absolute;
    &.edit {
      top: 0;
      left: 0;
    }
    &.delete {
      top: 0;
      right: 0;
    }
  }
  .dates {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    max-height: 75%;
  }
`;
