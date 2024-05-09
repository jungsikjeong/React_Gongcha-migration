import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div``;

const SearchIcon = styled.div<{ $isopen: string }>`
  position: relative;
  transform: ${({ $isopen }) =>
    $isopen ? ' translateX(100px)' : ' translateX(0)'};
  z-index: 2;
  width: 35px;
  height: 35px;
  border-radius: 100px;
  color: ${({ $isopen }) =>
    $isopen ? 'rgb(245, 245, 245)' : 'rgb(54, 54, 54)'};
  background-color: ${({ $isopen }) => ($isopen ? 'black' : '#fff')};
  box-shadow: ${({ $isopen }) =>
    $isopen ? '-6px 0px 8px 0px rgba(0, 0, 0, 0.86)' : '0 0 10px white'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.2s ease;
  cursor: pointer;
`;

const Input = styled.input<{ $isopen: string }>`
  position: absolute;
  top: 10px;
  opacity: ${({ $isopen }) => ($isopen ? '1' : '0')};
  border-radius: 10px;
  border: none;
  outline: none;
  width: 120px;
  width: ${({ $isopen }) => ($isopen ? '120px' : '0px')};
  padding: 0.3rem 2rem 0.3rem 0.8rem;
  min-height: 30px;
  box-shadow: 0 0 10px white;
  transition: all 0.2s ease;

  @media (max-width: 1024px) {
    top: 4px;
  }
`;

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Input 열림/닫힘 상태

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <SearchIcon onClick={toggleSearch} $isopen={isOpen ? 'true' : ''}>
        <FaSearch />
      </SearchIcon>
      <Input
        type='text'
        $isopen={isOpen ? 'true' : ''}
        placeholder='Search..'
      />
    </Container>
  );
};

export default SearchBar;
