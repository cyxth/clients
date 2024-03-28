# colab

This module adds realtime collaboration capabilities to your application similar to figma and google docs.

internally powered by CRDTs ensuring state consistency and fast synchronization across multiple collaborators.

paired with cyxth call's  audio and video call features unlocks a richer collaboration experience for your users.

install packages

```sh
# cyxth core
npm install @cyxth/core

# cyxth colab
npm install @cyxth/colab
```

initialize collaboration

```js
import Cyxth from '@cyxth/core';
import Colab from '@cyxth/colab';

// initialize cyxth
const cyxth = new Cyxth("YOUR_APP_URL");

// add collab plugin
cyxth.register([Colab]);

// authorize user
// check https://cyxth.com/docs/authorize for more info
await cyxth.connect(USER_TOKEN_SMH);

// use the colab wasm package from cdn
const wasmUrl = "https://cdn.cyxth.com/colab@0.0.1.wasm";

const colab = await cyxth.colab(wasmUrl);
```

creating a collaboration instance

```js
// ...

const initTasks = async () => {
    const stateId = "tasks-01";
    const initialState = {
        tasks:[]
    }

    try {
        await colab.start(stateId, intialState, {
            defaultPermission: "viewer"
        })
    }catch(e) {
        // .. handle errors
    }
}

// ...
```

mutating state

```js
let taskList = colab.change("tasks").getList();

await taskList.insert(2,{
    date: new Date().toIsoString(),
    done: false,
    tags: ["code","docs"],
    value: "write the docs",
})

// ...
```

collaborative text editing

```js
let doc = colab.change('doc').getText();
await doc.insert(0,"hello world");

//...
```

listening for changes

```js
colab.on("change",(data) => {
    //... handle changes
})
```

read more  
[colab docs](https://cyxth.com/docs/collaboration)  
[colab examples](https://cyxth.com/docs/demos?filter=colab)  
[colab reference](https://cyxth.com/docs/reference/classes/colab.Colab)  
