import styled from "styled-components";

export const BoardContainer = styled.div<{
  size: string | number;
  blackOut?: boolean;
}>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0;
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    content: "";
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2;
    display: ${({ blackOut }) => (blackOut ? "block" : "none")};
  }
`;
