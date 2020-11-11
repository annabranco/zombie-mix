import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const SoundsSelectorArea = styled.div`
  margin-top: ${({ subSections }) => (subSections ? `-16px` : '0')};
  height: ${({ subSections }) =>
    subSections ? `${90 / subSections}vh` : '90vh'};
  width: 87%;
  background: #232222;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: minmax(80px, 200px);
  grid-gap: 5px;
  padding: 40px 20px;
  overflow: hidden;
  ${({ columns }) => {
    if (columns === 'big') {
      return css`
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      `;
    }
    return css`
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    `;
  }}
`;

export const SubSectionTitle = styled.h3`
  position: relative;
  hbeight: 0;
  left: 0;
  transform: translate(0, 15px);
  color: white;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid gray; */
  border-radius: 5px;
`;

export const PlayButton = styled.button`
  background: ${({ isActive }) => (isActive ? 'yellow' : '#232222')};
  outline: none;
  border: none;
  height: 100%;
  width: 100%;
  padding: 10px;
  font-size: 1.3rem;
  font-weight: 900;
  color: black;
  text-shadow: 1px 1px 4px gray;
  cursor: pointer;
  transition: background ease 1.5s;
`;

export const PlayIcon = styled.img`
  max-height: 100%;
  max-width: 100%;
  transition: transform ease 0.5s;

  &:hover {
    transform: scale(1.6);
    transition: all ease 0.8s;
  }

  ${({ grid }) =>
    grid &&
    css`
      width: 50%;
    `}
`;
