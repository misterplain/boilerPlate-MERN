export const formatDate = (dateString, partDate) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const timeOptions = { hour: "numeric", minute: "numeric" };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    const suffix = getSuffix(date.getDate());
    if (partDate === "partDate") {
      return `${formattedDate}`;
    }
    return `${formattedDate} at ${formattedTime}`;
  };
  
  function getSuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  