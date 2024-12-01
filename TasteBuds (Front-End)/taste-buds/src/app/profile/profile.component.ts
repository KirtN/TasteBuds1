import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})

export class ProfileComponent implements OnInit{
  PROTOCOL = "https";
  LOCAL_IP = "localhost";
  LOCAL_PORT = "7067";

  login() {
    fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/user`)
    .then((response) => response.json())
    .then((user) => {
      const usernameForm: HTMLInputElement = document.getElementById("usernameInput") as HTMLInputElement;
      const passwordForm: HTMLInputElement = document.getElementById("passwordInput") as HTMLInputElement;
      let inputUsername = usernameForm.value;
      let inputPassword = passwordForm.value;
      
      for(let i = 0; i < user.length; i++) {
        if(inputUsername == user[i].username && inputPassword == user[i].pwd) {
          console.log("correct login!");

          sessionStorage.setItem("logged_in", "true");
          const loggedInPage: HTMLElement = document.getElementById("welcomePage") as HTMLElement;
          loggedInPage.setAttribute("style", "visibility:visible");
          const loginPage: HTMLElement = document.getElementById("loginPage") as HTMLElement;
          loginPage.setAttribute("style", "visibility:hidden");
          const username: HTMLElement = document.getElementById("usernameInfo") as HTMLElement;
          username.innerHTML = "Username: " + user[i].username;
          const fname: HTMLElement = document.getElementById("fnameInfo") as HTMLElement;
          fname.innerHTML = "First Name: " + user[i].first_name;
          const lname: HTMLElement = document.getElementById("lnameInfo") as HTMLElement;
          lname.innerHTML = "Last Name: " + user[i].last_name;
          const email: HTMLElement = document.getElementById("emailInfo") as HTMLElement;
          email.innerHTML = "Email: " + user[i].email;
          const incorrect: HTMLElement = document.getElementById("incorrectLogin") as HTMLElement;
          incorrect.setAttribute("style", "visibility:hidden");

          sessionStorage.setItem("user", JSON.stringify({
            user_id: user[i].user_id,
            username: user[i].username,
            first_name: user[i].first_name,
            last_name: user[i].last_name,
            email: user[i].email,
          }));

          let user_id = JSON.parse(sessionStorage.getItem("user")!).user_id;
          const ingredient_ids: number[] = [];
          fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/pantry`)
          .then((response) => response.json())
          .then((pantry) => {
            for(let i = 0; i < pantry.length; i++) {
              if(user_id == pantry[i].user_id) {
                ingredient_ids.push(pantry[i].ingredient_id);
              }
            }
            sessionStorage.setItem("ingredient_ids", JSON.stringify(ingredient_ids));
          });
          return;
        }
      }
      console.log("incorrect login");
      const incorrect: HTMLElement = document.getElementById("incorrectLogin") as HTMLElement;
      incorrect.setAttribute("style", "visibility:visible");
    });
  }

  loadDetails() {
    if (sessionStorage.getItem("user") === null) {
      sessionStorage.setItem("logged_in", "false");
      this.backToLogin();
      return;
    }
    const user = JSON.parse(sessionStorage.getItem("user")!);

    const loggedInPage: HTMLElement = document.getElementById("welcomePage") as HTMLElement;
    loggedInPage.setAttribute("style", "visibility:visible");
    const loginPage: HTMLElement = document.getElementById("loginPage") as HTMLElement;
    loginPage.setAttribute("style", "visibility:hidden");
    const username: HTMLElement = document.getElementById("usernameInfo") as HTMLElement;
    username.innerHTML = "Username: " + user.username;
    const fname: HTMLElement = document.getElementById("fnameInfo") as HTMLElement;
    fname.innerHTML = "First Name: " + user.first_name;
    const lname: HTMLElement = document.getElementById("lnameInfo") as HTMLElement;
    lname.innerHTML = "Last Name: " + user.last_name;
    const email: HTMLElement = document.getElementById("emailInfo") as HTMLElement;
    email.innerHTML = "Email: " + user.email;
    const incorrect: HTMLElement = document.getElementById("incorrectLogin") as HTMLElement;
    incorrect.setAttribute("style", "visibility:hidden");
  }

  loadRegisterPage() {
    const loginPage: HTMLElement = document.getElementById("loginPage") as HTMLElement;
    loginPage.setAttribute("style", "visibility:hidden");
    const registerPage: HTMLElement = document.getElementById("registerPage") as HTMLElement;
    registerPage.setAttribute("style", "visibility:visible");
  }

  register() {
    const fname_field: HTMLInputElement = document.getElementById("firstnameInputRegister") as HTMLInputElement;
    const lname_field: HTMLInputElement = document.getElementById("lastnameInputRegister") as HTMLInputElement;
    const email_field: HTMLInputElement = document.getElementById("emailInputRegister") as HTMLInputElement;
    const username_field: HTMLInputElement = document.getElementById("usernameInputRegister") as HTMLInputElement;
    const password_field: HTMLInputElement = document.getElementById("passwordInputRegister") as HTMLInputElement;
    
    let fname = fname_field.value;
    let lname = lname_field.value;
    let email = email_field.value;
    let uname = username_field.value;
    let password = password_field.value;
    
    const incorrect: HTMLElement = document.getElementById("incorrectRegister") as HTMLElement;
    if(fname == "" || lname == "" || email == "" || uname == "" || password == "") {
      incorrect.setAttribute("style", "visibility:visible");
      return;
    }
    incorrect.setAttribute("style", "visibility:hidden");

    // POST request
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/user`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        Username: uname,
        First_name: fname,
        Last_name: lname,
        Pwd: password,
        Email: email
      })
    })

    // Go to profile
    const loginPage: HTMLElement = document.getElementById("loginPage") as HTMLElement;
    loginPage.setAttribute("style", "visibility:hidden");
    const registerPage: HTMLElement = document.getElementById("registerPage") as HTMLElement;
    registerPage.setAttribute("style", "visibility:hidden");
  }

  backToLogin() {
    const loginPage: HTMLElement = document.getElementById("loginPage") as HTMLElement;
    loginPage.setAttribute("style", "visibility:visible");
    const registerPage: HTMLElement = document.getElementById("registerPage") as HTMLElement;
    registerPage.setAttribute("style", "visibility:hidden");
    const incorrectRegister: HTMLElement = document.getElementById("incorrectRegister") as HTMLElement;
    incorrectRegister.setAttribute("style", "visibility:hidden");
    const incorrectLogin: HTMLElement = document.getElementById("incorrectLogin") as HTMLElement;
    incorrectLogin.setAttribute("style", "visibility:hidden");
  }
  
  ngOnInit(){
    const pantryButton: HTMLElement = document.getElementById("pantryButton") as HTMLElement;
    const recipeButton: HTMLElement = document.getElementById("recipeButton") as HTMLElement;
    const profileButton: HTMLElement = document.getElementById("profileButton") as HTMLElement;
    pantryButton.setAttribute("style", "background-color:#282828 !important");
    recipeButton.setAttribute("style", "background-color:#282828 !important");
    profileButton.setAttribute("style", "background-color:#42463f !important");

    const logged_in = sessionStorage.getItem("logged_in");
    if(logged_in == "true") {
      this.loadDetails();
    } else {
      console.log("not logged in :(");
    }
  }
  
}
