import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button, Page } from "components/shared/lib";
import Field from "components/shared/Field";
import FieldArea from "components/shared/FieldArea";
import { createQuestion } from "redux/questions/questions.actions";
import Tag from "components/shared/Tag";

const CreateQuestion = ({ createQuestion }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  return (
    <Page>
      <Heading>Ask a public question</Heading>
      <QuestionBody>
        <Field
          light
          shadow
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder={
            "e.g. Is there an R function for finding the index of an element in a vector?"
          }
        />

        <FieldArea
          light
          shadow
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <Field
          light
          shadow
          label="Tags"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
          placeholder={"e.g. javascript frontend react"}
        />

        <TagContainer>
          {tags.length > 0 ? (
            tags.split(" ").map((tag, i) => (
              <Tag key={`${tag}${i}`} light>
                {tag}
              </Tag>
            ))
          ) : (
            <Comment>Preview of your tags will appear here</Comment>
          )}
        </TagContainer>
      </QuestionBody>

      <SubmitButton
        onClick={() => createQuestion(title, description, tags.split(" "))}
        primary
      >
        Submit your question
      </SubmitButton>
    </Page>
  );
};

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SubmitButton = styled(Button)`
  max-width: 14rem;
  align-self: center;
`;

const QuestionBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-plain);
  padding: 1.5rem;
  border-radius: var(--br-main);
  box-shadow: var(--bs-main);
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  font-size: var(--fs-large);
`;

const Comment = styled.span`
  font-size: var(--fs-small);
  color: var(--color-text-gray);
  min-height: 1.5rem;
`;

export default connect(null, { createQuestion })(CreateQuestion);
