var expect = require('chai').expect;
var _ = require('underscore');

describe("workflow", function(){
	
	describe('JSON', function(){

		var JSONWorkflow = require('../lib').JSONWorkflow;
		var mockRequest = {};
		
		it("no special data means success", function(done){
			var mockResponse = {
				json : function(status, data){
					expect(status).to.be.equal(200);
					expect(data.success).to.be.true;
					expect(data.errors).to.be.empty;
					expect(data.errfor).to.be.empty;
					done();
				}
			};
			var wf = new JSONWorkflow(mockRequest, mockResponse);

			wf.on('init', function(){
				wf.emit('response');
			});

			wf.emit('init');
		});

		it("detection error through errors list", function(done){
			var mockResponse = {
				json : function(status, data){
					expect(status).to.be.equal(200);
					expect(data.success).to.be.false;
					expect(data.errors).to.be.not.empty;
					expect(data.errfor).to.be.empty;
					done();
				}
			};
			var wf = new JSONWorkflow(mockRequest, mockResponse);

			wf.on('init', function(){
				wf.outcome.errors.push('test error');
				wf.emit('response');
			});

			wf.emit('init');

		});

		it("detection error through field errors object", function(done){
			var mockResponse = {
				json : function(status, data){
					expect(status).to.be.equal(200);
					expect(data.success).to.be.false;
					expect(data.errors).to.be.empty;
					expect(data.errfor).to.be.not.empty;
					done();
				}
			};
			var wf = new JSONWorkflow(mockRequest, mockResponse);

			wf.on('init', function(){
				wf.outcome.errfor.abc = 'required';
				wf.emit('response');
			});

			wf.emit('init');

		});

		it("set specific status code", function(done){
			var mockResponse = {
				json : function(status, data){
					expect(status).to.be.equal(400);
					expect(data.success).to.be.true;
					done();
				}
			};
			var wf = new JSONWorkflow(mockRequest, mockResponse);

			wf.on('init', function(){
				wf.status = 400;
				wf.emit('response');
			});

			wf.emit('init');

		});

	});	
});
