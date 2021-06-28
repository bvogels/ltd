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
            console.log(data);
        if(data.Response === "usernotfound"){
                document.getElementById("Errorbox").innerHTML = "User not found";
                console.log("usernotfound");
            }
            else if(data.Response === "passwordincorrect"){
                document.getElementById("Errorbox").innerHTML = "Wrong Password";
            console.log("incorrect pw");
            }
            else if(data.Response === "passwordcorrect"){
            console.log("correct");
            createDesk();
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