import styled from "styled-components";

export const BoardContainer = styled.div<{ size: string | number }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0;
`;
