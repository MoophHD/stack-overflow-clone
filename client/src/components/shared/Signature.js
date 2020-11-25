import styled from "styled-components";
import { StyledLink } from "components/shared/lib";
import Avatar from "components/shared/Avatar";

const Signature = ({ firstName, lastName, score, userId }) => (
  <Container>
    <Avatar initials={`${firstName[0]}${lastName[0]}`} />
    <ColContainer>
      <Name href={`/users/${userId}`}>{`${firstName} ${lastName}`}</Name>
      <Score>score: {score}</Score>
    </ColContainer>
  </Container>
);

const Container = styled.div`
  display: flex;
`;

const ColContainer = styled.div`
  margin-left: 0.25rem;
  display: flex;
  flex-direction: column;
`;

const Score = styled.span`
  color: var(--color-text-gray);
  align-self: flex-end;
  font-size: var(--fs-small);
`;

const Name = styled(StyledLink)``;

export default Signature;
