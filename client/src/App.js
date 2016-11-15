import React from 'react';

export default function(injected){
    const logo = injected("logo");
    const ConnectedClients = injected("ConnectedClients");

    class App extends React.Component {
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
            this.sendStupidMessage = this.sendStupidMessage.bind(this);
        }
        sendStupidMessage(){
            this.socket.emit('event', { message: 'Hey, I have an important message!' });
        }
        render() {
            return (
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to HGOP 2016</h2>
                    </div>
                    <ConnectedClients></ConnectedClients>
                    <button onClick={this.sendStupidMessage}>Send message</button>
                    <p></p>
                    <textarea readOnly="readonly" value={this.state.messages} onChange={this.textAreaChanged}></textarea>
                </div>
            );
        }
    }
    return App;
};
