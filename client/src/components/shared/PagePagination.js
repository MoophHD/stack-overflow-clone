import styled from "styled-components";
import { Button } from "components/shared/lib";

const AnswerPagination = ({ page, pageCount, onPageChange }) => (
  <Container>
    {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
      <PaginationItem
        onClick={() => onPageChange(n)}
        light
        primary={n === page}
        key={n}
      >
        {n}
      </PaginationItem>
    ))}
    <PaginationItem
      disabled={page === pageCount}
      onClick={() => {
        if (page !== pageCount) onPageChange(page + 1);
      }}
    >
      Next
    </PaginationItem>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const PaginationItem = styled(Button)`
  margin-right: 0.5rem;
  border: 1px solid var(--color-gray);
`;

export default AnswerPagination;
