document.addEventListener("DOMContentLoaded", function () {
    let destination = document.getElementById("dest").value;
    console.log(destination);

    let submitButton = document.getElementById("searchlink");

    submitButton.onclick = submitDestination;

    function submitDestination() {


    }

});


document.addEventListener("DOMContentLoaded", function () {

    let destination = document.getElementById("dest").value;
    let outgoing = document.getElementById("outgoing").value;
    let incoming = document.getElementById("incoming").value;

    let destLink = document.getElementById("destLink").href= destination;

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

});