# cyxth chat api

Easily add fast and scalable chat functionality to your application
with cyxth chat api.

install the packages

```sh
#  core
npm install @cyxth/core

#  chat
npm install @cyxth/chat
```

initialize cyxth chat

```js
import Cyxth from '@cyxth/core';
import Chat from '@cyxth/chat';

// initialize cyxth
const cyxth = new Cyxth("YOUR_APP_URL");

// add the chat plugin
cyxth.register([Chat]);

// authorize user
// check https://cyxth.com/docs/authorize for more info
await cyxth.connect(USER_TOKEN_SMH);
const chat: Chat = cyxth.chat();
```

sending a message

```js
// ..
// simple text message
chat.send("channelId", "hello world");

//or custom data message with reply
chat.send("channelId", {
    data : {
        wallet_qr: "private.png",
        amount: 0.0006,
        productId: "product"
    },
    replyTo: '7890897834984'
})

// ...
```

receive and handle messages

```js
chat.on("message",(msg) => {
    console.log(`message on ${msg.channelId} from ${msg.sender}`,msg)
})
```

read more  
[cyxth quick start](https://cyxth.com/docs/simple-chat)  
[chat reference](https://cyxth.com/docs/reference/classes/chat.Chat)  
[chat example](https://cyxth.com/docs/advanced-chat)  
[cyxth docs](https://cyxth.com/docs)
