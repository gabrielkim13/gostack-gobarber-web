import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
`;

export const Header = styled.div`
  padding: 64px 162px;

  background: #28262e;

  a {
    color: #999591;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#999591')};
    }

    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 340px;

  margin: -92px auto 0px auto;

  form {
    margin-top: 32px;
    width: 340px;

    h1 {
      font-size: 20px;
      font-weight: 500;

      margin-bottom: 24px;
    }

    > div {
      &:last-of-type {
        margin: 24px 0;
      }
    }

    button {
      margin: 0;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;

  img {
    width: 186px;
    height: 186px;

    border: 0;
    border-radius: 50%;

    object-fit: cover;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;

    bottom: 0;
    right: 0;

    width: 48px;
    height: 48px;

    border: 0;
    border-radius: 50%;

    background: #ff9900;

    transition: background-color 0.2s;

    cursor: pointer;

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }

    svg {
      width: 18px;
      height: 18px;
      color: #312e38;
    }

    input {
      display: none;
    }
  }
`;
