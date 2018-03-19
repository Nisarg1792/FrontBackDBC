//Script for FrontBackDBC
  	// Grab the URL of the website
		
    var currentURL = window.location.origin;
  		$(document).ready(function() {
  		// Get data from database
		  	$.get(currentURL + "/data", function(data) {		
			  	$tbody = $('tbody');
				  for (var i in data) {
				  	var $ASIN = $('<td>').text(data[i].ASIN);
					  var $Title = $('<td>').text(data[i].Title);
					  var $MPN = $('<td>').text(data[i].MPN);
					  var $Price = $('<td>').text(data[i].Price);
					  var $tr = $('<tr>').append($ASIN).append($Title).append($MPN).append($Price);
					  $tbody.append($tr);
					}
				});
  	  });

		$("#submit").on("click", function() { 	
			  var search = encodeURI($("#input").val().trim());  // Get user input
		    	  $.get(currentURL + "/search/" + search, function(data) {  // Get data from product search
				   	$('#show').remove(); // Remove old div
			
        var $well = $('<div>').attr('id','show').addClass('well'); // Create new well
			  var dataCol = ['ASIN','Title','MPN','Price']; // Add data to well
			  
         for (var i in dataCol) {
				    var $p = $('<p>').text(dataCol[i] + ': ' + data[dataCol[i]]);
					  $well.append($p);
				  }
			
      // Create new button and div
				var $but = $('<button>').attr('type','button').attr('id','add').addClass('btn btn-default').text('Add to DB');
				var $div = $('<div>').attr('id','show').append($well).append($but);

			// Save data to local storage
				localStorage.setItem('search', JSON.stringify(data));
				
			// Add well to page
				$('#secondCol').append($div);		
			});
			return false;
		});

		// Capture the form inputs 
		$(document).on("click", "#add", function() {
			var userData = JSON.parse(localStorage.getItem('search')); // Get data fro, local storage
			$.post(currentURL + "/add", userData, function(data) { 		// AJAX post the data to the friends API.

				if (data.code === "ER_DUP_ENTRY") {
					  alert('Cannot add product twice');
				} else {
					  var $ASIN = $('<td>').text(userData.ASIN);
					  var $Title = $('<td>').text(userData.Title);
					  var $MPN = $('<td>').text(userData.MPN);
					  var $Price = $('<td>').text(userData.Price);
					  var $tr = $('<tr>').append($ASIN).append($Title).append($MPN).append($Price);
					  $('tbody').prepend($tr);
				  }				
			  });
			return false;
		});
