// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}
function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord);
}
function createTimeInEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(' ');
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date
  });
  return employeeRecord;
}
function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return employee;
}
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(e => e.date === date);
  const timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, e) => {
    return total + wagesEarnedOnDate(employee, e.date);
  }, 0);
}

function calculatePayroll(employees) {
  return employees.reduce((total, emp) => total + allWagesFor(emp), 0);
}
