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
    let div = document.createElement("div");
    div.classList.add("iteration-strategy");

    let html = '<select class="form-control">'
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
					 +    '</select>'
					 +    '<button type="button" class="btn btn-danger delete-btn">x</button>';

     div.innerHTML = html;

     let strategyBox = document.getElementById("iteration-settings");

     if (strategyBox)
     {
        strategyBox.appendChild(div);
     }

     initRemoveStrategyButton();
}

function removeStrategy(removeButton)
{
    let strategyDiv = removeButton.closest(".iteration-strategy");

    if (strategyDiv) {
        strategyDiv.remove();
    }
}
