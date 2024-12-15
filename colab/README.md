# colab

This module adds realtime collaboration capabilities to your application similar to figma and google docs.

cyxth colab ensures that your state is always consistent across all users by automatically
resolving conflicts while still being very fast and scalable.


## installation

install cyxth core and colab packages

```sh
npm install @cyxth/core @cyxth/colab
```

## initialize

connect to cyxth and initialize cyxth colab

```ts
import Cyxth from '@cyxth/core';
import Colab from '@cyxth/colab';

const APP_URL = "my-app.apps.cyxth.com";
const USER_TOKEN = "token_from_backend";

const cyxth = await new Cyxth("YOUR_APP_URL", [Colab]).connect(USER_TOKEN);
const colab = await cyxth.colab()

```

## text example

a simple text example.

```ts
// ...

const state = await colab.createOrJoin("our-shared-doc");
const doc = state.changeContext().text("doc");

doc.handlers = {
  insert(index, text, ctx) {
    console.log(ctx.userId);
    // update doc in ui
  }

  delete(fragments, ctx) {
    console.log(ctx.userId);
    // remove fragments
  }
}

const editDoc = (index: number, text: string, delCount:number) => {
   doc.replace(index, text, delCount)
}

// ...
```

dive in deeper for multiplayer text editing with the monaco multiplayer markdown
editor example [here](https://cyxth.com/docs/guides/editor).

## more data types

cyxth has two other data types [`Tree`](https://cyxth.com/docs/reference/interfaces/colab_change.Tree) and [`Counter`](https://cyxth.com//docs/reference/interfaces/colab_change.Counter). with tree you can
represent and json data and counter is a simple increment decrement counter.

## read more  

multiplayer concepts with cyxth with examples [here](https://cyxth.com/docs/colab).  

a multiplayer svg editor example  [here](https://cyxth.com/docs/guides/draw).  

the [colab reference](https://cyxth.com/docs/reference/classes/colab.Colab)  
