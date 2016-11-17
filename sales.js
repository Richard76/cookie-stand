'use strict';

var nameForm = document.getElementById('name_form');

nameForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  //var textBox = document.getElementById('form_text');
  var storeName = event.target.store_name.value;
  var minCust = event.target.min_cust.value;
  var maxCust = event.target.max_cust.value;
  var estCookPerCust = event.target.cookies_per_cust.value;

  console.log('Store Name: ' + storeName);
  console.log('Min Cust: ' + minCust);
  console.log('Max Cust: ' + maxCust);
  console.log('Estimated Cust Per Hour: ' + estCookPerCust);

  event.target.store_name.value = '';
  event.target.min_cust.value = '';
  event.target.max_cust.value = '';
  event.target.cookies_per_cust.value = '';


  //take the input data and create a new store_name & add to store list array
  storeList.push(new SalmonStore(storeName, minCust, maxCust, estCookPerCust));

  //clear the contents of the tableRow
  var tableSection = document.getElementById('store_table');
  tableSection.textContent = '';

  //refresh the page
  renderPage();

}



var storeList = [
  new SalmonStore('1st and Pike', 23, 65, 6.3),
  new SalmonStore('SeaTac Airport', 3, 24, 1.2),
  new SalmonStore('Seattle Center', 11, 38, 3.7),
  new SalmonStore('Capitol Hill', 20, 38, 2.3),
  new SalmonStore('Alki', 2, 16, 4.6)
];
console.log('there are ' + storeList.length + ' stores');

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
//console.log(storeList[0].randCustPerHour());

//constructor 2
SalmonStore.prototype.cookiesNeededPerHour = function() {
  var needed = this.randCustPerHour() * this.custAv;
  return needed;
};
//console.log(storeList[0].cookiesNeededPerHour());

//constructor 3
SalmonStore.prototype.cookiesNeededEveryHour = function() {
  for (var i = 0; i < this.hoursOpen.length; i++) {
    this.cookiesNeeded.push(this.cookiesNeededPerHour());
    //this.push(cookiesNeededPerHour());
  }
  return this.cookiesNeeded;
};
//console.log(storeList[0].cookiesNeededEveryHour());

//constructor 4
SalmonStore.prototype.totalCookiesNeeded = function() {
  //console.log(this.cookiesNeeded);
  for (var j = 0; j < this.hoursOpen.length; j++) {
    this.totalCookiesNeededForStore = this.totalCookiesNeededForStore + this.cookiesNeeded[j];
  }
  return this.totalCookiesNeededForStore;
};
//console.log(storeList[0].totalCookiesNeeded());

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

  for (var i = 0; i < storeList[0].hoursOpen.length; i++) {
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

  for (var i = 0; i < storeList[0].hoursOpen.length; i++) {
    hourlyTableHeader = document.createElement('th');
    hourlyTableHeader.textContent = storeList[0].hoursOpen[i];
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

  for (var i = 0; i < storeList[0].hoursOpen.length; i++) {
    hourlyTableHeader = document.createElement('th');
    hourlyTableHeader.textContent = Math.round(storeList[0].cookiesNeeded[i]);
    tableRow.appendChild(hourlyTableHeader);
  }
  blankTableHeader.textContent = 'Total';
  totalTableHeader.textContent = 'Grand Total Here';
  tableRow.appendChild(totalTableHeader);

  storeTable.appendChild(tableRow);
}

// need to wrap this function up by adding another loop and returning an array
function subTotalByHour () {
  var subtotal = 0;
  for (var i = 0; i < storeList.length; i++) {
    subtotal = subtotal + storeList[i].cookiesNeeded[0];
  }
  return subtotal;
};





function renderPage() {
  renderHeaderRow();
  for (var i = 0; i < storeList.length; i++) {
    storeList[i].tableRowData();
  }
  renderFooterRow();
};




renderPage();

console.log(subTotalByHour());
//console.log(storeList[0].cookiesNeeded[0]);
