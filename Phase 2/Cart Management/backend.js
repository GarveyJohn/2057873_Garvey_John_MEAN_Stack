var cartSize = 0;
var total = 0;
var temp1 = { name: "Xbox", quantity: 0, price: 499.99 };
var temp2 = { name: "Lamp", quantity: 0, price: 24.99 };
var temp3 = { name: "Couch", quantity: 0, price: 1790.00 };
var temp4 = { name: "Pencils", quantity: 0, price: 4.99 };
var arr = [temp1, temp2, temp3, temp4];
function add(name) {
    cartSize++;
    updateCartSize();
    var index = find(name);
    arr[index].quantity += 1;
    total += arr[index].price;
}
function find(name) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === name) {
            return i;
        }
    }
    return -1;
}
function updateCartSize() {
    document.getElementById("cartSize").innerHTML = cartSize.toString();
}
function createSession() {
    sessionStorage.setItem("arr", JSON.stringify(arr));
    sessionStorage.setItem("cartSize", JSON.stringify(cartSize));
    sessionStorage.setItem("total", JSON.stringify(total));
}
function cartLoader() {
    setVariables();
    addTable();
}
function setVariables() {
    arr = JSON.parse(sessionStorage.getItem("arr"));
    cartSize = JSON.parse(sessionStorage.getItem("cartSize"));
    total = JSON.parse(sessionStorage.getItem("total"));
}
function addTable() {
    document.getElementById("totalAmount").innerHTML = total.toString();
    var startTable = "<table border = 1px><tr><th>Item Name</th><th>Price</th><th>Quantity</th></tr>";
    var tableContent = "";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].quantity > 0) {
            tableContent = tableContent + "<tr><td>" + arr[i].name + "</td><td>" + arr[i].price + "</td><td>" + arr[i].quantity + "</td></tr>";
        }
    }
    var endTable = "</table>";
    tableContent = startTable + tableContent + endTable;
    document.getElementById("tableItems").innerHTML = tableContent;
}
