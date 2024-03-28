# colab-wasm

colab wasm module for `@cyxth/colab` package.

how to use

locally add the colab.wasm file to your static folder and reference it

```js
//...

const colab = await cyxth.colab("colab.wasm");

//...
```

or use it from a cdn

```js
const wasmUrl = "https://cdn.cyxth.com/colab@0.0.1.wasm";
const colab = await cyxth.colab(wasmUrl);
```

note: ensure colab version match with colab-wasm

read more  
[cyxth docs](https://cyxth.com/docs)
