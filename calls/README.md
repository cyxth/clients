# cyxth calls

Add video calls, audio calls and meetings to your application with cyxth fast and scalable calls api.

here is a sample flow

install packages

```sh
# cyxth core
npm install @cyxth/core

# cyxth chat
npm install @cyxth/calls

```

initialize calls

```js
import Cyxth from '@cyxth/core';
import Calls from '@cyxth/calls';

// initialize cyxth
const cyxth = new Cyxth("YOUR_APP_URL");

// add calls plugin
cyxth.register([Calls]);

// authorize user
// check https://cyxth.com/docs/authorize for more info
await cyxth.connect(USER_TOKEN_SMH);

const calls: Calls = cyxth.calls("channelId",{
    joinPermission: "request",
});
```

start a call

```js
// start with media constraints
await call.start({audio: true, vide: true})

// or add and manage multiple MediaStreams
// ... assuming you have these functions smw
let camStream = getCamStream();
let screenStream = getScreenCats();

await call.start({
    streams: [
        {label: "cam", stream: camStream},
        {label: "screen-share", stream: screenStream}
    ]
})
```

listen for new calls, all users in channel get this event

```js
cyxth.on("new-call",(request) => {
    console.log(`new call request on ${request.channelId}`, request)
    call = request.accept({audio:true});
    // or reject request.reject()
    callConf()
})
```

or request to join a given call.

```js
const requestJoin = async () => {
    let res = await calls.request("channelId", {
        audio: true,
        video: true
    })

    if (res.accepted) {
        call = res.getCall();
        callConf()
    }
}
```

and lots more...

read more on calls  
[call example](https://cyxth.com/docs/advanced-chat)  
[call docs](https://cyxth.com/docs/calls)  
[calls reference](https://cyxth.com/docs/reference/classes/classes/calls.Calls)  
