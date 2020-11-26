import styled, { keyframes } from "styled-components";
import { Container } from "components/shared/lib";

const TOAST_TIMEOUT = 3000;
const TOAST_FADE_IN = 500;
const TOAST_FADE_OUT = 500;
const TOAST_STAY = TOAST_TIMEOUT - TOAST_FADE_IN - TOAST_FADE_OUT;

const Toast = ({ type, text, onRemove }) => {
  setTimeout(onRemove, TOAST_TIMEOUT);

  return (
    <ToastBackground shadow>
      <Text>{text}</Text>
    </ToastBackground>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const ToastBackground = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-danger);
  color: white;
  padding: 1rem 0.5rem;
  margin-bottom: 1rem;

  opacity: 1;
  animation: ${fadeIn} ${TOAST_FADE_IN}ms,
    ${fadeOut} ${TOAST_FADE_OUT}ms forwards ${TOAST_STAY}ms;
`;

const Text = styled.p`
  margin: 0;
  font-size: var(--fs-med);
`;

export default Toast;
