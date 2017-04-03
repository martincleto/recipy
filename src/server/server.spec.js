const request = require('request');
const server = require('./server');

const baseUrl = 'http://localhost:8765/';

let endpoint = '';
let expectedBody = '';

describe('Recipy API', function() {
  describe('GET /', function() {
    it('redirects to /api', function(done) {
      request.get(baseUrl, function(error, response, body) {
        expect(response.request.href).toContain('/api');
        done();
      });
    });
  });

  describe('GET /api', function() {
    it('returns status code 200', function(done) {
      endpoint = baseUrl + 'api';
      expectedBody = 'recipy API';

      request.get(endpoint, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(body).toBe(expectedBody);
        done();
      });
    });
  });
});
