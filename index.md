## Reactive Programming with RxJS


### Overview
In this blog we will dive into the world of reactive programming with JavaScript. Basically we devided them into three categories:

1. JavaScript basics

2. What is Reactive Programming?

3. Reactive Programming in JavaScript


So let's get started!

**1. JavaScript basics** 

First of all, let’s do a short recap on javascript. Programming for the Web javascript is the programming language of your choice. Together with HTML and CSS you are ready to become an web developer. Javascript offers even more with node.js the world of server-side development is your’s as well. Brendan Eich invented Javascript back in 1995. Two years after that it became an ECMA standard (“ECMA-262) . 

First steps: Variables and Contants
- Variables
```javascript 
    var newString = "String";    ||       let newString = "String";
    let a, b = 10;                        let c = 10, d = "String";
```     
- Constants
```javascript
    const newConstant = 10;
``` 
Variables in Javascript are declared by “var”. With [ES6](http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations ) came ‘let’ and ‘const’. These are scoped to their running execution context. A variable declared with ‘var’ might be used by other functions as they are global when declared outside any function. ‘Let’ on the other hand is only approachable within their context of definition, so called block scoped. 
Quick example:

Moving on to: Arrays and Objects

- Objects
```javascript 
    var myObject = {
            Name :  "Max",
            Nachname : "Mustermann"
            Address : {Street : "Musterstraße", No : 5, ZIPCode : "11111" , City : "Musterstadt"}
    } 
```
- Arrays
```javascript
    var myElements = [ 2 , 3, 4, 5 ]; || 
    var myElements = new Array(2 , 3, 4, 5);
    var alsoMyElements = [ 2, "Hello", new Date(), 5 ];
```
    
    
We already looked at Variables, now Objects are like Variables since they are containers for data too. Objects can hold many values. Those values don’t have to be of the same type. Arrays are special variables too. They can contain many values as well. 
How to access those values? With objects you use the names of the values, e.g. myObject.Name returns “Max”. Arrays returns values by numbers, e.g. myElements[1] returns 2. Remember, the first element of an Array is called by 0, the second by 1 and so on. 

Next on the agenda are functions. Functions are blocks of code, defined to fullfil a specific task. They are defined by the keyword **function** and a **name**, following **parentheses**, which can contain paramters. A function is executed when something, e.g. an event or even another function, calls is. 

Here some examples:
```javascript
function myObjectFunction (firstname, surname){
        return { Firstname :  firstname,    Surname : surname};
}
var mySecondObjectFunction = function (firstname, surname){
        return { Firstname :  firstname,    Surname : surname};
}

function myFunction (firstname, surname){
        var name = myObjectFunction(firstname, surname); 
        return name;
}

```
The first function is gets two parameters and returns them as object. As soon as the surronding function or script is executed - the first function can be executed. The second function on the other hand is a functional expression and is ready to be executed as soon as the line, in which it is defined, is reached in the executed script. 

There are some **global functions** you can use.

name | example
------------ | -------------
eval | ``` eval("3+2*4")   // 11 ```
isNaN(Value) | ``` isNaN("TRUE")  //  true || isNaN(8) //  false ```
Number(object) | ``` Number("354646.55") // 354646.55 ```
String(Object) | ``` String(354646.55) // "354646.55" ```
parseFloat(String) | ``` parseFloat("33.33333333") // 33.33333333 ```
parseInt(String) | ``` parseInt(“456.235665”) // 456 ```
 
