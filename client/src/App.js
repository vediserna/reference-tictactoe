import React from 'react';
import _ from 'lodash';

export default function(injected){
    const logo = injected("logo");
    const ConnectedClients = injected("ConnectedClients");
    const socket = injected('socket');

    class App extends React.Component {
        constructor(){
            super();
            this.state={
                messageList:[],
                stats:{
                },
                users:{

                },
                me:{
                    userName:""
                }
            }
            this.sendChatMessage = this.sendChatMessage.bind(this);
            this.userNameChanged = this.userNameChanged.bind(this);
            this.unsentMessageChanged = this.unsentMessageChanged.bind(this);
        }
        componentWillMount(){

            socket.on('userJoined', (user)=>{
                var users = this.state.users;
                users[user.clientId] = user;
                this.setState({users:users});
            });
            socket.on('userAcknowledged', (user)=>{
                this.setState({me:user});
            });
            socket.on('userLeft', (user)=>{
                var users = this.state.users;
                delete users[user.clientId];
                this.setState({users:users});
            });
            socket.on('userChanged', (user)=>{
                var users = this.state.users;
                users[user.clientId] = user;
                if(user.clientId === this.state.me.clientId){
                    this.setState({
                        me:user
                    })
                }
                this.setState({
                    users:users
                });
            });
            socket.on('usersConnected', (users)=>{
                this.setState({users:users});
            });
            socket.on('messageReceived', (messageObj)=>{
                var messageList = this.state.messageList;
                messageList.push(messageObj);
                this.setState({
                    messageList:messageList
                });
            })
        }
        sendChatMessage(){
            console.debug("Sending message on socket ", this.state.unsentMessage);
            socket.emit('sendMessage', { message: this.state.unsentMessage });
        }
        userNameChanged(event){
            socket.emit('changeUserName',{userName:event.target.value})
        }
        unsentMessageChanged(event){
            this.setState({
                unsentMessage: event.target.value
            })
        }
        render() {

            var users = _.map(this.state.users, (user)=>{
                return <span key={user.clientId}>{user.clientId}:{user.userName}</span>
            });
            var messages = _.map(this.state.messageList, (message, idx)=>{
                return <span key={idx}>{message.sender.userName} says {message.message}</span>
            });

            return (
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to HGOP 2016</h2>
                    </div>
                    <ConnectedClients></ConnectedClients>

                    <p></p>
                    { messages }
                    <p></p>

                    <textarea value={this.state.unsentMessage} onChange={this.unsentMessageChanged}></textarea>
                    <p></p>
                    <button onClick={this.sendChatMessage}>Send message</button>
                    <p></p>

                    <p></p>
                    <label>Alias</label>
                    <input type="text" value={this.state.me.userName} onChange={this.userNameChanged}></input>
                    <p></p>

                    <div className="connectedUsers">
                        {users}
                    </div>

                    <div className="footer">
                        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
                    </div>
                </div>
            );
        }
    }
    return App;
};
