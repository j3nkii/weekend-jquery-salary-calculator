//Global variables used throught the functions
let employeeDataBase = [
    {
        firstName: 'Jacob',
        lastName: 'Larson',
        employeeNumber: '420',
        jobTitle: 'Beer Tester',
        annualSalary: 6900,
    },
    {
        firstName: 'Selena',
        lastName: 'Orduno',
        employeeNumber: '421',
        jobTitle: 'Cocktail Tester',
        annualSalary: 6899,
    },
];
let loadedPage = false;
let editorMode = false;
//end global variables

$(ready);
function ready(){
    $(document).on('submit', '#employeeInputForm', addEmployeeToDataBase);      //event listener for adding employees after DOM is loaded
    $(document).on('click', '.removalButton', removeEmployee);                 //event listener for removing employees after DOM is loaded
    $(document).on('click', '.toggleEditMode', editEmployee);                 //Toggles to 'edit mode'
    $(document).on('click', '.editButton', editEmployee);                    //Attempting to make edits
    displayEmployeeToDom();                                                 //load database to DOM on initiation
}



/*
 Here we have a function that gathers values from DOM
 Then adds to BEGINING of an object located in our database of employees
 We're doing this so when displayEmployeeToDom function breaks after the page load
 It will append the new Object (the one we just put in) since it is located at the begining
 */
function addEmployeeToDataBase(){
    event.preventDefault();
    employeeDataBase.unshift({
        firstName: $('#firsNameInput').val(),
        lastName: $('#lastNameInput').val(),
        employeeNumber: $('#employeeNumberInput').val(),
        jobTitle: $('#jobTitleInput').val(),
        annualSalary: Number($('#annualSalaryInput').val()),
    });
    displayEmployeeToDom(true);
}



/**
 This functions purpose it to load script to the DOM
 There is a loop going through the database to collect data and generate to HTML
 There is a loadProgress variable, that when it reaches the length
    it changes our loadedPage flag to true, which should break the for loop after page load
    only allowing the first object to be appended to the DOM
 The SVG tag contains a trash can item to be used as a button for removing employees
 There is also a .data() method being added to the <TR> tag. it utilizes the employee number
    as there should be no duplicates of these, and attached to it, is the salary of the 
    employee. This will be used to reduce the totalAnnualSalary in the event of employee removal.

    could rebuild function to take an object as a paramet and use a ternary to set the 
    iterated array to one with only the object or the globaldatabase, which will not pass a parameter on load
 */
function displayEmployeeToDom(bool){
    let loadProgress = 0;
    for(let employee of employeeDataBase){
        $('#tableBody').append(
            `<tr id="${employee.employeeNumber}" data-salary="${employee.annualSalary}">
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.employeeNumber}</td>
                <td>${employee.jobTitle}</td>
                <td class="employeeSalary">${formatter.format(employee.annualSalary)}</td>
                <td class="employeeInteraction">
                    <button class="removalButton"><svg 
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg></button>
                    <button class="toggleEditMode"><svg 
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                    </svg></button>
                </td>
            </tr>`);
            overBudgetEvent();
            loadProgress++
            $('.inputFeild').val('');
        if(loadedPage){
            break;
        } else {
            loadedPage = loadProgress === employeeDataBase.length 
                ? true
                : false;
        }
    }
}



/**
 This function simply set the footer, which
    contains the total monthly salaries of 
    the employees. 
 If over budget, it will change to Red, alerting the user
 This should be used in any other events that add to our
    totalAnnualSalary variable
 */
function overBudgetEvent(){
    let totalAnnualSalary = 0;
    for(let employee of employeeDataBase){
        totalAnnualSalary += Number(employee.annualSalary);
    }
    if(totalAnnualSalary > 20000){
        $("footer").css("background-color", "red");
        $("footer").css("color", "white");
    } else {
        $("footer").css("background-color", "antiquewhite");
        $("footer").css("color", "var(--bs-body-color)");
    }
    $('#totalMonthlyDisplay').text(`Total Monthly: ${formatter.format(totalAnnualSalary)}`);
}



/**
 Here we take the data applied to the employee number tag
    and subtract the salary from the totalAnnualSalary variable
We then replace the monthly total text on the DOM,
    remove the table row, and trigger our overBudgetEvent
    since we are messing with the totalAnnualSalary variable
Then we will remove the employee from database;   ----->    ?? Was this a dumb use of a for..of.. loop? 
                                                            I know I could've use a for..in.. loop, but this seemed easier to read
 */
function removeEmployee(){
    $(this).parents('tr').remove();
    let index = -1;
    for(let employee of employeeDataBase){
        index++;
        if(employee.employeeNumber === $(this).parents('tr').attr('id')){
            employeeDataBase.splice(index,  1);
        }
    }
    overBudgetEvent();
}



//okay to reuse ID if removing old from DOM?
//no, create new ID's then create toggle variable
//make func reset table when togle off using click
function editEmployee(){
    if(!editorMode){
    $(this).parent()
        .siblings(".employeeSalary")
        .empty()
        .append('<input class="editEmployeeFromDOM" type="number">');
    $(this).parent()
        .empty()
        .append(`<button class="editButton">Commit</button>`);
        console.log('now able to edit');
    //Toggle for function to handle edit / commit buttons
    editorMode = true;
    } else {
        let currentEmployee;
        let updatedEmployee = Number($('.editEmployeeFromDOM').val());
        let employeeNumber = $(this).parents('tr').attr('id');
        for(let employee of employeeDataBase){
            if(employeeNumber === employee.employeeNumber){
                employee.annualSalary = updatedEmployee
                currentEmployee = employee
            }
        }
        $(this).parent()
        .siblings(".employeeSalary")
        .empty()
        .text(`${formatter.format(currentEmployee.annualSalary)}`);
    $(this).parent()
        .empty()
        .append(`<button class="removalButton"><svg 
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg></button>
                <button class="toggleEditMode"><svg 
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                </svg></button>`);
        overBudgetEvent();
        editorMode = false;
    }
}


//Stole this from stackoverflow, honestly not 100% sure how it works. 
//It seems to act like a function so I put it at the bottom.
//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });