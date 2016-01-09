# The Application's State

> The **Application's State** - or just _State_ - is the ensemble of informations that are needed to render the current view on your device.

Let's pretend we are writing an eBook reader and our user activity with our app developed as follow:

- open the app
- download some books
- start to read a book
- read the first 6 pages

At this point the device is displaying the text of the 7th page in the selected book. The _State_ of the app looks like:

	{
	  "books": [{
	  	"id" : "b01",
	  	"title" : "React Fast and Right",
	  	"pages" : [...]
	  },{
	    "id" : "b02",
	    "title" : "For a Better Life at the Office",
	    "pages" : [...]
	  }],
	  "currentBook": {
	  	"id" : "b01",
	  	"page" : 6 // array's indexes start from Zero :-)
	  },
	  "currentView": {
	    "orientation" : "portrait",
	    "scrollPosition" : 123
	  },
	  "connectionIsAvailable" : true
	}

By analysing the piece of code above we pinpoint 2 facts about the _Application's State_:

- it is a _JSON_ object
- it can be predicted and reproduced
- it handles both logic and UI data
- it will mutate at every user interaction with the App

## The _State_ is a _JSON_ object

This is a technical consideration that makes a lot of usually complicated operations very easy:

- it can be easily persisted
- it can be easily shared across devices

Persistency of a _JSON_ object is straightforward in almost every modern language but it is particularly trivial within the _Javascript_ world. _No SQL_ databases speak _JSON_, _Ajax_ requests speak _JSON_, _Local Storage_ just require a `JSON.stringify()` wrapper. It is almost a no-brain operation to handle data in this format.

An interesting consequence is that we can easily serialize the state to an online data storage from which different devices can draw data. For example ee can exploit a technology such _Web Sockets_ to receive notifications of a change in the remote _State_. 

> I have succesfully used services like [_Firebase_](http://firebase.io) to keep a fully 
> synchronized _State_ across multiple devices withouth even think to build a 
> custom backend service.

As the _State_ grows big you can even choose to split it's serialization location: part of the _State_ can be stored within the device memory and part can be shared through a database. 

You are probably interested in sharing which book you are reading but the screen backlight level is relevant to each single device and doesn't need to be synced.

## The _State_ is predictable

If you carefully consider the _State_ of the eBook example it is easy to predict that when the user is done with page n.7 and turn to page n.8 the _State_'s `currentBook` key will look like:

	"currentBook": {
	  "id" : "b01",
	  "page" : 7 // this was 6 before!
	}

We can predict how the _State_ will look like if the user closes the book, download another or remove some books from the device.

> we are capable of **producing an expectation about the next _State_**.

This is the first step toward testing as the whole thing about testing is to verify whether an expectation was fulfilled or not. 


## The _State_ is reproduceable

> Being able to easily reproduce the _State_ of an application is critical 
> to functional testing and **testing is critical to quality**.

Because the _State_ is a _JSON_ object we can store it in a file within our testing environment, this way a particular _State_ will become a _fixture_ for our tests.

We can also store different states as a _fixtures_ therefore **we can test our app in different states** by picking up different fixtures and replay the test. Easy, isn't it?

In our eBook example we can write tests to answer some basic questions:

- what happen if I click on "nextPage" and there is none?
- what happen if I click on a book title but there are no pages?  
  <small>(probably due to a corrupted download)</small>
- what happen if I click on "download books" but there is no connection?

## What do we keep into the _State_?

In our example we are mixin into one single _JSON_ objects the books database, informations about the book that we are reading but even scroll position and connection availability.

How do we use those data?

- the book database is used indirectly by some internal routine functions: given the current book id and page index we need to extract the text that we want to display
- informations about the current book are used in combination with the previous point as well by displayign a page progress UI component and probably the book's title in the status bar
- the connection availability it is probably used to control the enable/disable status of the "Download" button or "Search Online Books" feature

We can summarize the _State_ as follow:

| Key | Usage |
| --- | --- |
| books | logic |
| currentBook | logic & ui |
| connectionIsAvailable | logic & ui |
| scrollPosition | ui |

There is no strict rule to tell what should or should not be kept into the _Application's State_ but one general guideline:

> The _Application's State_ should contain every information that is needed to 
> **consistently genereate what the user sees on the device's screen**.

## The _State_ will mutate through time

Because we binded the _State_ to the device's screen it is straightforward to understand that for each change in what we see there must be a change in the _State_'s informations.

> In our eBook example if I use my finger to scroll the page I understand that 
> the `currentView.scrollPosition` has changed value.

_(By the way during a scrolling action the _State_ will mutate an good deal of times because scrolling is almost a continuous action.)_
























