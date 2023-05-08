import styled, { css } from "styled-components";

interface Props {
  center?: boolean;
  scrollable?: boolean;
}

export default styled.div<Props>`
  display: flex;
  flex-direction: column;
  ${({ center }) =>
    center &&
    css`
      align-items: center;
    `}
  ${({ scrollable: scroll }) =>
    scroll &&
    css`
      overflow: auto;
    `}
`;