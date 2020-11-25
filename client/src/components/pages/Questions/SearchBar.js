import { useState } from "react";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "components/shared/lib";

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <Container>
      <SearchIcon onClick={handleSubmit} />
      <SearchInput
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
