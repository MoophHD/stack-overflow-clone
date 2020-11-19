import styled from "styled-components";
import Avatar from "../../../../components/Avatar/Avatar.component";

const PersonalInfo = ({
  firstName,
  lastName,
  email,
  jobExperience,
  jobPosition,
  techStack,
}) => (
  <Container>
    <Avatar large>{`${firstName[0]}${lastName[0]}`}</Avatar>

    <TextContainer>
      <Name>{`${firstName} ${lastName}`}</Name>

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

const Name = styled.h2`
  letter-spacing: -0.05rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
  line-height: 1.25rem;
`;

const Text = styled.span`
  margin-bottom: 0.15rem;
  font-size: 0.875rem;
`;

const AccentText = styled(Text)`
  font-weight: bold;
  font-size: 1rem;
`;

export default PersonalInfo;
