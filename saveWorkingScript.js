//Script for index
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
    }
];

let totalAnnualSalary = 0;



$(ready);
function ready(){
    console.log('readyIsGo');
    $(document).on('submit', '#employeeInputForm', addEmployeeToDataBase);
    $(document).on('click', 'svg', removeEmployee);
    //load database to DOM on initiation
    for(let employee of employeeDataBase){
        //addup total
        totalAnnualSalary += Number(employee.annualSalary);
        $('#tableBody').append(
            `<tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.employeeNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>${formatter.format(employee.annualSalary)}</td>
                <td>
                    <svg id="${employee.employeeNumber}" data-salary="${employee.annualSalary}"
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </td>
            </tr>`);
            $('#totalMonthlyDisplay').text(`Total Monthly: ${formatter.format(totalAnnualSalary)}`);
            overBudgetEvent()
    
    }
}


function addEmployeeToDataBase(){
    event.preventDefault();
    //create new object and push to database
    employeeDataBase.push({
        firstName: $('#firsNameInput').val(),
        lastName: $('#lastNameInput').val(),
        employeeNumber: $('#employeeNumberInput').val(),
        jobTitle: $('#jobTitleInput').val(),
        annualSalary: Number($('#annualSalaryInput').val()),
    })
    console.log(employeeDataBase);
    //append to DOM on addition
    $('#tableBody').append(
    `<tr>
        <td>${$('#firsNameInput').val()}</td>
        <td>${$('#lastNameInput').val()}</td>
        <td>${$('#employeeNumberInput').val()}</td>
        <td>${$('#jobTitleInput').val()}</td>
        <td>${formatter.format($('#annualSalaryInput').val())}</td>
        <td>
            <svg id="${$('#employeeNumberInput').val()}" data-salary="${Number($('#annualSalaryInput').val())}"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </td>
    </tr>`);
    //update price with potential to trigger red event
    totalAnnualSalary += Number($('#annualSalaryInput').val());
    overBudgetEvent()
    $('#totalMonthlyDisplay').text(`Total Monthly: ${formatter.format(totalAnnualSalary)}`);
    console.log(employeeDataBase);
    console.log($(this));
    $('.inputFeild').val('');
}


function overBudgetEvent(){
    if(totalAnnualSalary > 20000){
        $("footer").css("background-color", "red")
        $("footer").css("color", "white")
    }
}


function removeEmployee(){
    totalAnnualSalary -= Number($(this).data('salary'));
    $('#totalMonthlyDisplay').text(`Total Monthly: ${formatter.format(totalAnnualSalary)}`);
    $(this).parents('tr').remove()
    if(totalAnnualSalary <= 20000){
        $("footer").css("background-color", "antiquewhite")
        $("footer").css("color", "var(--bs-body-color)")
    }
}



var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    //SUPERSTOLEN from stackoverflow
    //https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
  });