/*
 * Created 2021 by Vojtech Danisik and Jan Carnogursky.
 *
 * The author dedicates this file to the public domain.
 */

 
var idSelects = [ ];

/**
* Initialize page.
*/
document.addEventListener("DOMContentLoaded", function(event) {
      addStrategy();
      addStrategy();

      initAddStrategyButton();
      initRemoveStrategyButton();
});


/**
* Initialize button event for adding new strategies to page.
*/
function initAddStrategyButton() {
    let addButton = document.getElementById("add-strategy-btn");

    if (addButton)
    {
        addButton.addEventListener('click', function() {
            addStrategy();
        });
    }
}

/**
* Initialize button event for deleting strategy.
*/
function initRemoveStrategyButton() {
    var removeButtons = document.getElementsByClassName("delete-btn");

    Array.from(removeButtons).forEach(function(removeButton) {
		  
          removeButton.addEventListener('click', function() {
          removeStrategy(removeButton);
        });
    });
}


/**
* Adding new strategy.
*/
function addStrategy() {
	let newId = 0;

	// Try to find id for new prisoner.
	while(true) {

		if (idSelects.indexOf(newId) != -1) {

			newId++;

		} else {

			idSelects.push(newId);
			break;
		}
	}

	// Create new div with select element.
    let div = document.createElement("div");
    div.classList.add("iteration-strategy");

	html = '<span class="prisoner-name"></span>';

    html += '<select class="form-control strategy-select" id="' + newId + '">'
  					 +	  '<option value="ALLC" selected="">ALLC</option>'
  					 +    '<option value="ALLD">ALLD</option>'
  					 +		'<option value="ALT">ALT</option>'
  					 +		'<option value="APP">APP</option>'
  					 +		'<option value="CPAVG">CPAVG</option>'
  					 +		'<option value="GRIM">GRIM</option>'
  					 +		'<option value="PAV">PAV</option>'
  					 +		'<option value="RAND">RAND</option>'
  					 +		'<option value="TFT">TFT</option>'
  					 +		'<option value="TFTT">TFTT</option>'
  					 +		'<option value="TTFT">TTFT</option>'
					 +    '</select>';

	// We don't want to add remove buttons for first 2 prisoners.
	if (idSelects.length > 2) {

		html = html + '<button type="button" class="btn btn-danger delete-btn">x</button>';
	}

	// Set content of div.
   div.innerHTML = html;

   // Get strategy box and try to add a div.
   let strategyBox = document.getElementById("iteration-settings");

   if (strategyBox)
   {
      strategyBox.appendChild(div);
   }

   // Get remove button if exists and add event listener for removing current prisoner.
   var removeButton = div.getElementsByTagName("button")[0];
   
   if (removeButton != null) {
	   removeButton.addEventListener('click', function() {
          removeStrategy(removeButton);
        });
   }

   // Add new prisoner to page.
   var prisonerName = addPrisoner(newId, div.getElementsByTagName("select")[0]);

   // Update prisoner name next to select box.
   div.getElementsByTagName("span")[0].innerHTML = prisonerName;
}

/**
* Remove strategy from page.
* @param removeButton - Clicked button.
*/
function removeStrategy(removeButton) {
	
    let strategyDiv = removeButton.closest(".iteration-strategy");
	let selectElement = strategyDiv.getElementsByTagName("select")[0];

    if (strategyDiv) {

        strategyDiv.remove();
    }

	// Delete prisoner + remove his id from array of used ids.
	deletePrisoner(selectElement.id);
	idSelects.splice(selectElement.id, 1);
}
