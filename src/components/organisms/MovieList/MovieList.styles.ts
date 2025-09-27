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
  left: ${({ $selectedIndex }): string => (`${($selectedIndex * -280) + 150}px`)};
  transition: left 0.3s ease-in-out;
  top: 20px;
  height: 440px;
`;

export const StyledMovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
`;

export const StyledMovieImageContainer = styled.div<{ $isSelected: boolean }>`
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;
  width: 280px;
  height: 352px;
  padding: 16px 0;
  box-shadow: ${({ $isSelected }): string => ($isSelected ? '0px 0px 15px 4px rgba(109,192,255,0.38)' : 'none')};
`;

export const StyledMovieImage = styled.div<{ $backgroundImage: string, $isSelected: boolean }>`
  width: 100%;
  height: 320px;
  background-image: url(${({ $backgroundImage }): string => $backgroundImage});
  background-size: ${({ $isSelected }): string => ($isSelected ? '75%' : '65%')};
  background-position: center;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease-in-out;
  filter: ${({ $isSelected }): string => ($isSelected ? 'none' : 'grayscale(50%)')};
`;

export const StyledMovieTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  text-align: left;
  width: max-content;
  position: absolute;
  bottom: 25px;
  left: 16px;
`;

