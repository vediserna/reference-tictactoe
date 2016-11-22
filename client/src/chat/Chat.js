import React from 'react';
import _ from 'lodash';

export default function(injected){

    const commandPort =injected('commandPort');
    const eventRouter =injected('eventRouter');

    class Chat extends React.Component{
        constructor(){
            super();

            this.state={
                messageList:[],
                stats:{
                }
            };

            this.sendChatMessage = this.sendChatMessage.bind(this);
            this.unsentMessageChanged = this.unsentMessageChanged.bind(this);
        }
        sendChatMessage(){
            console.debug("Sending command message on command port ", this.state.unsentMessage);
//            socket.emit('issueCommand', );

            commandPort.routeMessage({type:"chatCommand", message: this.state.unsentMessage });
        }
        unsentMessageChanged(event){
            this.setState({
                unsentMessage: event.target.value
            })
        }

        componentWillMount(){
            eventRouter.on('chatMessageReceived', (messageObj)=>{
                var messageList = this.state.messageList;
                console.debug("Got chatMessageReceived event from server...", messageObj);
                messageList.push(messageObj);
                this.setState({
                    messageList:messageList
                });
            })
        }
        render(){

            var messages = _.map(this.state.messageList, (message, idx)=>{
                return <span key={idx}>{message.sender.userName} says {message.message}<p></p></span>
            });

            return (
                <div className="Chat">
                    <p></p>
                    { messages }
                    <p></p>

                    <textarea value={this.state.unsentMessage} onChange={this.unsentMessageChanged}></textarea>
                    <p></p>
                    <button onClick={this.sendChatMessage}>Send message</button>
                    <p></p>
                </div>
            )
        }
    }
    return Chat;
}