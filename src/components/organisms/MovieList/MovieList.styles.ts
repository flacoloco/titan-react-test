import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
  width: 100vw;
  overflow-x: hidden;
`;

export const StyledMovieList = styled.div<{ $selectedIndex?: number | null }>`
  display: flex;
  position: relative;
  left: ${({ $selectedIndex }): string => ($selectedIndex !== null && $selectedIndex !== undefined ? `-${$selectedIndex * 254}px` : '0')};
  transition: left 0.3s ease-in-out;
  top: 0;
`;

export const StyledMovieCard = styled.div<{ $isSelected: boolean }>`
  border: 2px solid ${({ $isSelected }): string => ($isSelected ? 'blue' : 'transparent')};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s;
  width: 250px;
`;

export const StyledMovieImage = styled.img`
  width: 100%;
  height: auto;
`;

export const StyledMovieTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

