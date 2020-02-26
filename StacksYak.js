//*T*****************E******************H********************I***************** */
//**H**************R*** *************** **A****************G***O****************** */
//***I***********E******T************C******P************R*********************** */
//****S********H*********H*********I*********P*********E************************* */
//***** *****W************E******G************E******S*************************** */
//******I** *************** ***A***************N*** ***************************** */
//*******S******************M*******************S***************************** */

// console.log("this is sparta")

const url = 'https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=59d136b8-5233-4957-bb79-37b3690e5c8c'
const userURL = 'https://cs5003-api.host.cs.st-andrews.ac.uk/api/user?key=59d136b8-5233-4957-bb79-37b3690e5c8c'
const posturl = 'https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=59d136b8-5233-4957-bb79-37b3690e5c8c'
const voteURL = '/vote'
const dltURL = 'https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks/'
const keyURL = "?key=59d136b8-5233-4957-bb79-37b3690e5c8c"

let usrId
let myNickName
let myIDYaks


const columnNames = heading = ['votes', 'content', 'id', 'userVote', 'userNick', 'timestamp', 'voteDown', 'voteUp', 'Delete']

function getYaks() {
    let myYaks = fetch(userURL).then(USRResponse => USRResponse.json())
        .then(datos => {
            //console.log(datos)
            //console.log(datos.id)
            //console.log(datos.userNick)
            myIDYaks = datos.id
            myNickName = datos.userNick
        })
        .then(() =>
            fetch(url)
                .then(YakResponse => YakResponse.json())
                .then(dat => {
                    for (let i in dat) {
                        if (!dat[i].userNick) {
                            dat[i].userNick = "Anonymus"
                            // console.log(dat[i])
                        }
                    }
                    printTable(dat)
                }))
        .catch(err => console.log(err));
}

function postYak() {

    const initObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            content: newFunction()
        })

    };

    fetch(posturl, initObject)
        .then(response => response.json())
        .then(data => console.log("the message id is: " + newFunction()))
        .catch(err => console.log(err));

    function newFunction() {
        let getMessage = document.getElementById('thisMessage')
        getYaks();
        return getMessage.value;
    }
}

function deleteYaks(theID) {

    //i have to have the id of my own posts
    //fetch all my posts with their ids and delete only the one selected
    let yakId = theID
    fetch(dltURL + yakId + keyURL, {
        method: "DELETE"
    }).then(response => response.json())
        .then(messages => console.log(messages))
        .then(getYaks())
        .catch(err => console.log(err));
    getYaks()
}

function voteYaksDown(idPost) {
    const initObjectVote = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            direction: newVote()
        })
    };

    fetch(dltURL + idPost + voteURL + keyURL, initObjectVote)
        .then(response => response.json())
        .then(console.log(dltURL + idPost + keyURL, initObjectVote))
        .then(getYaks())
        .then(data => console.log("VoteDown"))
        .catch(err => console.log(err));

    function newVote() {
        let voto = "down"
        getYaks()
        return voto
    }
}

function voteYaksUp(idPost) {
    const initObjectVote = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            direction: newVote()
        })

    };

    fetch(dltURL + idPost + voteURL + keyURL, initObjectVote)
        .then(response => response.json())
        .then(console.log(initObjectVote))
        .then(getYaks())
        .then(data => console.log("VoteUp"))
        .catch(err => console.log(err));

    function newVote() {
        let voto = "up"
        getYaks()
        return voto
    }
}

function setNickname() {
    const initObjectNn = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userNick: newNickname()
        })
    };

    fetch(userURL, initObjectNn)
        .then(response => response.json())
        .then(getYaks())
        .then(data => console.log("what?: " + myNickName))
        .catch(err => console.log(err));

    function newNickname() {
        let getnickName = document.getElementById("nickName")
        getYaks()
        return getnickName.value;
    }

}

function printTable(list) {
    // i receive the list of the element that i want to print on screen.
    eraseTable()
    var myTableDiv = document.getElementById("table_library")
    var table = document.createElement('TABLE')
    table.className = "table table-striped";

    var tableBody = document.createElement('TBODY')
    table.setAttribute('id', 'mytable')
    table.border = '1'
    table.appendChild(tableBody);

    //TABLE COLUMNS
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')
        th.width = '150';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }
    //checking if we are printing the whole table or 
    // a filtered version of the table (print by)
    var result;
    if (list) {
        result = list
    } else {
        result = data
    }

    //TABLE ROWS
    result.forEach(yakis => {
        var tr = document.createElement('TR');
        //let myid = yakis.id
        //let myname = yakis.userNick
        // console.log(typeof yakis)

        for (col of columnNames) {
            var td = document.createElement('TD')
            if (col === 'Delete') {
                var deleteInput = document.createElement("input")
                deleteInput.type = "button"
                deleteInput.className = "button"
                deleteInput.value = "Delete"
                deleteInput.id = yakis.id
                deleteInput.addEventListener("click", function () {
                    deleteYaks(yakis.id)
                })
                if (yakis.userNick == myNickName) {
                    td.appendChild(deleteInput);
                }
            } else if (col === 'voteUp') {
                var voteUpInput = document.createElement("input")
                voteUpInput.type = "button"
                voteUpInput.className = "button"
                voteUpInput.value = "Up vote"
                voteUpInput.id = yakis.id
                voteUpInput.addEventListener("click", function () {
                    voteYaksUp(yakis.id)
                })
                td.appendChild(voteUpInput);



            } else if (col === 'voteDown') {
                var voteDownInput = document.createElement("input")
                voteDownInput.type = "button"
                voteDownInput.className = "button"
                voteDownInput.value = "Down vote"
                voteDownInput.id = yakis.id
                voteDownInput.addEventListener("click", function () {
                    voteYaksDown(yakis.id)
                })
                td.appendChild(voteDownInput);
            } else {
                td.appendChild(document.createTextNode(yakis[col]));
            }
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);

    })
    myTableDiv.appendChild(table)
}

function eraseTable() {
    var table = document.getElementById('mytable');
    if (table)
        table.parentNode.removeChild(table);
}

getYaks()