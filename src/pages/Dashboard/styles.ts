import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.div`
  background: #28262e;

  padding: 32px;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;

  margin: 0 auto;

  max-width: 1120px;

  > img {
    height: 80px;

    margin-right: 80px;
  }

  button {
    width: 50px;
    height: 50px;

    color: #999591;
    background: #28262e;

    border: 0;
    border-radius: 8px;

    margin-left: auto;
    margin-right: -16px;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#28262e')};
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 56px;
    height: 56px;

    object-fit: cover;

    border: 0;
    border-radius: 50%;

    margin-right: 16px;
  }

  div {
    display: flex;
    flex-direction: column;

    line-height: 26px;

    span {
      color: #999591;
    }

    a {
      color: #ff9000;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#ff9900')};
      }

      strong {
        font-weight: 500;
      }
    }
  }
`;

export const Content = styled.main`
  display: flex;

  max-width: 1120px;

  margin: 64px auto;
`;

export const Schedule = styled.div`
  flex: 1;

  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    display: flex;

    margin-top: 8px;

    color: #ff9000;
    font-weight: 500;

    span + span {
      display: flex;
      align-items: center;

      &::before {
        content: '';

        width: 1px;
        height: 12px;
        background: #ff9000;

        margin: 0 8px;
      }
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong {
    color: #999591;

    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
  }

  div {
    position: relative;

    display: flex;
    align-items: center;

    background: #3e3b47;

    padding: 16px 24px;

    border: 0;
    border-radius: 10px;

    margin-top: 24px;

    &::before {
      position: absolute;
      left: 0;

      content: '';

      width: 2px;
      height: 80px;

      background: #f99900;
    }

    img {
      width: 80px;
      height: 80px;

      border: 0;
      border-radius: 50%;

      object-fit: cover;

      margin-right: 24px;
    }

    strong {
      font-size: 24px;
      font-weight: 500;

      color: #f4ede8;
    }

    span {
      display: flex;
      align-items: center;

      font-size: 20px;

      color: #999591;

      svg {
        width: 20px;
        height: 20px;

        color: #f99900;

        margin-right: 12px;
      }

      margin-left: auto;
    }
  }
`;

export const Section = styled.section`
  display: block;

  color: #999591;
  font-size: 20px;
  line-height: 26px;

  margin-top: 48px;

  hr {
    border: 0;
    height: 1px;
    background: #3e3b47;

    margin-top: 16px;
  }

  p {
    font-size: 16px;
    font-weight: 400;

    color: #666360;
  }
`;

export const Appointment = styled.div`
  display: flex;

  margin-top: 24px;

  & + div {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;

    width: 72px;

    color: #f4ede8;

    margin-right: 26px;

    svg {
      width: 16px;
      height: 16px;

      color: #ff9900;

      margin-right: 12px;
    }
  }

  div {
    display: flex;
    flex: 1;
    align-items: center;

    padding: 16px;

    border: 0;
    border-radius: 10px;

    background: #3e3b47;

    img {
      width: 80px;
      height: 80px;

      border: 0;
      border-radius: 50%;

      object-fit: cover;

      margin-right: 16px;
    }

    strong {
      font-size: 20px;
      font-weight: 500;
      line-height: 26px;

      color: #f4ede8;
    }
  }
`;

export const Calendar = styled.aside`
  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
