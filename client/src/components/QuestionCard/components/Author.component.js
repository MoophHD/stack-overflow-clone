import styled from "styled-components";
import { Link } from "react-router-dom";

const AuthorRow = ({ name, id }) => (
  <Container>
    <Text>
      Asked by <AuthorLink to={`/user/${id}`}>{name}</AuthorLink>
    </Text>
  </Container>
);

const Container = styled.div`
  font-size: var(--fs-med);
`;

const Text = styled.span`
  font-size: var(--fs-small);
`;

const AuthorLink = styled(Link)`
  color: var(--color-text-link);
  text-decoration: none;
  font-weight: bold;
`;

export default AuthorRow;
