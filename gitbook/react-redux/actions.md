# Redux Actions

> **Actions** are the vehicle to mutate the [_Application's State_](./state.md).

A _Redux Action_ is a simple Javascript object which defines an _Action Type_ key and some other optional informations about how to mutate the _State_:

	{
	  type: 'addUser',
	  username: 'mpeg',
	  password: '12345',
	}

In the example above the key `type` is reseved to the _Redux_ library and it will be used by our [Application's reducers](./reducers.md) to perform the mutation.

You can use `dispatch()`to execute an action on a given _Store_:

	myStore.dispatch({
	  type: 'addUser',
	  username: 'mpeg',
	  password: '12345',
	});

_Redux_ actions are really that simple. However we can use some more formal structure so to improve our code and avoid silly mistakes.

## Action Types as Constants

The `type` of an _Action_ is just a string (actually it can be whatever Javascript type) but it is mandatory for the value to be unique across the whole Application so to avoid actions conflicts.

A simple best practice would be to store all the _Action Types_ for an App into a dictionary of constants:

	# action-types.js
	export const ADD_USER = 'addUser';
	export const REMOVE_USER = 'removeUser';
	
When you want to dispatch an action you will import the _Action Type_ constant and use it to create the _Action_ itself:

	import { ADD_USER } from './action-types.js'
	...
	myStore.dispatch({
	  type: ADD_USER,
	  username: 'mpeg',
	  password: '12345',
	});

> This simple gimmick is enough to avoid typos in your action types strings and
> also make it easier to guarantee that an _Action Type_ is unique in the App.

## Action Creators

The _Action Type_ as a constant is only one side of the coin. For an _Action_ should always be dispatched with the same signature so to be coherent through time.

Basically it is very bad to do something like this:

	// first time:
	myStore.dispatch({
	  type: ADD_USER,
	  username: 'mpeg',
	  password: '12345',
	});
	
	// second time
	myStore.dispatch({
	  type: ADD_USER,
	  username: 'mpeg',
	});

The signature for the first action is `[type, username, password]` but the signature for the second one is `[type, username]`. Chances are that the outcome will be very different and most likely leading to errors!

















