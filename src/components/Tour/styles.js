import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { BOTTOM, CENTER, LEFT, RIGHT, TOP } from '../../constants';
import { ModalMessage } from '../SetupModal/styles';

export const InstructionsArrow = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  &::before {
    position: absolute;
    font-size: 3rem;
    color: red;
  }

  ${({ arrow }) => {
    if (arrow[0] === BOTTOM) {
      if (arrow[1] === CENTER) {
        return css`
          bottom: 0;
          &::before {
            left: 48%;
            bottom: -30px;
            content: '🡇';
          }
        `;
      }
      if (arrow[1] === RIGHT) {
        return css`
          bottom: 0;
          &::before {
            left: 78%;
            bottom: -30px;
            content: '🡇';
          }
        `;
      }
      if (arrow[1] === LEFT) {
        return css`
          bottom: 0;
          &::before {
            left: 18%;
            bottom: -30px;
            content: '🡇';
          }
        `;
      }
    }
    if (arrow[0] === TOP) {
      if (arrow[1] === CENTER) {
        return css`
          top: 0;
          &::before {
            left: 48%;
            top: -30px;
            content: '🡅';
          }
        `;
      }
      if (arrow[1] === RIGHT) {
        return css`
          top: 0;
          &::before {
            left: 80%;
            top: -30px;
            content: '🡅';
          }
        `;
      }
      if (arrow[1] === LEFT) {
        return css`
          top: 0;
          &::before {
            left: 15%;
            top: -30px;
            content: '🡅';
          }
        `;
      }
    }
    if (arrow[0] === RIGHT) {
      if (arrow[1] === CENTER) {
        return css`
          top: 0;
          right: 0;
          &::before {
            top: 42%;
            right: -30px;
            content: '🡆';
          }
        `;
      }
      if (arrow[1] === TOP) {
        return css`
          bottom: 0;
          &::before {
            top: 20%;
            right: -30px;
            content: '🡆';
          }
        `;
      }
      if (arrow[1] === BOTTOM) {
        return css`
          bottom: 0;
          &::before {
            top: 70%;
            right: -30px;
            content: '🡆';
          }
        `;
      }
    }
    if (arrow[0] === LEFT) {
      if (arrow[1] === CENTER) {
        return css`
          bottom: 0;
          &::before {
            top: 42%;
            left: -30px;
            content: '🡄';
          }
        `;
      }
      if (arrow[1] === TOP) {
        return css`
          bottom: 0;
          &::before {
            top: 20%;
            left: -30px;
            content: '🡄';
          }
        `;
      }
      if (arrow[1] === BOTTOM) {
        return css`
          bottom: 0;
          &::before {
            top: 70%;
            left: -30px;
            content: '🡄';
          }
        `;
      }
    }
    return null;
  }};
`;
InstructionsArrow.displayName = 'InstructionsArrow';

export const InstructionsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  border: 2px solid black;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.6);
  top: 0;
  height: auto;
  max-width: 40%;

  ${({ positionX, positionY }) => {
    if (positionX === CENTER && positionY === CENTER) {
      return css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    }
    if (positionX === CENTER) {
      return css`
        top: ${positionY === TOP ? '10%' : 'unset'};
        bottom: ${positionY === BOTTOM ? '15%' : 'unset'};
        left: 50%;
        transform: translate(-50%, 0);
      `;
    }
    if (positionY === CENTER) {
      return css`
        left: ${positionX === LEFT ? '5%' : 'unset'};
        right: ${positionX === RIGHT ? '5%' : 'unset'};
        top: 50%;
        transform: translate(0, -50%);
      `;
    }

    return css`
      left: ${positionX === LEFT ? '5%' : 'unset'};
      right: ${positionX === RIGHT ? '5%' : 'unset'};
      top: ${positionY === TOP ? '10%' : 'unset'};
      bottom: ${positionY === BOTTOM ? '15%' : 'unset'};
    `;
  }};
`;
InstructionsWrapper.displayName = 'InstructionsWrapper';

export const TourText = styled(ModalMessage)`
  width: auto;
  @media all and (min-width: 768px) {
    width: auto;
  }
  @media all and (min-width: 1400px) {
    width: auto;
    margin-top: 0;
  }
`;
TourText.displayName = 'TourText';
