// Function for formating date
export function formatDate(dateString) {
  const date = new Date(dateString);

  // Define month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day and month
  const day = date.getDate();
  const month = months[date.getMonth()];

  // Get the hour and minute
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Show 12 instead of 0

  // Format minutes to two digits
  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

  // Construct the final string
  return `${month} ${day}, ${hours}:${minutesFormatted} ${ampm}`;
}

// Function for calculate lefting minutes
export function timeDifferenceInMinutes(dateString) {
  const givenDate = new Date(dateString);
  const now = new Date();

  // Get the difference between the two dates in milliseconds
  const differenceInMillis = now - givenDate;

  // Convert milliseconds to minutes
  const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));

  // Return the result
  return `${differenceInMinutes} minutes`;
}

// Function for validate phone numbers
export function validatePhoneNumber(phoneNumber) {
  const phoneRegex =
    /^(?:\+\d{1,3})?[\s-]?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  return phoneRegex.test(phoneNumber);
}
