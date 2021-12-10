//Script for index
let emloyeeDataBase = [];

$(ready);
function ready(){
    console.log('readyIsGo');
    $(document).on('submit', '#employeeInputForm', addEmployeeToDataBase)
}

function addEmployeeToDataBase(){
    event.preventDefault()
    //create new object and push to database
    emloyeeDataBase.push({
        firstName: $('#firsNameInput').val(),
        lastName: $('#lastNameInput').val(),
        employeeNumber: $('#employeeNumberInput').val(),
        jobTitle: $('#jobTitleInput').val(),
        annualSalary: $('#annualSalaryInput').val(),
    })
    console.log(emloyeeDataBase);
    //append to DOM
    $('#tableBody').append(
    `<tr>
        <td>${$('#firsNameInput').val()}</td>
        <td>${$('#lastNameInput').val()}</td>
        <td>${$('#employeeNumberInput').val()}</td>
        <td>${$('#jobTitleInput').val()}</td>
        <td>${$('#annualSalaryInput').val()}</td>
        <td> :trash: </td>
    </tr>`)
    //update price with potential to trigger red event
}