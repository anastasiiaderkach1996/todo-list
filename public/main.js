
let inputId = 0;

const buttonClick = document.getElementById("btn");
const ajaxBtn = document.getElementById("ajaxtest");

buttonClick.addEventListener('click', buttonClickEvent);

function buttonClickEvent() {
    // createNewItem()
    let inputValue = document.getElementById('textArea').value;
    sendAjax(inputValue);
    // sendInfo();
}
function createNewItem() {
    // const exsitedValues = [];
    let inputValue = document.getElementById('textArea').value;
    let paragraph = document.createElement('p');
    let input = document.createElement('input');
    let label = document.createElement('label');
    let textNode = document.createTextNode(inputValue);

    paragraph.appendChild(input);
    paragraph.appendChild(label);
    label.appendChild(textNode);
    
    input.setAttribute('type','checkbox');
    input.id = inputId;
    label.setAttribute('for', inputId);

    if (inputValue === "") {
        alert('You must write something')
    } else {
        document.getElementById('myList').appendChild(paragraph);
        document.getElementById('msgError').style.display = 'none';
    } 
    
   document.getElementById('textArea').value = '';

   inputId += 1;
}
function showErrorMessage(show) {
    const messageELement = document.getElementById('msgError');
    let a = messageELement.style.display;
    
    show ?  messageELement.style.display = 'inline' :  messageELement.style.display = 'none';
    // messageELement.style.display = show ? 'inline' : 'none';
}
function heandleResponse(text) {
    if (text == 'Item Added') {
        createNewItem();
        showErrorMessage(false);
    } else { 
        showErrorMessage(true);
    }
}
function sendAjax(data) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            heandleResponse(xhttp.responseText);
        } else {
            console.log('Something wrong')
        }
    }
    xhttp.open('POST', '/api/todo', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({item: data}))
}




