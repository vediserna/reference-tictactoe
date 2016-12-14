##Test Examples
### Create game commands
* Emits game created event

### Join game commands
* Emits game joined event
* Emits game full event

### Place move commands
* Emits MovePlaced event on first game move
#TODO:
* Emits IllegalMove event when a square is already occupied
* Emits NotYourMove event if player tries to make a move out of turn
* Emits GameWon event if player wins
* Does not emit GameDraw event if game is won on last move
* Emits GameDraw if neither player wins