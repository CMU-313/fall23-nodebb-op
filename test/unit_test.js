'use strict';

const assert = require('assert');

describe('Fake Unit Tests', () => { 
  it('Fake Passing Unit Test', async () => {
    assert.equal(true, true);
  });

  it('Fake Failing Unit Test', async () => {
    assert.equal(true, false);
  });
});