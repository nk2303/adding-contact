// JS code goes here

document.addEventListener('DOMContentLoaded', () => {

    const invalidDiv = document.querySelector("#error")
    const nameField = document.querySelector("#name")
    nameField.setAttribute("required", "");

    const mobileField = document.querySelector("#mobile")
    mobileField.setAttribute("required", "");

    const emailField = document.querySelector("#email")
    emailField.setAttribute("required", "");

    const addContactBtn = document.querySelector("#submit")

    addContactBtn.addEventListener('click', event => {
        event.preventDefault();
        validateInput(nameField.value, mobileField.value, emailField.value)
    });

    const nameElement = document.querySelector("#nameColumn")

    let sortedAscending = false;

    nameElement.addEventListener('click', event => {
        event.preventDefault();
        if(!sortedAscending) {
            sortedByNameAscending();
        } else {
            sortedByNameDescending();
        }
    });

    const emptyField = () => {
        nameField.value = ""
        emailField.value = ""
        mobileField.value = ""
    }

    const validateInput = (name, mobile, email) => {
        if (checkName(name) && checkMobile(mobile) && checkEmail(email)){
            addToContact(name, mobile, email)
            emptyField()
            hideInvalidInput()
        } else {
            showInvalidInput()
        }
    }

    const checkName = input => {
        if (input.length > 20) { 
            return false 
        }
        return /^[A-Za-z ]+$/.test(input);  
    }

    const addToContact = (name, mobile, email) => {
        const contacTbl = document.querySelector("#summaryTable")
        const row = contacTbl.insertRow(contacTbl.rows.length)
        const nameField = row.insertCell(0);
        const mobileField = row.insertCell(1);
        const emailField = row.insertCell(2);
        nameField.innerHTML = name
        mobileField.innerHTML = mobile
        emailField.innerHTML = email
    }
    
    const checkMobile = input => {
        if (input.length !== 10) { 
            return false 
        }
        return /^\d+$/.test(input)
    }

    const checkEmail = input => {
        if (input.length > 40) { 
            return false 
        }
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/.test(input) 
    }

    const showInvalidInput = () => {
        invalidDiv.style.display = "block";
    }

    const hideInvalidInput = () => {
        invalidDiv.style.display = "none";
    }

    const sortedByNameAscending = () => {
        let table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("summaryTable");
        switching = true;
        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
        sortedAscending = !sortedAscending
    }

    const sortedByNameDescending = () => {
        let table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("summaryTable");
        switching = true;
        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
        sortedAscending = !sortedAscending
    }

})
