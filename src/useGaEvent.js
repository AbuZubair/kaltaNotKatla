import ReactGA from "react-ga4";

const sendEvent = (e) => {
  let event;
  if (!isNaN(e)) {
    switch (e) {
      case 0:
        event = "first_row_attempt";
        break;
      case 1:
        event = "second_row_attempts";
        break;
      case 2:
        event = "third_row_attempts";
        break;
      case 3:
        event = "fourth_row_attempts";
        break;
      case 4:
        event = "fifth_row_attempts";
        break;
      case 5:
        event = "sixth_row_attempts";
        break;
      default:
        break;
    }
  } else {
    event = e;
  }
  ReactGA.event(event);
};

export default sendEvent;