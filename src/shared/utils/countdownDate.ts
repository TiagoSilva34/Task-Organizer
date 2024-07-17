
// Update the count down every 1 second
export const countdownDate = function (endDate: any) {  
  // // Get today's date and time
  // var now = new Date().getTime();

  let day = endDate.slice(0, 2)
  let month = endDate.slice(3, 5)
  let year = endDate.slice(6, 10)
  const formattedate = new Date(`${month}/${day}/${year}`).getTime()

  // // Find the distance between now and the count down date
  // var distance = formattedate - now;

  // // Time calculations for days, hours, minutes and seconds
  // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60));
  // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  // var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // // Output the result in an element with id="demo"
  // let counter = hours + "h : " + minutes + "m : " + seconds + "s"; 

  // return counter

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
 
 let teste = `${totalHours}:${remMinutes}:${remSeconds}`;

 return teste

};
