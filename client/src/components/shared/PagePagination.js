import styled from "styled-components";
import { Button } from "components/shared/lib";

const PagePagination = ({ page, pageCount, onPageChange }) => (
  <Container role="navigation" aria-label="pagination navigation">
    <StyledUl>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <StyledLi key={n}>
          <PaginationItem
            onClick={() => onPageChange(n)}
            light
            primary={n === page}
            aria-label={`Goto page ${n}`}
          >
            {n}
          </PaginationItem>
        </StyledLi>
      ))}
      <PaginationItem
        disabled={page === pageCount}
        onClick={() => {
          if (page !== pageCount) onPageChange(page + 1);
        }}
        aria-label="Goto next page"
      >
        Next
      </PaginationItem>
    </StyledUl>
  </Container>
);

const StyledUl = styled.ul`
  padding: 0;
  list-style: none;
`;

const StyledLi = styled.li`
  display: inline;
`;

const Container = styled.nav`
  display: flex;
  justify-content: center;
`;

const PaginationItem = styled(Button)`
  margin-right: 0.5rem;
  border: 1px solid var(--color-gray);
`;

export default PagePagination;
