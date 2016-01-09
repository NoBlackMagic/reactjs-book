# Redux's Services

> A _Service_ is a _Redux Action_ capable of **handling asynchronous tasks** and dispatch other actions or services.

Redux's actions are a atomic and predictable way to change the app state, but they are often not enough to handle the needs of an interactive web application.

## The Problem

Say we are working a todo app and we designed our state as:

	todos: [{
	  id: 1,
	  text: 'buy milk',
	  done: true
	},{
	  id: 2,
	  text: 'do laundry',
	  done: false
	},{
	  ...
	}]
	
There are a couple of obvious actions that you can perform over it:

- `addTodo({id: 123, text:...})`
- `resolveTodo(todoId)`

But what if we need to **fetch the list of todos from a _REST_ endpoint**?

This piece of logic should develope as follows:

	function populateTodos() {
	  get('http://todos.com/list').then(list => {
	  	list.forEach(todo => addTodo(todo))
	  })
	}
	
The name `populateTodos` sounds like an _Action_, and on a high level it is an _Action_ indeed as its sole purpose is to modify the application state populating it with a server side provided list of todos. By all chances we want to run this acion when the application loads.

A nice way to accomplish this would be:

	class App extends ReactComponent {
	  componentWillMount() {
	    this.props.dispatch(populateTodos());
	  }
	}
	
But so far `populateTodos()` if far from being a valid _Redux_ _Action_ and if you try to executhe the code above it will trigger an exception.

## The Solution

_Redux_ allows to run _middlewares_ during the dispatching of an _Action_. By adding the `redux-thunk` middleware to our _Redux_ setup we can **support asynchronous actions** therefore we open up to write _Services_ to our application.

	import { createStore, applyMiddlewares } from 'redux';
	import reduxThunk from 'redux-thunk';
	
	let finalCreateStore = applyMiddlewares(reduxThunk)(createStore);
	let store = finalCreateStore(...appReducers...);
	
With this _Store_ setup in place we are ready to rewrite `populateTodos()`:
	
	import { setItems } from 'actions/todos-actions';
	import { setUiError } from 'actions/general-actions;
	
	function fetchTodos() {
		return dispatch => {
			get('http://todos.com/list')
			.then(items => dispatch(setItems(items)))
			.catch(err => dispatch(setUiError(err)));
		}
	}
	
The first thing that you should notice is that I have renamed the `populateTodos()` to `fetchTodos()`. How comes?

When I plan for my services name I use verbs like _fetch_, _load_, _save_, _validate_. All those verbs point to **activities that may fail** _(The application state will change only if the activity proves to be successful)_.

When I plan for my actions name I use verbs like _set_, _add_, _remove_, _change_. All those verbs point to **activities that operate a straight change to the application state**.