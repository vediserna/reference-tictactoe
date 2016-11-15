export default function webSocket(injected){
    const io = injected("io");
    // const url = injected("socketUrl");

    var socket = io.connect('http://localhost:8080/');
    return socket;
}