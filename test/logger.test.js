const mocha = require('mocha');
const { assert } = require('chai');

const Logger = require('../lib/logger');

mocha.describe('Logger', () => {
  mocha.it('validate default logger', () => {
    const logger = Logger.Default();
    assert.isFalse(logger.disable);
    assert.isNull(logger.file);
    assert.isNull(logger.format);
    assert.isEmpty(logger.handlers);
  });
  mocha.it('validate logger builder with primitives', () => {
    const logger = Logger.Builder()
      .disable(true)
      .file('value')
      .format(() => 'value')
      .handle(() => {})
      .build();
    assert.isBoolean(logger.disable);
    assert.isTrue(logger.disable);
    assert.isString(logger.file);
    assert.isNotEmpty(logger.file);
    assert.isFunction(logger.format);
    assert.isNotEmpty(logger.format());
    assert.isNotEmpty(logger.handlers);
  });
  mocha.it('validate logger builder with functions', () => {
    const logger = Logger.Builder()
      .disable(() => true)
      .file(() => 'value')
      .format(() => 'value')
      .handle(() => {})
      .build();
    assert.isFunction(logger.disable);
    assert.isTrue(logger.disable());
    assert.isFunction(logger.format);
    assert.isNotEmpty(logger.format());
    assert.isFunction(logger.format);
    assert.isNotEmpty(logger.format());
    assert.isNotEmpty(logger.handlers);
  });
});
