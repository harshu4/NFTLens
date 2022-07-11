
let a = 1;
let currentselect = 0;
const socket = io("https://lensar.herokuapp.com/");

const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")

console.log("Connected to devnet")


//document.getElementById("hola").addEventListener("click",abc);
console.log("what the fuck is this");
async function abc(d) {
    index = d.currentTarget.id
    val = d.currentTarget.src
    indexc = document.getElementById(currentselect).id
    valc = document.getElementById(currentselect).src
    console.log(val);
    document.getElementById(currentselect).classList.add("border-bg")
    document.getElementById(currentselect).classList.remove("border-bg-select")

    document.getElementById(index).classList.remove("border-bg")
    document.getElementById(index).classList.add("border-bg-select")
    localStorage.setItem("current", index);

    currentselect = index
}



async function login() {
    await client.connect()
    if (localStorage.getItem("usertoken")){
        document.getElementById("main").style.display = "block";
    document.getElementById('loader').style.display = "none"
        loaddata()

    }
    else{
    socket.emit("signin");
    }

}

socket.on("qr", (src) => {
    document.getElementById('qr').src = src;
    document.getElementById('loader').style.display = "none"
    document.getElementById('signin').style.display = "block"

    // ...
});


socket.on("usertoken", (token, account) => {
    submitlogin(token, account);
})

function submitlogin(token,account) {

    localStorage.setItem("usertoken", token);
    localStorage.setItem("account", account);
    document.getElementById("main").style.display = "block";
    document.getElementById("signin").style.display = "none"
    loaddata()

}

async function loaddata() {
    window.nfts = await client.request({
        method: "account_info",
        account: localStorage.getItem("account") 
    })
    document.getElementById("amount").innerText=parseFloat(window.nfts.result.account_data.Balance/10**6).toFixed(2);
    document.getElementById("address").innerText = localStorage.getItem("account")
    window.nftss = await client.request({
        method: "account_nfts",
        account: localStorage.getItem("account") 
    })
    let inject = '<div style="width: 40%; display: flex; justify-content: center;padding-top: 20px;"><img src="qr.png" style="height: 120px;width: 120px;"></div>'
    nftss.result.account_nfts.forEach((val, index) => {
        document.getElementById("nfthold").innerHTML += `<div style="width: 40%; display: flex; justify-content: center;padding-top: 20px;"><img class="box border-bg clip-bg" src=${val.uri} myparam=dfddf id=${index}  style="height: 120px;width: 120px;"></div>`

    })
    nftss.result.account_nfts.forEach((val, index) => {
        document.getElementById(index).addEventListener("click", abc);
    })
    let ab = await localStorage.getItem("current")
    if (ab != null) {
        document.getElementById(ab).classList.remove("border-bg")
        document.getElementById(ab).classList.add("border-bg-select")
        currentselect = localStorage.getItem("current")

    }
}

login()