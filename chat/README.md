# cyxth chat api

a simple chat api built on top of cyxth to add 
chat functionality to your multiplayer applications.

## installation

```sh
npm install @cyxth/core @cyxth/chat
```

## initialize

initialize cyxth core and chat 

```ts
import Cyxth from '@cyxth/core';
import Chat from '@cyxth/chat';

const APP_URL = "my-app.apps.cyxth.com";
const USER_TOKEN = "token_from_backend";

const cyxth = await new Cyxth("YOUR_APP_URL", [Chat]).connect(USER_TOKEN);
const chat = cyxth.chat();

```

## send a message

to send a message simply

```ts
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

## receive and handle messages

and listen for incoming messages too ...

```ts
chat.on("message",(msg) => {
    console.log(`message on ${msg.channelId} from ${msg.sender}`,msg)
})
```

## message tree & history 

cloud message storage can be enabled or offline storage so you can `getMessages`.

```ts
getMessages(
 start: Date | string,
 limit: number = 50,
 channels: undefined | string | string[] = undefined,
 direction: 'reverse' | 'forward' = 'forward'
): Promise<{ [key: string]: Message[] }>
```

i.e 

```ts
// using id and limit, 150 is max at once
chat.channnels
 .getMessages('7085164563653595136', 150)
 .then((messages) => {
  console.log(messages);
 });
```

... 

read more  

[chat guide](https://cyxth.com/docs/guides/chat)

[chat reference](https://cyxth.com/docs/reference/classes/chat.Chat)  
