let express = require("express");
let app = express();
let ws = require("express-ws")(app);
let counter = 0;
let option1 = false;
let option2 = false;
let option3 = false;
let check = true;
let flag = true;
let s = "How would you like us to help you? Please write in the number for the question you want answered.\n"
            s += "1 Get a team members email. "
            s += "2 Get a team members ID. "
            s += "3 Send a report to the manager of the team."

app.get("/",(request,response)=> {
    response.sendFile(__dirname+"/index.html");
})

app.ws("/",(socket,request)=> {
    console.log("Client connected");

    // recieve message from client application 
    socket.on("message",(msg)=> {
        counter++;
        if(msg === "1" && check)
        {
            check = false;
            option1 = true;
        }
        else if(msg === "2" && check)
        {
            check = false;
            option2 = true;
        }
        else if(msg === "3" && check)
        {
            check = false;
            option3 = true;
        }

        if(counter == 1 && flag)
        {
            socket.send(s);
        }
        else if(option1 && flag)
        {
            if(msg === "a")
            {
                flag = false;
                socket.send("Garvey's email is garvey@tcs.com");
                socket.send("Hope I was able to help, session is ending now.")
            }
            else if(msg === "b")
            {
                flag = false;
                socket.send("Tim's email is tim@tcs.com");
                socket.send("Hope I was able to help, session is ending now.")
            }
            else if(msg === "c")
            {
                flag = false;
                socket.send("Jace's email is jace@tcs.com");
                socket.send("Hope I was able to help, session is ending now.")
            }
            else
            {
                s = "Whose email would you like? a Garvey b Tim c Jace"
                socket.send(s);
            }
        }
        else if(option2 && flag)
        {
            if(msg === "a")
            {
                flag = false;
                socket.send("Garvey's ID is 100");
                socket.send("Hope I was able to help, session is ending now.")
            }
            else if(msg === "b")
            {
                flag = false;
                socket.send("Tim's ID is 101");
                socket.send("Hope I was able to help, session is ending now.")
            }
            else if(msg === "c")
            {
                flag = false;
                socket.send("Jace's ID is 102");
                socket.send("Hope I was able to help, session is ending now.")
            }
            else
            {
                s = "Whose ID number would you like? a Garvey b Tim c Jace"
                socket.send(s);
            }
        }
        else if(option3 && flag)
        {
            if(counter == 2)
            {
                socket.send("Please type the message you would like to deliver to your manager.");
            }
            else
            {
                flag = false;
                socket.send("We will send your message to the manager.")
                socket.send("Hope I was able to help, session is ending now.")
            }
        }
        else if(flag)
        {
            socket.send("Sorry we didnt get that.\n" + s)
        }

        
        console.log(msg);
        
    });
    // This is use to send the data to the client application.
    socket.send("Hello Client, You are connect the Socket Server App! Please type a greeting to start chatting with our services.");
})

app.listen(9090,()=>console.log("Server running on port number 9090"))