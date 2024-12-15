# cyxth calls

Easily add video and voice calls to your applications

## installation

```sh
npm install @cyxth/core @cyxth/calls
```

## example


```ts
import Cyxth from '@cyxth/core';
import Calls from '@cyxth/calls';

const APP_URL = "my-app.apps.cyxth.com";
const USER_TOKEN = "token_from_backend";

const cyxth = await new Cyxth("YOUR_APP_URL", [Calls]).connect(USER_TOKEN);

let call: Calls;

// start a new call
const startCall = (channel) => {
    call = cyxth.calls("channelId");
    await call.start({audio: true,})
    initCalls();
}

// listen for new calls in any channel
// all users in channel get "call" event
cyxth.on("call",async (request) => {
    // show accept/reject ui
    call = request.accept()
    initCalls();

    // or just decline with request.decline()
})


const initCalls = () => {
    call.on('user:join',(user) => {
    // .. show user avatar in ui
    })

    call.on('user:left',(data) => {
        // .. remove user from ui
    })

    // ... more call config and control
}


// ...
```

read more on calls.  

[calls guide](https://cyxth.com/docs/guides/calls).    

[calls reference](https://cyxth.com/docs/reference/classes/calls.Calls).  
