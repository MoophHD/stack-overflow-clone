import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Logo = () => (
  <Container>
    <Icon />
  </Container>
);

const Container = styled.div`
  background-color: white;
  box-shadow: var(--bs-small);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(FontAwesomeIcon).attrs({
  icon: faCheck,
})`
  font-size: 1.5rem;
  color: var(--color-text-dark);
`;

export default Logo;
