import styled from "styled-components";
import { Link } from "react-router-dom";

const AuthorRow = ({ name, id }) => (
  <Container>
    <Text>
      Asked by <AuthorLink to={`/users/${id}`}>{name}</AuthorLink>
    </Text>
  </Container>
);

const Container = styled.div`
  font-size: 1rem;
`;

const Text = styled.span`
font-size: 0.8rem;
`;

const AuthorLink = styled(Link)`
  color: var(--color-text-link);
  text-decoration: none;
  font-weight: bold;
`;

export default AuthorRow;
