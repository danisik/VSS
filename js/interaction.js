var idSelects = [ ];

addStrategy();
addStrategy();

document.addEventListener("DOMContentLoaded", function(event) {
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
	
	html = '<span></span>';

    html = html + '<select class="form-control strategy-select" id="' + newId + '">'
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
  					 +		'<option value="TTFT">ALT</option>'
					 +    '</select>';
					 
	if (idSelects.length > 2) {
		
		html = html + '<button type="button" class="btn btn-danger delete-btn">x</button>';
	}

     div.innerHTML = html;

     let strategyBox = document.getElementById("iteration-settings");

     if (strategyBox)
     {
        strategyBox.appendChild(div);
     }

     initRemoveStrategyButton();
	 
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
