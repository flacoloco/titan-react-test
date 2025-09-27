import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
  width: 100vw;
  overflow-x: hidden;
`;

export const StyledMovieList = styled.div<{ $selectedIndex: number }>`
  display: flex;
  position: relative;
  left: ${({ $selectedIndex }): string => (`-${$selectedIndex * 254}px`)};
  transition: left 0.3s ease-in-out;
  top: 0;
`;

export const StyledMovieCard = styled.div<{ $isSelected: boolean }>`
  border: 2px solid ${({ $isSelected }): string => ($isSelected ? 'blue' : 'transparent')};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;
  width: 250px;
`;

export const StyledMovieImage = styled.div<{ $backgroundImage: string, $isSelected: boolean }>`
  width: 100%;
  height: 300px;
  background-image: url(${({ $backgroundImage }): string => $backgroundImage});
  background-size: ${({ $isSelected }): string => ($isSelected ? '75%' : '65%')};
  background-position: center;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease-in-out;
`;

export const StyledMovieTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  text-align: center;
`;

