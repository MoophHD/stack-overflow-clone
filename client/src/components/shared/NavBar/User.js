import styled from "styled-components";
import Avatar from "components/shared/Avatar";

const User = ({ firstName, lastName }) => (
  <Container>
    <Avatar initials={`${firstName[0]}${lastName[0]}`} />

    <Name>
      {firstName} {lastName}
    </Name>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: baseline;
`;

const Name = styled.span`
  color: var(--color-main);
`;

export default User;
