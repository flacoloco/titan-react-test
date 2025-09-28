import styled from 'styled-components';

const cardWidth = window.innerWidth / 6;
const cardMargin = 16;
const totalCardWidth = cardWidth + cardMargin;

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
  left: ${({ $selectedIndex }): string => (`${($selectedIndex * -totalCardWidth) + 150}px`)};
  transition: left 0.3s ease-in-out;
  top: 20px;
  height: 480px;
  gap: 16px;
`;

export const StyledMovieCard = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  position: relative;
  width: ${cardWidth}px;
  gap: 16px;
`;

export const StyledMovieImageContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${cardWidth}px;
  height: ${cardWidth * 1.5}px;
`;

export const StyledMImage = styled.img<{ $isSelected: boolean }>`
  width: 100%;
  scale: ${({ $isSelected }): string => ($isSelected ? '1' : '.8')};
  height: auto;
  border-radius: 16px;
  box-shadow: ${({ $isSelected }): string => ($isSelected ? '0px 0px 15px 4px rgba(71, 165, 216, 0.38)' : 'none')};
  transition: scale 0.3s ease-in-out;
  will-change: transform;
  filter: ${({ $isSelected }): string => ($isSelected ? 'grayscale(0%)' : 'grayscale(70%)')};
`;

export const StyledMovieTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  text-align: left;
  width: max-content;
`;