You can use those functions with all JavaScript objekts. [Here](https://www.w3schools.com/jsref/jsref_obj_global.asp) is a list of all global functions.


**event handling**

As mentioned earlier JavaScript is the programming language of the web, so what's more common in the web then to click on something or to input data? That's why we'll take a look at event handling. 

![event handling](/eventHandling.png)

This is an easy example. We have a simple HTML which renders a label, an input field, a button and another input field (our output field). As soon as the user clicks on the button, the javascript function *greet()* is called. It simply gets the value of the input field and prepares a greeting for the output field. This is an example for synchronous handling. One line of code is executed after the other and there are no delays in time.  

Normally web applications aren't as simple as that. The data that is displayed is not stored inside the HTML or the Javascript and user inputs are not completely handeld inside the application. Usually a server provides the necessary data for the application. 

![browserServer](/browserServer.png)

The above images shows a typical flow of a request. The user submits a form or clicks on a button in order to some information or data. An event occours and a request is created and send with JavaScript. The server recieves the request, processes it and creates and send a response. The browser recieves the response and processes the data. It will take some time to deliever the request, for the server to prepare the response and to deliever the response. How long it's going to be, is not clear by the time the browser sends the request. With synchronous handling as our fist example, the browser will stop until the request is back and the user is unable to do something else. Since no one would like to use an application like that, we work with asynchronous handling. By the time the request is send, the browser continues with the execution of script and handls other events, but once the response arrives it will continue to process the returned data. 

**Callbacks**

To catch the arriving response [callbacks](https://www.w3schools.com/jquery/jquery_callback.asp) are used. The next example displays a simple implementation of a [XMLHttpRequest's](https://www.w3schools.com/xml/xml_http.asp) callback: 

``` 
<div>
	<input type="button" value="load Data" onClick="loadData()"> 
	<div id="demo"></div>
</div>
```
```javascript 
function loadData() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			processData(this);
		}
	};
	xhttp.open("GET","URL",true);
	xhttp.send();
}
function processData(that) {
		var response = JSON.parse(that.responseText);
		var txt = "<ul>"
		for (i in response.ProductCollection) {
			txt += "<li>" + response.ProductCollection[i].ProductId + " - "
					+ response.ProductCollection[i].Category + "</li>";
		}
		txt += "</ul>"
		document.getElementById("demo").innerHTML = txt;
	
}
```
Once the button is clicked, a request is send to the URL in order to get data. By the time the [request](https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp) is finished and the response is ready (state = 4) as well as the status is ok (200), the data will be processed. In this example the response text will be parsed into a [JSON object](https://www.w3schools.com/js/js_json_parse.asp) and the items will be display as a list. 

Callbacks are quite handy but can be confusing when the application has a lot of requests and they are nested. For example you load a list of books and each book has a picture and comments, from people who read it already, which you want to display as well. 

**Promises** 

Alternatively you can use [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises). A promise represents a value which is not present by the time the promise is created. A request is handeld asynchronous but returns a value like a synchronous function. Let's take a look at the syntax:

```javascript
var myPromise = new Promise(function(resolve, reject) {  
	...
});
```
The function body is executed immediately by the implementation of the promise. Resolve and reject ar passed into the function and called when the purpose of the function is either fulfilled or failed. A promise has three states and is always in one of them:

- pending: initial state
- fulfilled: the operation is completed successfully
- rejected: the operation has failed

At some point the promise will change it's status to fulfilled or rejected and by that time the associated handlers queued up by the promise's *then* method will be called.

The next example shows a simple implementation of a promise:

```javascript
function loadData(){
	var myPromise = createPromise();
        myPromise.then((that) => {var response = JSON.parse(that.responseText);//render content})  
              .catch((err) => console.log("rejected:", err));
}
function createPromise(){
        return new Promise((resolve, reject) => {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET","URL",true);
		xhttp.onreadystatechange = function(){
		    if (this.readyState == 4 && this.status == 200) {
			resolve (this);
		    }else if (this.readyState == 4 && this.status !== 200){
			reject(false);
		    }
		};
		xhttp.send();
	})  
}

```
By the time the request is finsihed and valid, then the response will be rendered. The methods *then* and *catch* return a promise thereselfs, so they can be chained:

![promises](https://cdn.rawgit.com/Vectaio/a76330b025baf9bcdf07cb46e5a9ef9e/raw/26c4213a93dee1c39611dcd0ec12625811b20a26/js-promise.svg)

Let's leave the world of web programming and look into another topic:

**functional programming with JavaScript**

What is functional programming? In short, functional programming is programming without mutable variables and assignments as well as imperative control flows. That means variables are constant, once a value is assigned to them, it won't change. 

For example, we want to programm a light switcher. We have a light which is on or off. First approach could be something like that:

```javascript
var light = {
        on  : false
};
function switchLight(){
    light.on = !light.on;
}
switchLight();

```
There is a *light* object with *on* as key and true or false as value. When we want to switch the light, we change the property of the light. Thinking of functional programming, that is not what we want. We want the property of the light to be constant, so therefore we try again:

```javascript
var switchedOffLight = {
        on : false
};
function switchLight(light){
    return { on: !light.on };
}
var switchedOnLight = switchLight(switchedOffLight);
```
Now the light is switched off and when we want it to be switched on, we pass the light as argument to the *switchLight* function. 
The *switchedOffLight* won't change and the function only uses variables which are passed as parameter and returns a new light.

For JavaScript *Arrays* there are functional programmed functions like

- map 
- filter
- reduce

```javascript
var values = [1, 2, 3, 4];
 
var multiplied = values.map(function multiplyBy2(value){
  return value * 2;
});

//multiplied [2, 4, 6, 8]

var reduced = values.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
});

//reduced 10


var filtered = values.filter(value => value % 2 === 0);

//filtered [2, 4]
```
**2. What is Reactive Programming** 

*“ReactiveX is a library for composing asynchronous and event-based programs by using observable sequences.”* [ReactiveX](http://reactivex.io/intro.html)

Thats the first statement on the [ReactiveX Site](http://reactivex.io/intro.html) and for us the point to step into the reactive world.

The key principles of reactive programming are: 

- streams
- observables
- operators
- single
- subject
- schedulers

**Streams** 
From now on every input, properties, array are managed as part of a stream. 
```
------------------------------------------------------------->
```
A stream is represented through an

**Observable**

An *observer* subscribes to an *observable* so when from time to time the *observable* emits a new item, the observer can react on that.
The following image by [ReactiveX](http://reactivex.io) shows the flow of items emitted by an observable and processed into a new observable. 
![Observables](http://reactivex.io/assets/operators/legend.png)

In short: an observable is a source of items which can be subscribed to. There are 3 types of output -> onNext a next item, onError -> an error occoured the stream ends or onCompletet -> the stream ended.

**Operators**

Operators work on an observable, they operate with the items and most of them return an observable themself. Be aware - we do functional programming so the original values won't change and new ones are created during the operation. Since operator can return observables it's possible to chain multiple operators.
There are different types of operators:

- creating observables - operators orginate new observables
- transforming observables - operators that transform items
- filtering observables - operators that only emits items matching a criteria 
- combining observables - operators which combine different observables into a single one
- and many more

**Single**

A single is a special observable. It doesn't emit a series of items but either emits on item or an error notification.

**Subject**

A subject is both observer and observable. It can subscribe to an observable and can pass through items it observes as well as emit new items. 

**Schedulers**

With schedulers you can introduce multithreading into your observable operators, you can do so by telling those operators to use a particular scheduler. 
