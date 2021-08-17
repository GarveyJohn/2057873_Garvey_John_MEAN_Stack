import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { contactInfo } from './contactInfo';
import { userPass } from './userPass';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  login:boolean =true;
  portfolio:boolean = false;
  register:boolean = false;
  userPassArr:Array<userPass> =[{firstNme:"Garvey",lastName:"John",username:"gjohn",password:"1234", contactInfo:[]}];
  currentUser:userPass = this.userPassArr[-1];
  currentContact:Array<contactInfo> = [];
  constructor() { }

  ngOnInit(): void {
  }

  showReg()
  {
    this.login = false;
    this.portfolio= false;
    this.register = true;
  }

  showLogin()
  {
    this.login = true;
    this.portfolio= false;
    this.register = false;
  }

  showPort()
  {
    this.currentContact = this.currentUser.contactInfo;
    this.login = false;
    this.portfolio= true;
    this.register = false;
  }

  addUserPass(fNameRef:any, lNameRef:any, userRef:any,passRef:any)
  {
    let temp:userPass = {firstNme:fNameRef.value, lastName:lNameRef.value, username:userRef.value, password:passRef.value,contactInfo:[]};
    this.userPassArr.push(temp);
    this.showLogin();
  }

  navPort(userRef:any, passRef:any)
  {
    let username:string = userRef.value;
    let password:string = passRef.value;

    if(this.checkUserPass(username,password))
    {
      this.currentUser = this.setCurrentUser(username, password)
      this.showPort();
    }
    else
    {
      alert("Sorry! You have entered the wrong username and/or password");
    }
  }
  checkUserPass(userRef:any, passRef:any):boolean
  {
    let username:string = userRef;
    let password:string = passRef;
    for(let i =0; i < this.userPassArr.length; i++)
    {
      if(username === this.userPassArr[i].username && password === this.userPassArr[i].password)
      {
        return true
      }
    }
    return false;
  }

  setCurrentUser(userRef:string, passRef:string):userPass
  {
    let username:string = userRef;
    let password:string = passRef;
    for(let i =0; i < this.userPassArr.length; i++)
    {
      if(username === this.userPassArr[i].username && password === this.userPassArr[i].password)
      {
        return this.userPassArr[i];
      }
    }
    return this.userPassArr[-1];
  }

  addContact(contactName:any, phoneNum:any)
  {
    let temp:contactInfo = {name:contactName.value, phoneNumber:phoneNum.value}
    this.currentUser.contactInfo.push(temp);
    this.currentContact = this.currentUser.contactInfo;
  }

}
