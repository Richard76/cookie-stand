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
  },
  totalCookiesNeededForStore: 0,
  totalCookiesNeeded: function() {
    //console.log(this.cookiesNeeded);
    for (var j = 0; j < this.hoursOpen.length; j++) {
      this.totalCookiesNeededForStore = this.totalCookiesNeededForStore + this.cookiesNeeded[j];
    }
    return this.totalCookiesNeededForStore;
  },
  storeCookieProjections: function() {
    var contentArea = document.getElementById('content_area');
    var ul = document.createElement('ul');
    var li;
    this.cookiesNeededEveryHour(); /// should I remove this?
    for (var i = 0; i < this.hoursOpen.length; i++) {
      li = document.createElement('li');
      li.textContent = this.hoursOpen[i] + ': ' + Math.round(this.cookiesNeeded[i]) + ' cookies';
      ul.appendChild(li);
    }
    li.textContent = 'Total: ' + Math.round(salmonStore1.totalCookiesNeeded()) + ' cookies';
    ul.appendChild(li);
    contentArea.appendChild(ul);

  }
// End of Object
};

salmonStore1.storeCookieProjections();
//salmonStore1.cookiesNeeded();



console.log('salmon store 1 - cust per hour: ' + salmonStore1.randCustPerHour());
console.log('salmon store 1 - cooked needed per hour: ' + salmonStore1.cookiesNeededPerHour());
console.log('salmon store 1 - cooked needed every hour: ' + salmonStore1.cookiesNeededEveryHour());
console.log('salmon store 1 - total cookies needed for the day: ' + Math.round(salmonStore1.totalCookiesNeeded()));



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
