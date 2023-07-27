# cyxth calls api

cyxth calls api

```js
// a simple example
import Cyxth from '@cyxth/chat';
import Calls from '@cyxth/calls';

// initialize cyxth and connect

/**@type {import('@cyxth/calls').default} */
let call;

// start call in a channel
const newCall = async () => {
	call = await cyxth.startCall('channel_id', {
		video: true,
		audio: true
	});

	handleCall(call);
};

// others in same channnel receive event and accept|reject
cyxth.on('call', async (data) => {
	// show a notification | ring on `data.channel`
	//add logic to accept or reject the call

	call = await data.request.accept({
		video: true,
		audio: true
	});

	handleCall(call);
});

// handle call events
const handleCall = async (call) => {
	call.on('join', (data) => {
		// update user element
	});

	// more events connected | leave | update|  end ..e.t.c
};
```

read more on calls  
[call example](https://cyxth.com/docs/advanced-chat)  
[call docs](https://cyxth.com/docs/calls)
