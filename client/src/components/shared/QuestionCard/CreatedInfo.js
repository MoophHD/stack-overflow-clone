import styled from "styled-components";
import { StyledLink } from "components/shared/lib";

const CreatedInfo = ({ name, id, createdAt }) => (
  <Container>
    {id && (
      <Text>
        Asked by <AuthorLink to={`/user/${id}`}>{name}</AuthorLink>
      </Text>
    )}

    <Text>Created At {createdAt}</Text>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
`;

const Text = styled.span`
  font-size: var(--fs-small);
`;

const AuthorLink = styled(StyledLink)`
  font-weight: bold;
`;

export default CreatedInfo;
