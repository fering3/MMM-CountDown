/* global Module */

/* Magic Mirror
 * Module: MMM-CountDown
 *
 * By Joel MacDonald
 * MIT Licensed.
 */

Module.register("MMM-CountDown", {
    // Default module config.
    defaults: {
        keyDate: "2018-03-01 24:00:00", // YYYY-MM-DD HH:MM:SS
        updateInterval: 2,
        toWhat: "Leaving for Paris!",
        timesUp: "death and despair, your time is up.",
		showWeeks: true,
		showMilliseconds: true
    },

    // Define start sequence.
    start: function() {
        var self = this;

        Log.info("Starting module: " + this.name);

        setInterval(function() {
            self.updateDom();
        }, this.config.updateInterval);
    },

    // Define required styles
    getStyles: function () {
        return ["MMM-CountDown.css"];
    },

    // Override dom generator.
    getDom: function() {
		
		// Set the date we're counting down to
			var countDownDate = new Date(this.config.keyDate).getTime();
			
			// Get todays date and time
			var now = new Date().getTime();
			
			// Find the distance between now an the count down date
			var distance = countDownDate - now;
			
			// Time calculations for days, hours, minutes and seconds
			var weeks = Math.floor(distance / (1000 * 60 * 60 * 24*7));
			if (this.config.showWeeks === true)
				var days = Math.floor(distance / (1000 * 60 * 60 * 24))%7;
			else
				var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			var mseconds = Math.floor((distance % (1000)));
			
			// pad to 2 digits
			if (hours < 10)
				hours = "0"+hours;
			if (minutes < 10)
				minutes = "0"+minutes;
			if (seconds < 10)
				seconds = "0"+seconds;
			if (mseconds < 10)
				mseconds = "00"+mseconds;
			else if (mseconds < 100)
				mseconds = "0"+mseconds;
			
			
			
			var wrapper = document.createElement("div");
			var headerD = document.createElement("div");
			headerD.innerHTML = this.config.toWhat;
			headerD.className = "normal medium cdHeader";
			
			var timer = document.createElement("div")
				  // If the count down is over, write some text 
				  
			if (distance < 0) {
				timer.className = "time bright large light cdPast";
				timer.innerHTML = this.config.timesUp;
			}else{
				timer.className = "time bright large light cdTime";
				
				var countDownString;
				if(this.config.showDetail=== true){
					if (this.config.showWeeks === true)
						countDownString = weeks + "w " + days + "d " + hours + "h " + minutes + "m " + seconds;				
					else
						countDownString = days + "d " + hours + "h " + minutes + "m " + seconds;
					
					if (this.config.showMilliseconds===true)
							countDownString = countDownString+ "." +mseconds + "s";
					else
							countDownString = countDownString+ "s";
					timer.innerHTML = countDownString;
				}
				else
				{
					if (this.config.showWeeks === true)
						countDownString = weeks + ":" + days + ":" + hours + ":" + minutes + ":" + seconds;				
					else
						countDownString = days + ":" + hours + ":" + minutes + ":" + seconds;
					
					if (this.config.showMilliseconds===true)
							countDownString = countDownString+ "." +mseconds;
					
					timer.innerHTML = countDownString;
					
				}
			}
			wrapper.appendChild(headerD);
			wrapper.appendChild(timer);
			return wrapper;
		}
});
