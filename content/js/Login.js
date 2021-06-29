function login(){
    let mail = document.getElementById("emailbox").value;
    let password = document.getElementById("passwordbox").value;

    fetch("/login",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"mail": mail, "password": password})
        }).then( res => {
        res.json().then(function(data) {
        if(data.Response === "usernotfound"){
                document.getElementById("Errorbox").innerHTML = "User not found";

            }
            else if(data.Response === "passwordincorrect"){
                document.getElementById("Errorbox").innerHTML = "Wrong Password";

            }
            else if(data.Response === "passwordcorrect"){
                getRecentSearched(mail);
                //getHomepage();
                //console.log("test");

        }
        });
    /*
        if ( res.redirected) {
            window.location.href = res.url;
        }
*/

    }).catch ( e => {
        console.log(e);
        // handle errors here

    });

}
function getHomepage(){
    //window.location.href = "/";
    createHomepage();
    let loginbutton = document.getElementById("navlogin");
    loginbutton.innerHTML = "Logout";
    loginbutton.setAttribute("onClick", "logout()");
}
function getRecentSearched(mail){
    fetch("/getRecentSearched",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"mail": mail})
        }).then( res => {
        res.json().then(function(data) {
            console.log(data);
            if(Object.keys(data).length === 0){
                getHomepage();
            }
            else{
                let loginbutton = document.getElementById("navlogin");
                loginbutton.innerHTML = "Logout";
                loginbutton.setAttribute("onClick", "logout()");
                createDesk(data);
            }
        });
    }).catch ( e => {
        console.log(e);
        // handle errors here

    });
}
function createaccount(){
let mail = document.getElementById("emailbox").value;
let password = document.getElementById("passwordbox").value;

    fetch("/createaccount",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"mail": mail, "password": password})
        }).then( res => {
        res.json().then(function(data) {
            console.log(data);
            if(data.Response === "Account created"){
                document.getElementById("Errorbox").innerHTML ="Account created";
            }
            else if(data.Response === "Account existed"){
                document.getElementById("Errorbox").innerHTML ="Account already exists";
            }

        });
    }).catch ( e => {
        console.log(e);
        // handle errors here

    });
}

function logout(){
    console.log("arrived in Method logout");
    fetch("/logout",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",

        }).then( res => {
            if ( res.redirected) {
                window.location.href = res.url;
            }
    }).catch ( e => {
        console.log(e);

    });
}

