import flatpickr from 'flatpickr';
// Import additional css styles
import 'flatpickr/dist/flatpickr.min.css';
const selector = document.querySelector("#datetime-picker");
const button = document.querySelector("button");
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (options.defaultDate > selectedDates[0]) {
        button.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
      }
      else{
        button.disabled = false; 
        const interval = setInterval(()=>{ 
            const date = new Date(selectedDates[0]);
            const dateMs = date - new Date();  
            if ( dateMs <= 0) {
                clearInterval(interval);
            }else{

                const {days,hours,minutes,seconds} = convertMs(dateMs);
                document.querySelector('span[data-days]').textContent = addLeadingZero(days);
                document.querySelector('span[data-hours]').textContent = addLeadingZero(hours);
                document.querySelector('span[data-minutes]').textContent = addLeadingZero(minutes);
                document.querySelector('span[data-seconds]').textContent = addLeadingZero(seconds);
            }
        
        function convertMs(ms) {
                // Number of milliseconds per unit of time
                const second = 1000;
                const minute = second * 60;
                const hour = minute * 60;
                const day = hour * 24;
              
                // Remaining days
                const days = Math.floor(ms / day);
                // Remaining hours
                const hours = Math.floor((ms % day) / hour);
                // Remaining minutes
                const minutes = Math.floor(((ms % day) % hour) / minute);
                // Remaining seconds
                const seconds = Math.floor((((ms % day) % hour) % minute) / second);
              
                return { days, hours, minutes, seconds };
              }
              function addLeadingZero(value){
                return `${value}`.padStart(2, 0);
              }
            },1000);
      }
      
    },
  }
     flatpickr(selector, options);
  
 



