import styled, { css } from "styled-components";
import Signature from "components/shared/Signature";
import { Container, Heading } from "components/shared/lib";
import Vote from "./Vote";
import BestMark from "./BestMark";

const Post = ({
  firstName,
  lastName,
  userScore,
  userId,
  title,
  text,
  score,
  onUpvote,
  onDownvote,
  isBest,
  onMarkBest,
  canMark,
  isUpvotedByMe,
  ...props
}) => {
  return (
    <PostContainer {...props} isBest={isBest}>
      <Layout left>
        <Vote
          score={score}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
          isUpvoted={isUpvotedByMe}
        />
        {(isBest || canMark) && (
          <BestMark
            isBest={isBest}
            onClick={() => {
              if (canMark) onMarkBest();
            }}
          />
        )}
      </Layout>

      <Layout right>
        {title && <Heading>{title}</Heading>}
        <Text>{text}</Text>
        <SignatureWrapper>
          <Signature
            userId={userId}
            firstName={firstName}
            lastName={lastName}
            score={userScore}
          />
        </SignatureWrapper>
      </Layout>
    </PostContainer>
  );
};

const PostContainer = styled(Container)`
  flex-direction: row;

  ${(props) =>
    props.isBest &&
    css`
      border: 2px solid var(--color-main);
    `}
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.left &&
    css`
      padding-right: 1.5rem;
    `}

  ${(props) =>
    props.right &&
    css`
      flex: 1;
    `}
`;

const Text = styled.p`
  flex: 1;
  margin: 0;
`;

const SignatureWrapper = styled.div`
  align-self: flex-end;
`;

export default Post;
