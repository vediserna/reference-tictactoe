export default function webSocket(injected){
    const io = injected("io");
    const socketURI = injected("socketURI");

    console.debug("socketURI", socketURI);
    var socket = io.connect(socketURI);
    return socket;
}