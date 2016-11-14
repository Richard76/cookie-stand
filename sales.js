'use strict';

var salmonStore1 = {
  name: '1st and Pike',
  hoursOpen: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
  custMin: 25,
  custMax: 65,
  custAv: 6.3,
  randCustPerHour: function() {
    var min = Math.ceil(this.custMin);
    var max = Math.floor(this.custMax);
    return Math.floor(Math.random() * (max - min)) + min;
  },
  cookiesNeededPerHour: function() {
    var needed = this.randCustPerHour() * this.custAv;
    return needed;
  },
  cookiesNeeded: [],
  cookiesNeededEveryHour: function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.cookiesNeeded.push(this.cookiesNeededPerHour());
      //this.push(cookiesNeededPerHour());
    }
    return this.cookiesNeeded;
// End of Object
  }
};

console.log('salmon store 1 - cust per hour: ' + salmonStore1.randCustPerHour());
console.log('salmon store 1 - cooked needed per hour: ' + salmonStore1.cookiesNeededPerHour());
console.log('salmon store 1 - cooked needed every hour: ' + salmonStore1.cookiesNeededEveryHour());

/*
===> SAMPLE Code Below

var cookieStore = {
	name: 'Downtown',
	storeHours: ['7am', '8am', '9am'],
	whatHours: function() {
		console.log('I am open certain hours: ' + this.storeHours);
	},
	listHours: function() {
		var contentArea = document.getElementById('content_area');
		var ul = document.createElement('ul');
		var li;

		for (var i = 0; i < this.storeHours.length; i++) {
			li = document.createElement('li');

			li.textContent = this.storeHours[i];
			ul.appendChild(li);
		}

		contentArea.appendChild(ul);
	}
};
*/
