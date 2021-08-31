let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
let fs = require("fs");

class account
{
    constructor(empID, taskID, task, deadline)
    {
        this.empID = empID;
        this.taskID = taskID;
        this.task = task;
        this.deadline = deadline;
    }
}

let listOfTask = [];

app.get("/",(request,response)=> {
    response.send(htmlCode + addTask());
})

app.get("/addTask",(request,response)=> {
    listOfTask = JSON.parse(fs.readFileSync("tasks.json").toString());
    let empID = request.query["empID"];
    let taskID = request.query["taskID"];
    let found = listOfTask.find(t=>t.taskID == taskID);
    let task = request.query["task"];
    let deadline = request.query["deadline"];
    if(found != undefined)
    {
        response.send("Sorry, you entered a Task ID that was already in the system. Please reload and try again.")
    }
    else{
    let temp = new account(empID,taskID,task,deadline);
    listOfTask.push(temp);
    fs.writeFileSync("tasks.json",JSON.stringify(listOfTask));
    response.send(htmlCode + addTask());
    }
    
    
})

app.get("/deleteTask",(request,response)=> {
    listOfTask = JSON.parse(fs.readFileSync("tasks.json").toString());
    let found = listOfTask.findIndex(index=>index.taskID == request.query["deleteTask"]);
    
    if(found != -1)
    {
        listOfTask.splice(found, 1);
    }
    fs.writeFileSync("tasks.json",JSON.stringify(listOfTask));
    response.send(htmlCode + addTask());
})

app.listen(9090,()=>console.log("Server running on port number 9090"))



function addTask()
{
    listOfTask = JSON.parse(fs.readFileSync("tasks.json").toString());
    let startTable ="<div><table border = 1px><tr><th>Employee ID</th><th>Task ID</th><th>Task</th><th>DeadLine</th></tr>";
    let tableContent = "";
    for(let i = 0; i < listOfTask.length; i++)
    {
        tableContent += "<tr><td>"+listOfTask[i].empID+"</td><td>"+listOfTask[i].taskID+"</td><td>"+listOfTask[i].task+"</td><td>"+listOfTask[i].deadline+"</td></tr>"
    }

    let endTable="</table></div></body></html>";
    tableContent = startTable+tableContent+endTable;
    return tableContent;
}

let htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <h2>Task Planner</h2>
    </div>
    <div>
        <h3>Add Task</h3>
        <br>
        <form action="addTask" method="GET">
            <label>Employee ID: </label><input type="text" name="empID" required> <br>
            <label>Task ID: </label><input type="text" name="taskID" required> <br>
            <label>Task: </label><input type="text" name="task" required> <br>
            <label>Deadline: </label><input type="date" name="deadline" required> <br>
            <input type="submit" value="Add Task">
            <input type="reset" value="Reset">
        </form>
    </div>
    <div>
        <h3>Delete Task</h3>
        <form action="deleteTask" method="GET">
            <label>Task ID: </label> <input type="text" name="deleteTask"><br>
            <input type="submit" value="Delete Task">
            <input type="reset" value="Reset">
        </form>
    </div>
    <div>
        <h3>List of Task</h3>
    </div>
`
