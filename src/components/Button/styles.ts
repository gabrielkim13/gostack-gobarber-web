import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  height: 56px;
  background: #ff9000;
  border-radius: 10px;
  border: 0px;
  padding: 0 16px;
  font-weight: 500;
  color: #312e38;
  margin-top: 16px;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
