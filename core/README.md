# @cyxth/core

this is the main entry for your cyxth applications, it handles server connection and authentication and binds all cyxth plugins to work together.

installation

```sh
# install core
npm install @cyxth/core


# you will need one or more of this core plugins
npm install @cyxth/chat
npm install @cyxth/calls
npm install @cyxth/colab

# ... more cyxth plugins
```

an example for a chat application with calls and chat

```js
import Cyxth from '@cyxth/core';
import Calls from '@cyxth/calls';
import Chat from '@cyxth/chat';

const cyx = new Cyxth("YOUR_APP_URL");

// register required plugins
cyx.register([
    Calls,
    Chat
]);

//connect a user to cyxth
await cyx.connect("USER_TOKEN");

cyx.on('error', (data) => {
    // show error
})

cyx.on('disconnect',data => {
    console.log(`disconnected ${data.reason}`)
})

//... app logic

```

read more

[getting started with cyxth](https://cyxth.com/docs/getting-started)  
[authorization](https://cyxth.com/docs/authorization)  
[client reference](https://cyxth.com/docs/reference/classes/core.Cyxth)  
