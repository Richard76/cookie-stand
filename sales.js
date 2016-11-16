'use strict';

var store1 = new SalmonStore('1st and Pike', 23, 65, 6.3);
var store2 = new SalmonStore('SeaTac Airport', 3, 24, 1.2);
var store3 = new SalmonStore('Seattle Center', 11, 38, 3.7);
var store4 = new SalmonStore('Capitol Hill', 20, 38, 2.3);
var store5 = new SalmonStore('Alki', 2, 16, 4.6);

function SalmonStore(storeName, minCust, maxCust, custAv) {
  //var this = {};
  this.name = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.custAv = custAv;
  this.hoursOpen = ['6am', '7am', '8am', '9am', '10am', '11am','12pm', '1pm', '2pm','3pm', '4pm', '5pm', '6pm', '7pm', '8pm' ];
  this.cookiesNeeded = [];
  this.totalCookiesNeededForStore = 0;
  //return this;
}

// Practice constructor to verify I know what the hell I am about to try. in console. store1.logStoreName(); works!
SalmonStore.prototype.logStoreName = function() {
  console.log(this.name);
};

//constructor 1
SalmonStore.prototype.randCustPerHour = function() {
  var min = Math.ceil(this.minCust);
  var max = Math.floor(this.maxCust);
  return Math.floor(Math.random() * (max - min)) + min;
};
console.log(store1.randCustPerHour());

//constructor 2
SalmonStore.prototype.cookiesNeededPerHour = function() {
  var needed = this.randCustPerHour() * this.custAv;
  return needed;
};
console.log(store1.cookiesNeededPerHour());

//constructor 3
SalmonStore.prototype.cookiesNeededEveryHour = function() {
  for (var i = 0; i < this.hoursOpen.length; i++) {
    this.cookiesNeeded.push(this.cookiesNeededPerHour());
    //this.push(cookiesNeededPerHour());
  }
  return this.cookiesNeeded;
};
console.log(store1.cookiesNeededEveryHour());

//constructor 4
SalmonStore.prototype.totalCookiesNeeded = function() {
  //console.log(this.cookiesNeeded);
  for (var j = 0; j < this.hoursOpen.length; j++) {
    this.totalCookiesNeededForStore = this.totalCookiesNeededForStore + this.cookiesNeeded[j];
  }
  return this.totalCookiesNeededForStore;
};
//console.log(store1.totalCookiesNeeded());

//constructor 5 --- Do Not reference this one
SalmonStore.prototype.storeCookieProjections = function() {
  var contentArea = document.getElementById('content_area');
  var ul = document.createElement('ul');
  var li;
  this.cookiesNeededEveryHour(); /// should I remove this?
  for (var i = 0; i <= this.hoursOpen.length; i++) {
    li = document.createElement('li');
    li.textContent = this.hoursOpen[i] + ': ' + Math.round(this.cookiesNeeded[i]) + ' cookies';
    ul.appendChild(li);
  }
  li.textContent = 'Total: ' + Math.round(this.totalCookiesNeeded()) + ' cookies';
  ul.appendChild(li);
  contentArea.appendChild(ul);
};

//constructor 6 --- Table Row Data
SalmonStore.prototype.tableRowData = function() {
  var storeTable = document.getElementById('store_table');
  var tableRow = document.createElement('tr');
  var blankTableHeader = document.createElement('th');
  var totalTableHeader = document.createElement('th');
  var hourlyTableHeader;

  tableRow.appendChild(blankTableHeader);

  for (var i = 0; i < store1.hoursOpen.length; i++) {
    this.randCustPerHour();
    this.cookiesNeededPerHour();
    this.cookiesNeededEveryHour();
    //this.totalCookiesNeeded();
    hourlyTableHeader = document.createElement('th');
    hourlyTableHeader.textContent = Math.round(this.cookiesNeeded[i]) ;
    tableRow.appendChild(hourlyTableHeader);
  }
  blankTableHeader.textContent = this.name;
  this.totalCookiesNeeded();
  totalTableHeader.textContent = Math.round(this.totalCookiesNeededForStore);
  tableRow.appendChild(totalTableHeader);

  storeTable.appendChild(tableRow);
};




function renderHeaderRow() {
  var storeTable = document.getElementById('store_table');
  var tableRow = document.createElement('tr');
  var blankTableHeader = document.createElement('th');
  var totalTableHeader = document.createElement('th');
  var hourlyTableHeader;

  tableRow.appendChild(blankTableHeader);

  for (var i = 0; i < store1.hoursOpen.length; i++) {
    hourlyTableHeader = document.createElement('th');
    hourlyTableHeader.textContent = store1.hoursOpen[i];
    tableRow.appendChild(hourlyTableHeader);
  }

  totalTableHeader.textContent = '';
  tableRow.appendChild(totalTableHeader);

  storeTable.appendChild(tableRow);
}

function renderFooterRow() {
  var storeTable = document.getElementById('store_table');
  var tableRow = document.createElement('tr');
  var blankTableHeader = document.createElement('th');
  var totalTableHeader = document.createElement('th');
  var hourlyTableHeader;

  tableRow.appendChild(blankTableHeader);

  for (var i = 0; i < store1.hoursOpen.length; i++) {
    hourlyTableHeader = document.createElement('th');
    hourlyTableHeader.textContent = 'subtotal here';
    tableRow.appendChild(hourlyTableHeader);
  }
  blankTableHeader.textContent = 'Totals';
  totalTableHeader.textContent = 'Big Total Here';
  tableRow.appendChild(totalTableHeader);

  storeTable.appendChild(tableRow);
}

//store1.totalCookiesNeeded();

renderHeaderRow();
store1.tableRowData();
store2.tableRowData();
store3.tableRowData();
store4.tableRowData();
store5.tableRowData();
renderFooterRow();




/*
//--------Beginning of Sample Code from Erin on Tuesday
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
