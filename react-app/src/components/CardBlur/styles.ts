import styled from 'styled-components';

interface ICardContainer {
  theme?: 'past' | 'happening' | 'upcoming' | 'default';
}

export const CardContainer = styled.div<ICardContainer>`
  padding: 3rem;
  text-align: center;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  background: ${(props) =>
    props.theme === 'past'
      ? 'rgba(255, 0, 0, 0.3)'
      : props.theme === 'happening'
      ? 'rgba(0, 255, 0, 0.3)'
      : props.theme === 'upcoming'
      ? 'rgba(0, 0, 255, 0.3)'
      : 'rgba(20, 18, 201, 0.29)'};

  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid
    ${(props) =>
      props.theme === 'past'
        ? 'rgba(255, 0, 0, 0.3)'
        : props.theme === 'happening'
        ? 'rgba(0, 255, 0, 0.3)'
        : props.theme === 'upcoming'
        ? 'rgba(0, 0, 255, 0.3)'
        : 'rgba(20, 18, 201, 0.3)'};

  h2 {
    color: var(--white);
    font-style: normal;
    font-size: 2rem;
    font-weight: 300;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  span {
    font-size: 0.75rem;
  }
`;
