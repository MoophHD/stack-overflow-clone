import styled from "styled-components";
import Avatar from "../../../../components/Avatar/Avatar.component";

const PersonalInfo = ({
  firstName,
  lastName,
  email,
  jobExperience,
  jobPosition,
  techStack,
  nickName,
}) => (
  <Container>
    <Avatar large>{`${firstName[0]}${lastName[0]}`}</Avatar>

    <TextContainer>
      <NameRow>
        <Name>{`${firstName} ${lastName}`}</Name>
        {nickName && <NickName>{nickName}</NickName>}
      </NameRow>

      <Text>
        Contact: <AccentText>{email}</AccentText>
      </Text>
      {jobExperience && (
        <Text>
          Job Experience: <AccentText>{jobExperience}</AccentText>
        </Text>
      )}
      {jobPosition && (
        <Text>
          Current Job Position: <AccentText>{jobPosition}</AccentText>
        </Text>
      )}
      {techStack && (
        <Text>
          Favourite Tech: <AccentText>{techStack}</AccentText>
        </Text>
      )}
    </TextContainer>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NameRow = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 0.75rem;
`;

const Name = styled.h2`
  letter-spacing: -0.05rem;
  margin: 0;
`;

const NickName = styled.span`
  margin-left: 0.5rem;
  color: var(--coror-text-gray);
  font-size: var(--fs-small);
  border-radius: var(--br);
  background-color: var(--color-plain);
  padding: 0.25rem 0.5rem;
`;

const Text = styled.span`
  margin-bottom: 0.15rem;
  font-size: var(--fs-small);
`;

const AccentText = styled(Text)`
  font-weight: bold;
  font-size: var(--fs-med);
`;

export default PersonalInfo;
