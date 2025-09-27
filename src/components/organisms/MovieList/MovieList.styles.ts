import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

export const StyledMovieCard = styled.div<{ isSelected: boolean }>`
  border: 2px solid ${({ isSelected }): string => (isSelected ? 'blue' : 'transparent')};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: blue;
  }
`;

export const StyledMovieImage = styled.img`
  width: 100%;
  height: auto;
`;

export const StyledMovieInfo = styled.div`
  padding: 8px;
`;

export const StyledMovieTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

export const StyledMovieId = styled.p`
  font-size: 0.9rem;
  color: gray;
`;
