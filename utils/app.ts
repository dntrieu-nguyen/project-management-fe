export const setColorStatus = (value: string) => {
  switch (value) {
    case "pending":
      return "blue";
    case "in-process":
      return "purple";
    case "completed":
      return "green";
    case "cancel":
      return "red";
    case "close":
      return "gray";
    default:
      break;
  }
};

export const setTitle = (value: string) => {
  switch (value) {
    case "pending":
      return "Pending";
    case "in-process":
      return "In Process";
    case "completed":
      return "Completed";
    case "cancel":
      return "Cancel";
    case "close":
      return "Close";
    default:
      break;
  }
};

// check startdate and due date
export const checkDate = (start: string, end: string) => {
  const start_date = new Date(start);
  const end_date = new Date(end);
  const now = new Date();
  if (now < start_date) {
    return "pending";
  } else if (now >= start_date && now <= end_date) {
    return "in-process";
  } else {
    return "completed";
  }
};
