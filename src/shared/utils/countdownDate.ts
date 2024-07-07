// Update the count down every 1 second
export const countdownDate = function () {
  // Set the date we're counting down to

  var date = new Date("Jul 7, 2024 18:18:25").getTime();

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = date - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  hours = hours < 10 ? hours : hours

  // Output the result in an element with id="demo"
  let counter = days + " days " + hours + "h : " + minutes + "m : " + seconds + "s"; 

  return counter;
};
