let arr = [];

function getData()
{
    let info = {title: document.getElementById("theTitle").value,
    article: document.getElementById("theArticle").value,
    image: document.getElementById("theImage").value
    };
    let beginning = "<div class=\"col-4\">";
    let body ="";
    if(info.title === "")
    {
        body = "<h3>Title</h3>";
    }
    else
    {
        body = "<h3>" + info.title + "</h3>";
    }
    if(info.article === "")
    {
        body = body + "<p>Article</p>";
    }
    else
    {
        body = body + "<p>" + info.article + "</p>";
    }
    if(info.image === "")
    {
        body = body + "<img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv0JqIuordcbJ4-09I6QGkdCwgnWv6lYDfww&usqp=CAU\" style = \"width = 50px height = 38px\"" + "/>";
    }
    else
    {
        body = body + "<img src=\"" + info.image + "\" style = \"width = 50px height = 38px\"" + "/>";
    }
    let ending = "</div>";
    let all = beginning + body + ending;
    arr.push(all);
    addOntoPage();
}

function addOntoPage()
{
    let allTogether = ""
    for(let i = 0; i < arr.length; i++)
    {
        allTogether= allTogether + arr[i];
    }
    document.getElementById("grids").innerHTML=allTogether;
}

function reset() 
{
    document.getElementById("theTitle").value = "";
    document.getElementById("theArticle").value = "";
    document.getElementById("theImage").value = "";
}