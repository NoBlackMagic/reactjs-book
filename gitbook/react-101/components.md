# UI as composition of Components

When it comes to _React_ every piece of the _UI_ is just a _Component_ and a complex _UI_ is achieved as composition of **simple components**.

> A _Component_ is simple when it solves one single purpose and 
> **delegates to sub components** more sophisticated responsabilities.
>
> A _TodoList_ component has the responsability of displayng a list of _TaskItem_ components.
> It should know how to filter and sort the list but then she it delegates to the 
> _TaskItem_ component the responsability of rendering the todo item with text, checkbox
> and user interaction handlers.

It is best to write a single component per Javascript module:

	// TaskItem.js
	import React from 'react';
	
	export class TaskItem extends React.Component {
	  render() {
	  	return (
	      <li>
	      	<input type="checkbox" checked={this.props.isDone} />
	        {this.props.title}
	      </li>
	  	);
	  }
	}
	
The code above defines a _TaskItem_ component which responsability is to describe how a todo item shoud look like. Even in this simple component we are already delegating sub-responsabilities to sub-components such `<li>` and `<input>`.

> Those components are called **_Leaf Components_** and are provided by `ReactDOM` 
> in order to produce _Web Applications_ based on _HTML_. 
>
> You can use different sets of _Leaf Components_ that enable you to build _Canvas_ based
> games, or even native apps in both _iOS_ and _Android_ with _React Native_.

Now we proceed and build the _TodoList_ component which will use _TaskItem_ as sub-component:

	// TodoList.js
	import React from 'react';
	import { TodoList } from './TaskItem';
	
	export class TaskItem extends React.Component {
	  
	  propTypes = {
	    title: React.PropTypes.string,
	    items: React.PropTypes.array,
	  }
	  
	  defaultProps = {
	    title: '',
	    items: [],
	  }
	  
	  render() {
	    var { title, items } = this.props;
	    
	    items = this.props.items.map(item => (
	      <TaskItem {...item} key={item.id} />
	    ));
	    
	    return (
	      <div>
	        <h3>{title}</h3>
	        <ul>{items}</ul>
	      </div>
	    );
	  }
	}
	
This new component is a bit more complete. We introduced here the `propTypes` and `defaultProps` properties of a _React Component_.

Let's step back a minute and focus on the real purpose of a _React Component_:

> The purpose of a _React Component_ is to use some **given informations** to produce a
> description of how to arrange a set of sub-components.

We've already seen the `render()` method that return the sub-components composition, the other piece of the above description regards _given informations_ which are the same concept as _HTML Tag parameters_.

On a higher level of the _TodoApp_ composition of components I may have something like:

	// prepare data to render:
	var items = [
	  { title: 'buy milk', done: false },
	  { title: 'do landry', done: true },
	];
	
	// render into the page:
	ReactDOM.render(
	  <TodoList
	    title="Personal Stuff"
	    items={items} />, 
	  document.body
	);
	
At this point it appears that each component's `this.props` is beign poupulated by the _Parent Component_; `defaultProps` is just a utility that assigns some default values in case nothing was specified for a given parameter; and `propTypes` is a **development utility** that will trigger some `console.error` when a wrong data type is passed down to a _Component_'s property.

> A _Component_'s property value is received from the _Parent Component_.  
> Whenever this value change the _Component_ will `render()` again updating the _UI_.

Thanks to _React's Virtual DOM_ it is cheap to re-render components because only the minimum amount of _DOM Nodes_ will be updated. Even very complex components hierarchies achieve top rendering performances and, in my experience, if you focus on the **_single responsability principle_ for each component** you will never get into troubles.

## Lists and Spread Operator

There is a particular piece of code that deserves a deeper explanation:

	items = this.props.items.map(item => (
	  <TaskItem {...item} key={item.id} />
	));

`this.props.items` receives a list of todo items which are _Javascript Objects_ that define a todo information:

	{
	  title: 'buy milk',
	  done: false,
	}
	
With the `map()` operator we want to transform each _Todo Data Object_ into a _TaskItem Component_ which will actually render the UI for each todo.

We know that _TaskItem_ expects ro receive a `title` and a `done` properties in order to render itself. Here we use _ES6 Spread Operator_ to fetch those informations from the iteration subject (`item`) and pass them into _TaskItem_ as _React_'s parameters.

An equivalent but more verbose version of the same code would be:

	items = this.props.items.map(item => (
	  <TaskItem
	    title={item.title}
	    done={item.done}
	    key={item.id} />
	));
	
As for the `key` parameter, this is an information that _React_ need so to keep in sync a list of components and their subsequent re-rendering through time.