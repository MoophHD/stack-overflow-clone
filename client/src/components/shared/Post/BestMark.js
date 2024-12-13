import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const BestMark = ({ isBest, onClick }) => (
  <Container chosen={isBest} onClick={onClick}>
    <Icon />
  </Container>
);

const Container = styled.div.attrs(() => ({
  role: "button",
  tabIndex: 0,
}))`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-top: 1rem;
  box-shadow: var(--bs-small);
  cursor: pointer;

  ${(props) =>
    props.chosen &&
    css`
      background-color: var(--color-main);
      color: white;
    `}
`;

const Icon = styled(FontAwesomeIcon).attrs({
  icon: faCheck,
})`
  font-size: 1.5rem;
`;

export default BestMark;
