class account
{
    constructor(fname, lname, gender, email, date)
    {
        this.fname = fname;
        this.lname = lname;
        this.gender = gender;
        this.email = email;
        this.date = date;
    }
}

let date_ob = new Date();
let readline= require("readline-sync");
let fname = readline.question("Enter your first name: ");
let lname = readline.question("Enter your last name: ");
debugger;
let gender = readline.question("Enter your gender:  ");
let email = readline.questionEMail("Enter your email address: ");

let employee = new account(fname, lname,gender,email,date_ob);
debugger;
let fs = require("fs");
let employees = [];
employees = JSON.parse(fs.readFileSync("employees.json").toString());
debugger;
employees.push(employee);
fs.writeFileSync("employees.json",JSON.stringify(employees));
