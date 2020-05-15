(function() {
"use strict";

    //Select Suite from the room selection.
var suite = document.getElementById('selectRoom');

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('Checkout').addEventListener('submit', estimateTotal);
	
    //Make the estimate button disbale if no Suite selected. 
	var estimatebtn = document.getElementById('estimatebtn');
	
	estimatebtn.disabled = true;
	
	suite.addEventListener('change', function() {
	
		if (suite.value === '') {
			estimatebtn.disabled = true;
		} else {
			estimatebtn.disabled = false;
	 	}
	
	});
});

function estimateTotal(event) {
	event.preventDefault();
	
    //If the suite is empty fire an alert.
	if (suite.value === '') {
		alert('Please choose your Preferred suite.');
		
    //Then add focus so the user knows where to select.
		suite.focus();
	}
	
    //Find total number of guests
    //Using ParseInt to let JS see the string as an integer.
	var numGuests = parseInt(document.getElementById('guests')
							 .value, 10) || 0,
		                      //Radix - Which base we are operating in.
                            //If ans not reasonable, give ans as 0 by default.
        
        suiteState = suite.value,
        
        //Additional Requirements checkbox check. 
		addreqMethod = document.querySelector('[name=r_method]:checked')
						     .value || "";
                            //If ans not reasonable, give ans as "" by default.
    
    //total of all items added to checkout
    console.log(numGuests, suiteState, addreqMethod);
	
    var date = document.getElementById('arrival').value;
    var lodge = document.getElementById('location').value;
    var daysStay = document.getElementById('days').value;
	var totalQty = numGuests,
		
        //Snack option
        addreqCostPer,
		
        addreqCost,
		discountFactor = 1,
		estimate,
		totalRoomPrice = (90 * numGuests);
	
	if (suiteState === 'HNY') {
		discountFactor = 0.95;
	} else if (suiteState === 'PRT') {
		discountFactor = 0.90;
	}
	
    //Check for different values of a single variable
	switch(addreqMethod) {
		case 'snack' :
			addreqCostPer = 4;
			break;
		case 'drinks' :
			addreqCostPer = 10;
			break;
		default :
			addreqCostPer = 0;
			break;
	}
	
	addreqCost = addreqCostPer * totalQty;
		
	estimate = '£' + (((totalRoomPrice * discountFactor) + addreqCost) * daysStay).toFixed(2);
	           //Decimal places
    
    //Console log total calculation estimate
    console.log(estimate = '£' + (((totalRoomPrice * discountFactor) + addreqCost) * daysStay).toFixed(2));
    
	document.getElementById('txt-estimate').value = estimate;
	
	var results = document.getElementById('results');
    	
	results.innerHTML = 'Lodge Location ' + lodge + '<br>' + 'Total guests: ' + totalQty + '<br>' + 'Stay: ' + daysStay + ' Nights' + '<br>' + 'Arrival: ' + date + '<br>'; 
	results.innerHTML += 'Additional requirements: £' + addreqCost.toFixed(2) + '<br>';
	results.innerHTML += 'Discount: ' + ((discountFactor - 1) * 100).toFixed(2) + '% (' + suiteState + ')';
}

})();