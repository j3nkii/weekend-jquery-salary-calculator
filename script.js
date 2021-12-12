//Global variables used throught the functions
let employeeDataBase = [
    {
        firstName: 'Jacob',
        lastName: 'Larson',
        employeeNumber: '420',
        jobTitle: 'Beer Tester',
        annualSalary: 69000,
    },
    {
        firstName: 'Selena',
        lastName: 'Orduno',
        employeeNumber: '421',
        jobTitle: 'Cocktail Tester',
        annualSalary: 68999,
    },
];
let editorMode = false;
let totalAnnualSalary = 0;
//end global variables

$(ready);
function ready(){
    $(document).on('submit', '#employeeInputForm', addEmployeeToDataBase);  //event listener for adding employees after DOM is loaded
    $(document).on('click', '.removalButton', removeEmployee);             //event listener for removing employees after DOM is loaded
    $(document).on('click', '.toggleEditMode', editEmployee);             //Toggles to 'edit mode' which switcher table text to <inputs>
    $(document).on('click', '.editButton', editEmployee);                //Used to edit employees in table when pressing the commit button
    displayEmployeeToDom();                                             //load database to DOM on initiation
    budgetEvent();                                                     //load monthly budget to DOM
}


/*
This function takes in values from DOM, adds them
     to the database, and then utilized the 
     display function, passing the object
     to be rendered to DOM
 */
function addEmployeeToDataBase(){
    event.preventDefault();
    for(let employee of employeeDataBase){
        if(Number($('#employeeNumberInput').val()) === Number(employee.employeeNumber)){
            window.alert('User Already Exists')
            return;
        }
    }
    let additionalEmployee = {
        firstName: $('#firsNameInput').val(),
        lastName: $('#lastNameInput').val(),
        employeeNumber: $('#employeeNumberInput').val(),
        jobTitle: $('#jobTitleInput').val(),
        annualSalary: Number($('#annualSalaryInput').val()),
    }
    employeeDataBase.push(additionalEmployee);
    displayEmployeeToDom(additionalEmployee);
    budgetEvent(additionalEmployee.annualSalary);
}



/**
 This functions purpose it to load script to the DOM.
 There is a loop going through the database to collect data and generate to HTML,
    if the function is given an object, which it should everytime except on page load,
    it will convert it to an array, then it can be given to the for loop to be rendered to DOM.
    (the for loop in only utilized on page load)
 The SVG tag contains a trash can item to be used as a button for removing employees
    as well as a little document icon that is uded for editing
 There is also a .data() method being added to the <TR> tag. it utilizes the employee number
    as there should be no duplicates of these, and attached to it, is the salary of the 
    employee. This will be used to reduce the totalAnnualSalary in the event of employee removal.
 */
function displayEmployeeToDom(obj){
    let arr = obj !== undefined
        ? Array(obj)
        : employeeDataBase;
    for(let employee of arr){
        $('#tableBody').append(
            `<tr>
                <td class="firstName" data-firstname="${employee.firstName}">${employee.firstName}</td>
                <td class="lastName" data-lastname="${employee.lastName}">${employee.lastName}</td>
                <td class="employeeNumber" data-employeenumber="${employee.employeeNumber}">${employee.employeeNumber}</td>
                <td class="jobTitle" data-jobtitle="${employee.jobTitle}">${employee.jobTitle}</td>
                <td class="employeeSalary" data-salary="${employee.annualSalary}">${formatter.format(employee.annualSalary)}</td>
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
            $('.inputFeild').val('');
    }
}



/**
 This function sets the footer, which
    contains the total monthly salaries of 
    the employees. 
 If over budget, it will change to Red, alerting the user.
 This should be used in any other events that add to our
    totalAnnualSalary variable.
 It also now adds all salaries in database and appends to the DOM,
    another reason it should be used in any other function that
    interacts with salaries
When calling function it should always take a parameter,
    otherwise it will add up everthing inside databse,
    which it does on pageload
 */
function budgetEvent(num){
    if(num === undefined){
        for(let employee of employeeDataBase){
            totalAnnualSalary += Number(employee.annualSalary);
        }
    } else {
        totalAnnualSalary += num;
    }
    let monthly = Math.round(totalAnnualSalary / 12)
    if(monthly > 20000){
        $("footer").css("background-color", "red");
        $("footer").css("color", "white");
    } else {
        $("footer").css("background-color", "#212529");
        $("footer").css("color", "#fff");
    }
    $('#totalMonthlyDisplay').text(`Total Monthly: ${formatter.format(monthly)}`);
}



/**
Function first calls dats attacheched to the employeesalary class,
    using it to call our budget even which will update the dom with monthly cost
then it loops through database searhing for matching ID numbers, 
    as there should be no duplicates, and deletes the employee from databse
)
 */
function removeEmployee(){
    budgetEvent(-$(this)
        .parent().
        siblings('td.employeeSalary')
        .data('salary'));
    $(this).parents('tr').remove();
    for(let index in employeeDataBase){
        if(Number(employeeDataBase[index].employeeNumber) === $(this).parent()
            .siblings('td.employeeNumber')
            .data('employeenumber')){
            employeeDataBase.splice(index,  1);
        }
    }
}



/**
 Function allows user to edit the salary value in the database.
    the if statements are making sure we're in 'editor mode' and that we're clicking proper buttons
    otherwise if you click a toggle button while in editor mode itll assign the value to 
    athe improper employee, so only one may be manipluated at a time
 The first if 'opens editor mode' presenting an input box as well as a commit button.
 The second if, once data has been entered into the input, will allow the 'commit' seciotion of 
    this function to happen, editing data in the database and reredering the text, and giving back
    the remove and edit buttons from before
 The last if, just throws an error for the user.

 In the future, this could be able to edit all inputs. 
 */
function editEmployee(){
    let oldSalary = $(this).parent()
        .siblings('.employeeSalary')
        .data('salary')
    if(!editorMode && $(this).attr('class') === 'toggleEditMode'){
        $(this).parent()
            .siblings(".employeeSalary")
            .empty()
            .append(`<input id="editEmployeeFromDOM" type="number" value="${oldSalary}">`);
        $(this).parent()
            .empty()
            .append(`<button class="editButton">Commit</button>`);
            console.log('now able to edit');
        editorMode = true;
    } else if(editorMode && $(this).attr('class') === 'editButton'){
        let currentEmployee;
        let updatedSalary = Number($('#editEmployeeFromDOM').val());
        let employeeNumber = $(this).parent()
            .siblings('td.employeeNumber')
            .data('employeenumber');
        for(let employee of employeeDataBase){ //searching database to update info, since here, using values below
            if(employeeNumber === Number(employee.employeeNumber)){
                currentEmployee = employee;
                currentEmployee.annualSalary = updatedSalary;
            }
        }
        $(this).parent()
            .siblings(".employeeSalary")
            .empty()
            .text(`${formatter.format(currentEmployee.annualSalary)}`);
        $(this).parent()
            .siblings(".employeeSalary")
            .data('salary', currentEmployee.annualSalary)
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
            budgetEvent(Math.abs(oldSalary - updatedSalary));
        editorMode = false;
    } else {
        window.alert('One at a Time!');
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