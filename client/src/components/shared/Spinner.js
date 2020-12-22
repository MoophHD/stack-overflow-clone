import styled, { keyframes, css } from "styled-components";

const Spinner = ({light}) => (
  <Center role="alert" aria-label="loading">
    <Loading light={light} />
  </Center>
);

const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  border: 1rem solid #f3f3f3;
  border-top: 1rem solid var(--color-main);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  animation: ${rotate} 2s linear infinite;
  
  ${props => props.light && css`
    border-left-color: white;
    border-right-color: white;
    border-bottom-color: white;
  `}
`;

export default Spinner;
