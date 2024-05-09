const RootURL = document.location.origin.concat('/');
const Form = document.getElementById("main-form");
const allUnitsDiv = Form.querySelector('#all-units');

function AddUnitToForm() {
    //const currUnitCount = allUnitsDiv.childElementCount;
    const unitDiv =  document.createElement("div");
    unitDiv.name = "unit-div";
    allUnitsDiv.appendChild(unitDiv);
    const ingredientName = document.createElement("input");
    ingredientName.type = "text";
    ingredientName.name = 'name';
    unitDiv.appendChild(ingredientName)
    const ingredienConversionRate = document.createElement("input");
    ingredienConversionRate.type = "number";
    ingredienConversionRate.name = 'conversion_rate';
    ingredienConversionRate.step = "0.000001";
    unitDiv.appendChild(ingredienConversionRate)
    const removeButton = document.createElement("button");
    removeButton.onclick = function () {RemoveUnitFromForm(unitDiv)};
    removeButton.textContent = "Remove this unit";
    unitDiv.appendChild(removeButton)
}

function RemoveUnitFromForm(unitDiv) {
    unitDiv.remove();
}

function OrderUnitsPropertiesNames () {
    let i = 0;
    for(let unitDiv of allUnitsDiv.children) {
        unitDiv.querySelector('input[name="name"]').name='avaiable_units['+ i +'][name]';
        unitDiv.querySelector('input[name="conversion_rate"]').name='avaiable_units['+ i +'][conversion_rate]';
        i++;
    }
}

///function to be removed?
function FillUnitOptionsForSelect(selector) {
    //clear dropdown list    
    while (selector.options.length > 0) {              
        selector.remove(0);
    }
    

}
/* Stuff from html
<select  id="waterSelect" onclick="FillUnitOptionsForSelect(waterSelect)">
    <option value="1">1</option>
    <option value="3">3</option>
    <option value="4">4</option>
</select>
*/

/////////////////////////////////
//Execution starts here
/////////////////////////////////
window.RemoveUnitFromForm = RemoveUnitFromForm;
window.AddUnitToForm = AddUnitToForm;
window.OrderUnitsPropertiesNames = OrderUnitsPropertiesNames;