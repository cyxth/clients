# colab-wasm

Colab wasm module for `@cyxth/colab` package.

You can choose to add this locally to your public or static folder. 
ensure colab version matches the wasm version if you do so.

```ts
const colab = await cyxth.colab("colab.wasm");

```

By default this module will be loaded automatically from our cdns. 
It might be faster to load it from your server so we recommend using the above method.

Read more on the [colab guide](https://cyxth.com/docs/guides/colab)
