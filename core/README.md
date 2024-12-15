# @cyxth/core

This is the main entry for your cyxth applications, it handles server connection and authentication and binds all cyxth plugins to work together.

Install `@cyxth/core` you will also need one or more core plugins i.e `Colab`, `Chat` or `Calls` to get started.

```sh
npm install @cyxth/core @cyxth/colab
```

Example of a cyxth application with calls and chat.

```ts
import Cyxth from '@cyxth/core';
import Calls from '@cyxth/calls';
import Chat from '@cyxth/chat';

const APP_URL = "my-app.apps.cyxth.com";
const USER_TOKEN = "token_from_backend";

const cyxth = await new Cyxth(APP_URL,[Calls,Chat]).connect(TOKEN);

const calls: Calls = cyxth.calls();
const chat: Chat = cyxth.chat();

// ... your custom app logic goes here
calls.on("call:new", (data) => {
    callNotify(data)
});

const hangUp = async () => {
    await call.leave();
};


```

Read More

[cyxth guides](https://cyxth.com/docs/guides).

[cyxth reference](https://cyxth.com/docs/reference).  

[REST API](https://cyxth.com/docs/restapi).  
