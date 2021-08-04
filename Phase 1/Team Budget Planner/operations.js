function reset() 
{
    document.getElementById("ClientName").value = "";
    document.getElementById("ProjectName").value = "";
    document.getElementById("Budget").value = "";
}
var arr = [];



function getInfo() 
{
    let data = {clientName: document.getElementById("ClientName").value,
    projectName: document.getElementById("ProjectName").value,
    budget: document.getElementById("Budget").value};
    arr.push(data);
    console.log(arr);
    sessionStorage.setItem("arr", JSON.stringify(arr));
}

function tables()
{
    let arr1 = sessionStorage.getItem("arr");
    let arrParse = JSON.parse(arr1);
    let startTable ="<table border = 1px><tr><th>Client Name</th><th>ProjectName</th><th>Budget</th></tr>";
    let tableContent = "";
    for(let i = 0; i < arrParse.length; i++)
    {
        tableContent = tableContent + "<tr><td>"+arrParse[i].clientName+"</td><td>"+arrParse[i].projectName+"</td><td>"+arrParse[i].budget+"</td></tr>";
    }

    let endTable="</table>";
    tableContent = startTable+tableContent+endTable;
    document.getElementById("table").innerHTML=tableContent;
}

function check()
{
    if(sessionStorage.getItem("arr") != null)
    {
        var temp = JSON.parse(sessionStorage.getItem("arr"));
        arr = temp;
    }
}


