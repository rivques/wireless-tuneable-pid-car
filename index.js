try{
let ws = new WebSocket("");
} catch {
    // error for empty string, just here for type hinting
}
function onWSConnect(e){
    document.querySelector('#connect-form [type="submit"]').value = "Connected"
    document.getElementById("interface").style.display = "block"
}
function onWSMessage(e){
    console.log("WebSocket message: " + e.data)
    if(e.data.startsWith("G:")){
        const gains = e.data.slice(2).split(",");
        document.getElementById("kP").value = gains[0]
        document.getElementById("kI").value = gains[1]
        document.getElementById("kD").value = gains[2]
        document.getElementById("setpoint").value = gains[3]
    } else if (e.data.startsWith("F:")){
        const curState = e.data.slice(2);
        document.getElementById("data").textContent = curState;
    }
}
function onWSClose(e){
    console.log("WebSocket closed, reason: " + e.reason)
    if(!e.wasClean){
        alert("Error: WebSocket terminated, reason: " + e.reason)
    }
    document.getElementById("interface").style.display = "none"
    const children = document.querySelectorAll("#connect-form input");
    for(const child of children){
        child.disabled = false;
    }
    document.querySelector('#connect-form [type="submit"]').value = "Connect"
}
document.getElementById("connect-form").onsubmit = (e) => {
    e.preventDefault(); // don't send a request to the server, everything is client-side
    // disable the form and try to connect
    const children = document.querySelectorAll("#connect-form input");
    for(const child of children){
        child.disabled = true;
    }
    document.querySelector('#connect-form [type="submit"]').value = "Connecting..."
    try{
        ws = new WebSocket(`ws://${document.getElementById("ip-addr").value}:${document.getElementById("port").value}`)
    }
    catch {
        onWSClose(new CloseEvent("init error"))
        return false;
    }
    ws.onopen = onWSConnect;
    ws.onmessage = onWSMessage;
    ws.onclose = onWSClose;
    return false; // don't submit the form
}
function updateGains(){
    const stringToSend = `${document.getElementById("kP").value.substr(0, 14)} ${document.getElementById("kI").value.substr(0, 14)} ${document.getElementById("kD").value.substr(0, 14)} ${document.getElementById("setpoint").value.substr(0, 14)}`;
    console.log(stringToSend);
    ws.send(stringToSend)
}
document.getElementById("kP").onchange = (e) => updateGains();
document.getElementById("kI").onchange = (e) => updateGains();
document.getElementById("kD").onchange = (e) => updateGains();
document.getElementById("setpoint").onchange = (e) => updateGains();