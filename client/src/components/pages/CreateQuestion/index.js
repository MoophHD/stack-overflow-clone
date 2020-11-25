import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Input } from "components/shared/lib";
import { Button, TextArea } from "components/shared/lib";
import { createQuestion } from "redux/questions/questions.actions";

const CreateQuestion = ({ createQuestion }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Wrapper>
      <Container>
        <Heading>Ask a public question</Heading>
        <QuestionBody>
          <Label>Title</Label>
          <StyledInput
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder={
              "e.g. Is there an R function for finding the index of an element in a vector?"
            }
          />

          <Label>Description</Label>
          <TextArea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </QuestionBody>

        <SubmitButton
          onClick={() => createQuestion(title, description)}
          primary
        >
          Submit your question
        </SubmitButton>
      </Container>
    </Wrapper>
  );
};

const SubmitButton = styled(Button)`
  max-width: 14rem;
  align-self: center;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const QuestionBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: var(--color-plain);
  padding: 1.5rem;
  border-radius: var(--br-main);
  box-shadow: var(--bs-main);
  margin-bottom: 1rem;
`;

const StyledInput = styled(Input)`
  background-color: white;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
  flex: 1;
  padding: 2% 2rem;
`;

const Heading = styled.h2`
  font-size: var(--fs-large);
`;

export default connect(null, { createQuestion })(CreateQuestion);
