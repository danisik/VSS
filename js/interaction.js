var idSelects = [ ];



document.addEventListener("DOMContentLoaded", function(event) {
      addStrategy();
      addStrategy();

      initAddStrategyButton();
      initRemoveStrategyButton();
});


function initAddStrategyButton()
{
    let addButton = document.getElementById("add-strategy-btn");

    if (addButton)
    {
        addButton.addEventListener('click', function() {
            addStrategy();
        });
    }
}

function initRemoveStrategyButton()
{
    var removeButtons = document.getElementsByClassName("delete-btn");

    Array.from(removeButtons).forEach(function(removeButton) {
		  
          removeButton.addEventListener('click', function() {
          removeStrategy(removeButton);
        });
    });
}


function addStrategy()
{
	let newId = 0;

	while(true) {

		if (idSelects.indexOf(newId) != -1) {

			newId++;

		} else {

			idSelects.push(newId);
			break;
		}
	}

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

  // pro první dva nebudeme přidávat možnost smazání
	if (idSelects.length > 2) {

		html = html + '<button type="button" class="btn btn-danger delete-btn">x</button>';
	}

   div.innerHTML = html;

   let strategyBox = document.getElementById("iteration-settings");

   if (strategyBox)
   {
      strategyBox.appendChild(div);
   }

   var removeButton = div.getElementsByTagName("button")[0];
   
   if (removeButton != null) {
	   removeButton.addEventListener('click', function() {
          removeStrategy(removeButton);
        });
   }

   var prisonerName = addPrisoner(newId, div.getElementsByTagName("select")[0]);

   div.getElementsByTagName("span")[0].innerHTML = prisonerName;
}

function removeStrategy(removeButton)
{
    let strategyDiv = removeButton.closest(".iteration-strategy");
	let selectElement = strategyDiv.getElementsByTagName("select")[0];

    if (strategyDiv) {

        strategyDiv.remove();
    }

	deletePrisoner(selectElement.id);
	idSelects.splice(selectElement.id, 1);
}
