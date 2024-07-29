
// Update the count down every 1 second
export const countdownDate = function (endDate: any) { 
  let day = endDate.slice(0, 2)
  let month = endDate.slice(3, 5)
  let year = endDate.slice(6, 10)
  const formattedate = new Date(`${month}/${day}/${year}`).getTime()

  const firstDate: Date = new Date();
 
// Current Date
const secondDate: Date = new Date(formattedate);
 
// Time Difference in Milliseconds
const milliDiff: number = Math.abs(firstDate.getTime()
    - secondDate.getTime());
 
// Converting time into hh:mm:ss format
 
// Total number of seconds in the difference
const totalSeconds = Math.floor(milliDiff / 1000);
 
// Total number of minutes in the difference
const totalMinutes = Math.floor(totalSeconds / 60);
 
// Total number of hours in the difference
const totalHours = Math.floor(totalMinutes / 60);
 
// Getting the number of seconds left in one minute
const remSeconds = totalSeconds % 60;
 
// Getting the number of minutes left in one hour
const remMinutes = Number(totalMinutes) % 60;
 
 let counter = `${totalHours}hrs : ${remMinutes}m : ${remSeconds}s`;

 return counter

};
