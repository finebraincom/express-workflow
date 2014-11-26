'use strict';

var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

function _create_workflow_object(){
  var workflow = new EventEmitter();
  
  workflow.outcome = {
    success: false,
    errors: [],
    errfor: {}
  };
  
  workflow.hasErrors = function() {
    return Object.keys(workflow.outcome.errfor).length !== 0 || workflow.outcome.errors.length !== 0;
  };
  
  workflow.on('exception', function(err) {
    workflow.outcome.errors.push('Exception: '+ err);
    return workflow.emit('response');
  });

  workflow.on('render', function(template) {
    res.render(template, workflow.outcome);
  });
  
  return workflow;  
}

function JSONWorkflow(req, res) {
  var workflow = _create_workflow_object();
  
  workflow.on('response', function() {
    workflow.outcome.success = !workflow.hasErrors();
    var status = workflow.status || 200;
    res.json(status, workflow.outcome);
  });

  return workflow;
};


function WebWorkflow(req, res) {
  var workflow = _create_workflow_object();
  
  workflow.on('response', function() {
    workflow.outcome.success = !workflow.hasErrors();
    res.send(workflow.outcome);
  });
  
  return workflow;
};

module.exports = {
  WebWorkflow : WebWorkflow,
  JSONWorkflow : JSONWorkflow
};