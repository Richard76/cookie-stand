'use strict';

var store1 = new SalmonStore('1st and Pike', 23, 65, 6.3);
var store2 = new SalmonStore('SeaTac Airport', 3, 24, 1.2);
var store3 = new SalmonStore('Seattle Center', 11, 38, 3.7);
var store4 = new SalmonStore('Capitol Hill', 20, 38, 2.3);
var store5 = new SalmonStore('Alki', 2, 16, 4.6);

function SalmonStore(storeName, minCust, maxCust, avgCookies) {
  //var this = {};
  this.name = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.hours = ['6am', '7am', '8am', '9am', '10am', '11am','12pm', '1pm', '2pm','3pm', '4pm', '5pm', '6pm', '7pm', '8pm' ];
  //return this;
}




/*
//--------Beginning of Sample Code
function CookieStore(storeName, minCust, maxCust, avgCookies) {
  //var this = {};
  this.name = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.hours = ['9am', '10am', '11am'];

  //return this;
}

CookieStore.prototype.logStoreName = function() {
  console.log(this.name);
}

CookieStore.prototype.toHtml = function() {
  var storeTable = document.getElementById('store_table');
  var tableRow = document.createElement('tr');
  var nameTableHeader = document.createElement('th');
  var totalTableData = document.createElement('td');
  var hourlyTableData;

  nameTableHeader.textContent = this.name;
  tableRow.appendChild(nameTableHeader);

  for (var i = 0; i < this.hours.length; i++) {
    hourlyTableData = document.createElement('td');
    hourlyTableData.textContent = 5;
    tableRow.appendChild(hourlyTableData);
  }

  totalTableData.textContent = 15;
  tableRow.appendChild(totalTableData);

  console.log(tableRow, storeTable)

  storeTable.appendChild(tableRow);
}
/// -- End of Sample Code
*/




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
