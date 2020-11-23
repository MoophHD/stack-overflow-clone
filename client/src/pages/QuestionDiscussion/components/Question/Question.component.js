import styled from "styled-components";
import Avatar from "../../../../components/Avatar/Avatar.component";
import VoteBlock from "../VoteBlock/VoteBlock.component";

const Question = ({ author, score, title, text, loading }) => (
  <Container>
    <Left>
      <VoteBlock />
    </Left>

    <Right>
      <Title>{title}</Title>
      <Description>{text}</Description>
      <UserBlock>
        <Avatar>{`${author.firstName[0]}${author.lastName[0]}`}</Avatar>
        <UserCol>
          <Name>{`${author.firstName} ${author.lastName}`}</Name>
          <Score>score: {score}</Score>
        </UserCol>
      </UserBlock>
    </Right>
  </Container>
);

const Container = styled.div`
  display: flex;

  border-radius: var(--br);
  background-color: white;
  padding: 1rem 1.5rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

const Right = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
`;

const Title = styled.h2`
  margin: 0;
`;

const Description = styled.p`
  margin: 1.5rem 0 1rem;
`;

const Name = styled.span``;

const Score = styled.span`
  color: var(--color-text-gray);
  align-self: flex-end;
  font-size: var(--fs-small);
`;

const UserBlock = styled.div`
  align-self: flex-end;
  display: flex;
`;

const UserCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Question;