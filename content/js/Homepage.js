window.onload = (event) => {
    console.log("ready");
};

document.addEventListener("DOMContentLoaded", function () {


    let submitButton = document.getElementById("searchlink");

    submitButton.onclick = submitDestination;



});

function submitDestination() {

    let destinationName = document.getElementById("dest").value;

    console.log(destinationName);

    let outgoing = document.getElementById("outgoing").value;
    let incoming = document.getElementById("incoming").value;
    let myVar = JSON.stringify({destination: destinationName, outgoing: outgoing, incoming: incoming});


    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/search', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            alert("finished request");

        }
    }
    console.log(myVar);
    xhr.send(myVar);




// xhr.send(new Int8Array());
// xhr.send(document);
}

/*

document.addEventListener("DOMContentLoaded", function () {

    let destination = document.getElementById("dest").value;
    let outgoing = document.getElementById("outgoing").value;
    let incoming = document.getElementById("incoming").value;


    const fs = require("fs");

    const saveData = (data) => {

        const finished = (error) => {
            if(error){
                console.log(error);
                return;
            }
        }

        const jsonData = JSON.stringify(data);
        fs.writeFile("data.json", jsonData, finished);


    }

    console.log(destination);

    let submitButton = document.getElementById("searchlink");

    submitButton.addEventListener("click", function(){

        let beimaReq = "https://www.bmeia.gv.at//reise-aufenthalt//reiseinformation//land//"+ destination+"//type//json//";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", beimaRes);
        xhr.onload = function(){

           saveData(JSON.parse(xhr.responseText))


        }

        beimaReq.send();




    });

    let searchBtn = document.getElementById("searchlink");
    searchBtn.addEventListener("click", function(){



        if (destination != null && incoming != null && outgoing != null){

            searchBtn.setAttribute("href", "desk.html");

        }


    })

});*/