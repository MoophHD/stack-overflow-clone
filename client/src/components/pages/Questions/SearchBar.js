import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "components/shared/lib";

const SearchBar = ({ onSubmit, value, setValue }) => {
  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <Container>
      <SearchButton aria-label="search" onClick={handleSubmit}>
        <SearchIcon />
      </SearchButton>
      <SearchInput
        aria-label="search"
        placeholder={"Search for a question..."}
        onKeyUp={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></SearchInput>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  position: relative;
`;

const SearchInput = styled(Input)`
  padding-left: 3rem;
`;

const SearchButton = styled.button`
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
`;

const SearchIcon = styled(FontAwesomeIcon).attrs({
  icon: faSearch,
})`
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--color-text-dark);
  position: absolute;
  left: 0.5rem;
`;

export default SearchBar;
