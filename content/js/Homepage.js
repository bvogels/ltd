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
    if(destinationName != '' && outgoing != '' && incoming != '') {

        let myVar = JSON.stringify({destination: destinationName, outgoing: outgoing, incoming: incoming});


        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/search', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                createDesk();

            }
        }
        console.log(myVar);
        xhr.send(myVar);



    }
    else{
        alert("Please enter information");
    }
}



function createDesk(){

    document.getElementById("onchange").remove();

    let container = document.createElement("div");

    container.setAttribute("id", "onchange");
    container.setAttribute("class","container");

    let containerRow = document.createElement("div");
    container.setAttribute("class", "row");

    let container3 = document.createElement("div");
    container.setAttribute("class", "col-sm-6");

    let p = document.createElement("p");
    let pTxt = document.createTextNode("Your current query: Flight to Spain, Europe");

    p.appendChild(pTxt);
     //container4
    let p2 = document.createElement("p");
    let pTxt2 = document.createTextNode("Destination Airport: Sevilla (San Pablo Airport, SVQ)");

    p2.appendChild(pTxt2);

    //container5
    let p3 = document.createElement("p");
    let pTxt3 = document.createTextNode("Earliest Date: Monday, June 1st");

    container3.appendChild(p);
    containerRow.appendChild(container3);

    container.appendChild(containerRow);

    let container4 = document.createElement("div");
    container.setAttribute("class", "col-sm-6");

    container4.appendChild(p2);
    containerRow.appendChild(container4);

    let container5 = document.createElement("div");
    container.setAttribute("class", "col-sm-6");

    container5.appendChild(pTxt3);
    containerRow.appendChild(container5);

    let br = document.createElement("br");
    containerRow.appendChild(br);

    //container6
    let p4 = document.createElement("p");
    let pTxt4 = document.createTextNode("New Cases: 8186");

    let container6 = document.createElement("div");
    container.setAttribute("class", "col-sm-6");

    container6.appendChild(pTxt4);
    containerRow.appendChild(container6);

    //container7
    let p5 = document.createElement("p");
    let pTxt5 = document.createTextNode("Active Case: 240606");

    let container7 = document.createElement("div");
    container.setAttribute("class", "col-sm-6");

    container7.appendChild(pTxt5);
    containerRow.appendChild(container7);

    container.appendChild(containerRow);
    document.getElementById("mainHome").appendChild(containerRow);

    ///////////////////////////////////////////////////////////////////////////////////////////////

    let br1 = document.createElement("br");
    containerRow.appendChild(br1);
    let br2 = document.createElement("br");
    containerRow.appendChild(br2);

    let container8 = document.createElement("div");
    container8.setAttribute("class", "container");

    let x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);

    let y = document.createElement("TR");
    y.setAttribute("id", "myTr");

    document.getElementById("myTable").appendChild(y);

    let z = document.createElement("TD");
    let t = document.createTextNode("Airline");
    z.appendChild(t);

    let e = document.createTextNode(" ");
    z.appendChild(e);
    let t1 = document.createTextNode("Departure");
    z.appendChild(t1);

    let e1 = document.createTextNode(" ");
    z.appendChild(e1);

    let t2 = document.createTextNode("Arrival");
    z.appendChild(t2);

    let e2 = document.createTextNode(" ");
    z.appendChild(e2);

    let t3 = document.createTextNode("Duration");
    z.appendChild(t3);

    let e3 = document.createTextNode(" ");
    z.appendChild(e3);

    let t4 = document.createTextNode("Fare");
    z.appendChild(t4);

    document.getElementById("myTr").appendChild(z);

    let y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr");

    let z1 = document.createElement("TD");
    let t5 = document.createTextNode("Austrian Airlines");
    z1.appendChild(t5);

    let e4 = document.createTextNode(" ");
    z1.appendChild(e4);

    let t6 = document.createTextNode("13:45");
    z1.appendChild(t6);

    let e5 = document.createTextNode(" ");
    z1.appendChild(e5);

    let t7 = document.createTextNode("15:30");
    z1.appendChild(t7);

    let e6 = document.createTextNode(" ");
    z1.appendChild(e6);

    let t8 = document.createTextNode("2:05h");
    z1.appendChild(t8);

    let e7 = document.createTextNode(" ");
    z1.appendChild(e7);

    let t9 = document.createTextNode("375");
    z1.appendChild(t9);

    document.getElementById("myTable").appendChild(z1);


    document.getElementById("mainHome").appendChild(x);


}

