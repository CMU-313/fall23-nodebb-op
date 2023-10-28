'use strict';

const Iroh = require('iroh');
const testFile = require('../src/file_to_test_iroh');

let code = `testFile`;

let stage = new Iroh.Stage(code);
stage.addListener(Iroh.PROGRAM).on("leave", function(e) {
  console.log('File returns: ' + e.return);
});

eval(stage.script);
