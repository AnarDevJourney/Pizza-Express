// Formats the given date-time string into a localized date-time format.
export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  
  // Format the date object into a localized date-time format for Turkish locale (tr-TR).
  const formattedDate = date.toLocaleString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  
  return formattedDate;
}

// Calculates the remaining time until the target date-time.
export function calculateRemainingTime(targetDateTimeString) {
  const targetDate = new Date(targetDateTimeString);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds between the current date and the target date.
  const difference = targetDate - currentDate;

  // Convert milliseconds difference to minutes.
  const minutesRemaining = Math.floor(difference / (1000 * 60));

  // Calculate hours and minutes from the remaining minutes.
  const hours = Math.floor(minutesRemaining / 60);
  const minutes = minutesRemaining % 60;

  let remainingTime = "";

  // Build the remaining time string in the format "X hours Y minutes" if applicable.
  if (hours > 0) {
    remainingTime += `${hours} hour `;
  }

  if (minutes > 0) {
    remainingTime += `${minutes} minute`;
  }

  return remainingTime.trim();
}

// Formats the given value into a currency string.
export function formatCurrency(value) {
  // Format the provided numeric value into a Euro currency string.
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
