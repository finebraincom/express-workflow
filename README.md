express-workflow
================

Workflow engine for splitting large request processing tasks into meaningful chunks, connected through node.js events


The original code is taken from [drywall project](http://jedireza.github.io/drywall/) and extended to support JSON format of responce.

Usage
--------

If handler provides responce in web page then should be used WebNWorkflow

```
var Workflow = require('express-workflow').WebWorkflow;

function handler(req, res){
	var workflow = new Workflow

	workflow.on('task-1', function(){
		// ...
		workflow.emit('task-2', param);
	});

	workflow.on('task2', function(param){
		// ...
		workflow.outcome.field = 'value';
		workflow.render(<template-name>);
	});

	workflow.emit('task-1');
}
```

If handler provides responce in JSON format then used JSONWorkflow

```
var Workflow = require('express-workflow').JSONWorkflow;

function handler(req, res){
	var workflow = new Workflow

	workflow.on('task-1', function(){
		// ...
		workflow.emit('task-2', param);
	});

	workflow.on('task2', function(param){
		// ...
		workflow.outcome.field = 'value';
		workflow.emit('response');
	});

	workflow.emit('task-1');
}
```

This will result in response with status 200 and JSON content:  

```
{
	"success" : true,
	"errors": [],
	"errfor" : {},
	"field" : "value" 
}
```

The default response status code is 200.
It can be chaned by assigning required status to the workflow object

```
workflow.status = 401;
```