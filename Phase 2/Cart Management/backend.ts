interface item
{
    name:string;
    quantity:number;
    price:number;
}
let cartSize = 0;
let total = 0;

let temp1:item = {name:"Xbox", quantity:0, price:499.99}; 
let temp2:item = {name:"Lamp", quantity:0, price:24.99};
let temp3:item = {name:"Couch", quantity:0, price:1790.00}
let temp4:item = {name:"Pencils", quantity:0, price:4.99}

let arr:item[] = [temp1,temp2,temp3,temp4];



function add(name:string)
{
    cartSize++;
    updateCartSize();
    let index = find(name);
    arr[index].quantity +=  1;
    total += arr[index].price;
}

function find(name:string): number
{
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i].name === name)
        {
            return i;
        }
    }
    return -1;
}

function updateCartSize()
{
    document.getElementById("cartSize").innerHTML = cartSize.toString();
}

function createSession()
{
    sessionStorage.setItem("arr", JSON.stringify(arr));
    sessionStorage.setItem("cartSize", JSON.stringify(cartSize));
    sessionStorage.setItem("total", JSON.stringify(total));
}

function cartLoader()
{
    setVariables();
    addTable()
}

function setVariables()
{
    arr = JSON.parse(sessionStorage.getItem("arr"));
    cartSize = JSON.parse(sessionStorage.getItem("cartSize"));
    total = JSON.parse(sessionStorage.getItem("total"))
}

function addTable()
{
    document.getElementById("totalAmount").innerHTML = total.toString();
    let startTable ="<table border = 1px><tr><th>Item Name</th><th>Price</th><th>Quantity</th></tr>";
    let tableContent = "";
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i].quantity > 0)
        {
            tableContent = tableContent + "<tr><td>"+arr[i].name+"</td><td>"+arr[i].price+"</td><td>"+arr[i].quantity+"</td></tr>";
        }
    }
    let endTable="</table>";
    tableContent = startTable+tableContent+endTable;
    document.getElementById("tableItems").innerHTML=tableContent;
}