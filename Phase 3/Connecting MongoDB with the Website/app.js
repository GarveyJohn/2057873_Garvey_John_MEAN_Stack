let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.pluralize(null);

let courseSchema= mongoose.Schema({
    courseID:{type:String,unique:true},
    courseName:String,
    description:String,
    amount:String
});

let courseModule = mongoose.model("courseSchema", courseSchema);

let url = "mongodb://localhost:27017/tcsmean"

//mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));



app.get("/",(request,response)=> {
    response.sendFile(__dirname + "/index.html");
})

app.get("/index",(request,response)=> {
    response.sendFile(__dirname + "/index.html");
})

app.get("/addCourse",(request,response)=> {
    response.sendFile(__dirname + "/addCourse.html");
})

app.get("/updateCourse",(request,response)=> {
    response.sendFile(__dirname + "/updateCourse.html");
})

app.get("/deleteCourse",(request,response)=> {
    response.sendFile(__dirname + "/deleteCourse.html");
})

app.get("/fetchCourses",(request,response)=> {
    
    let table = ""
    mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));
    let db = mongoose.connection;
    db.once("open", ()=>{
        
        courseModule.find({},(err,doc)=> {
            if(!err){
                let startTable ="<div><h2>All Courses</h2><br><table border = 1px><tr><th>Course ID</th><th>Course Name</th><th>Description</th><th>Amount</th></tr>";
                let tableContent = "";
                    doc.forEach(rec=> {
                        //console.log(rec);
                        tableContent+="<tr><td>"+rec.courseID+"</td><td>"+rec.courseName+"</td><td>"+rec.description+"</td><td>"+rec.amount+"</td></tr>"
                    })
                    let endTable="</table><br><a href='index'>Back</a></div>";
                    table = startTable+tableContent+endTable
                    response.send(table);
            }else {
                console.log(err);
            }
            mongoose.disconnect();
        })
    })
    
})

app.post("/register",(request,response)=>{
    let courseDetail = request.body;

    mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));
    let db = mongoose.connection;
    db.once("open", ()=>{
        
        let p1 = new courseModule({courseID:courseDetail.courseID,courseName:courseDetail.courseName,description:courseDetail.description,amount:courseDetail.description});
        
        courseModule.insertMany(p1, (err,result)=>{
            if(!err)
            {
                console.log(result);
            }
            else
            {
                console.log(err);
            }
            mongoose.disconnect();
        })
    })
    response.sendFile(__dirname+"/index.html");
});

app.post("/updateAmount",(request,response)=>{
    let courseDetail = request.body;
    mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));
    let db = mongoose.connection;
    db.once("open", ()=>{
        
        courseModule.updateOne({courseID:courseDetail.courseID},{$set:{amount:courseDetail.amount}},(err,result)=> {
            if(!err){
                console.log(result)
            }else {
                console.log(err);
            }
            mongoose.disconnect();
        })
    })
    response.sendFile(__dirname+"/index.html");
})

app.post("/deleteCourse",(request,response)=>{
    let courseDetail = request.body;
    mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));
    let db = mongoose.connection;
    db.once("open", ()=>{
        
        courseModule.deleteOne({courseID:courseDetail.courseID},(err,result)=> {
            if(!err){
                console.log(result)
            }else {
                console.log(err);
            }
            mongoose.disconnect();
        })
    })
    response.sendFile(__dirname+"/index.html");
})


app.listen(9090,()=>console.log("Server running on port number 9090"))
