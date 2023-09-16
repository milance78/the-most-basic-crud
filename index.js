
const imeInputElement = document.getElementById('ime-input');
const prezimeInputElement = document.getElementById('prezime-input');
const formaElement = document.querySelector('form');
const displayDataElement = document.querySelector(".display-data");

let dataObjectsArray = [];
let editMode = false;

formaElement.onsubmit = (event) => {
    event.preventDefault();
    // arranging collected data into an object
    let dataObject = {
        ime: imeInputElement.value,
        prezime: prezimeInputElement.value,
        id: crypto.randomUUID(),
    }
    // stocking object into an existing objects array
    dataObjectsArray = [...dataObjectsArray, dataObject];
    // reseting input fields
    imeInputElement.value = "";
    prezimeInputElement.value = "";
    imeInputElement.focus();

    displayFunction();
}

const displayFunction = () => {
    // resetting parent element
    displayDataElement.replaceChildren();

    dataObjectsArray.forEach((element) => {
        // parent element
        const displayDataItemElement = document.createElement('div');
        // two inputs - first name, last name
        const inputFirstNameElement = document.createElement('input');
        const inputLastNameElement = document.createElement('input');   
        // two material icons elements, referenced by their text content
        const firstIconElement = document.createElement('div');
        const secondIconElement = document.createElement('div');

        // setting attributes
        Object.assign(displayDataItemElement, {
            id: `${element.id}`,
            className: 'display-data-item',
        });
        Object.assign(inputFirstNameElement, {
            type: 'text',
            className: 'display-input-firstName',
            value: `${element.ime}`,
            disabled: 'false'
        });
        Object.assign(inputLastNameElement, {
            type: 'text',
            className: 'display-input-lastName',
            value: `${element.prezime}`,
            disabled: 'true'
        });
        Object.assign(firstIconElement, {
            className: 'material-icons edit',
            onclick: (event) => firstIconHandler(event),
            textContent: 'edit' // this determins the icon
        }); 
        Object.assign(secondIconElement, {
            className: 'material-icons delete',
            onclick: (event) => secondIconHandler(event),
            textContent: 'delete_outline' // this determins the icon
        });
        // appending all child elements at once to the parent 
        displayDataItemElement.append(
            inputFirstNameElement,
            inputLastNameElement,
            firstIconElement,
            secondIconElement
        );
        // appending parent to display container
        displayDataElement.appendChild(displayDataItemElement);
    });
}

const firstIconHandler = (event) => {
    dataObjectsArray.forEach((item) => {
        const firstNameEditInput = event.target.parentElement.querySelectorAll('input')[0];
        const lastNameEditInput = event.target.parentElement.querySelectorAll('input')[1];
        const firstIcon = event.target.parentElement.querySelectorAll('.material-icons')[0];
        const secondIcon = event.target.parentElement.querySelectorAll('.material-icons')[1];
        // comparing the unique id that belongs to the element who contains clicked first icon with the unique id of the every array member:
        if (event.target.parentElement.id === item.id) {
            if (editMode === false) {
                prepareForEditingText(
                    item,
                    firstNameEditInput,
                    lastNameEditInput,
                    firstIcon,
                    secondIcon
                );
                editMode = true;
            } else {
                saveEditedText(
                    item,
                    firstNameEditInput,
                    lastNameEditInput,
                );
                editMode = false;
            }
        }
    });
}

const prepareForEditingText = (
    _item,
    _firstNameEditInput,
    _lastNameEditInput,
    _firstIcon,
    _secondIcon
) => {
    _firstNameEditInput.classList.add('edit-mode');
    _firstNameEditInput.disabled = false;
    _firstNameEditInput.focus();

    _lastNameEditInput.classList.add('edit-mode');
    _lastNameEditInput.disabled = false;

    _firstIcon.textContent = 'done';
    _secondIcon.textContent = 'close';
}

const saveEditedText = (
    _item,
    _firstNameEditInput,
    _lastNameEditInput,
) => {
    // updating the concerned object with new input values
    _item = {
        ..._item,
        ime: _firstNameEditInput.value,
        prezime: _lastNameEditInput.value
    }
    // making a temporary updated array without changing the original array
    const updatedArray = dataObjectsArray.map((item) => {
        return item.id === _item.id ? _item : item;
    });
    // overwriting main array with the temporary one
    dataObjectsArray = [...updatedArray];

    displayFunction();
}

const secondIconHandler = (event) => {
    dataObjectsArray.forEach((forEachItem) => {
        if (event.target.parentElement.id === forEachItem.id) {

            if (editMode === false) {
                // when it matches, that is the array member that should be removed:
                updatedArray = dataObjectsArray.filter(filterItem => filterItem !== forEachItem);
                dataObjectsArray = [...updatedArray];
            } else {
                displayFunction();
                editMode = false;
            }
        }
    });
    displayFunction();
}





