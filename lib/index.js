'use strict';

var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

function _create_workflow_object(res){
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

function create_json_workflow(req, res) {
  var workflow = _create_workflow_object(res);
  
  workflow.on('response', function() {
    workflow.outcome.success = !workflow.hasErrors();
    var status = workflow.status || 200;
    res.json(status, workflow.outcome);
  });

  return workflow;
};


function create_web_workflow(req, res) {
  var workflow = _create_workflow_object(res);
  
  workflow.on('response', function() {
    workflow.outcome.success = !workflow.hasErrors();
    res.send(workflow.outcome);
  });
  
  return workflow;
};

module.exports = {
  create_web_workflow : create_web_workflow,
  create_json_workflow : create_json_workflow
};