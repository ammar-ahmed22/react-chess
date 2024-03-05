import styled from "styled-components";

export const Square = styled.div<{
  size: string | number;
  bg: string;
  color?: string;
}>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  box-sizing: border-box;
  font-size: 9px;
  background-color: ${(props) => props.bg};
  color: ${(props) => (props.color ? props.color : "inherit")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const PieceImage = styled.img<{ size?: string }>`
  width: ${({ size }) => size ?? "80%"};
  height: ${({ size }) => size ?? "80%"};
`;

export const Coordinate = styled.div<{
  color: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}>`
  position: absolute;
  margin: 0;
  padding; 0;  
  color: ${(props) => props.color};
  top: ${(props) => (props.top ? props.top : "unset")};
  left: ${(props) => (props.left ? props.left : "unset")};
  right: ${(props) => (props.right ? props.right : "unset")};
  bottom: ${(props) => (props.bottom ? props.bottom : "unset")};
  font-weight: bold;
  font-size: 0.75rem;
`;

export const Identifier = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 25%;
  width: 25%;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PromotionModal = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 150%;
  height: 150%;
  

  img {
    opacity: 0.8;
    transform: scale(0.9);
    border-radius: 10%;
  }

  img:hover {
    opacity: 1;
    transform: scale(1);
  }
`