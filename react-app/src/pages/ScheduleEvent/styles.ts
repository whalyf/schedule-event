import styled, { css } from 'styled-components';

const scrollbarThin = css`
  &::-webkit-scrollbar-track {
    background-color: #ddd;
  }

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
  }

  scrollbar-color: rgba(0, 0, 0, 0.25) rgba(0, 0, 0, 0.15);
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
`;

export const WraperScheduleEvent = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  width: 70%;

  .edit-event-date{
    right: 49%;
  }

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
export const ListEvents = styled.div`
  padding: 10px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
  max-height: 500px;
  ${scrollbarThin}

  .card {
    width: 100%;
    max-width: 300px;
    height: 150px;
  }

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
