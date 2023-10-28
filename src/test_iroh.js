'use strict';

const Iroh = require('iroh');
const testFile = require('./file_to_test_iroh');

const code = `testFile`;

const stage = new Iroh.Stage(code);
stage.addListener(Iroh.PROGRAM).on('leave', (e) => {
    console.log(`File returns: ${e.return}`);
});

eval(stage.script);
