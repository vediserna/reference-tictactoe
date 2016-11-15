import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const io = window.io;

class App extends Component {
    constructor(){
        super();
        this.state={
            messages:"No messages",
            messageList:[],
            stats:{
            }
        }
    }
    componentWillMount(){
        this.socket = io.connect('http://localhost:8080/');
        this.socket.on('announcements', (data)=> {
            var msgs = this.state.messageList;
            msgs.push(data.message);
//            console.log('Got announcement:', data.message);
            this.setState({
                messageList:msgs,
                messages: msgs.join("\n")
            });
        });
        this.sendStupidMessage = this.sendStupidMessage.bind(this);

        this.socket.on('stats', (data)=> {
            console.debug("Got stats", data);
            this.setState({
                stats:data
            })
        });

    }
    sendStupidMessage(){
        this.socket.emit('event', { message: 'Hey, I have an important message!' });
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    {this.state.stats.numClients} connected clients
                </p>
                <button onClick={this.sendStupidMessage}>Send message</button>
                <p></p>
                <textarea value={this.state.messages}></textarea>
            </div>
        );
    }
}

export default App;
