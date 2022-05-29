/* eslint-disable no-console */
const fs = require('fs');

function Logger(disable, file, format, handlers) {
  this.disable = disable;
  this.file = file;
  this.format = format;
  this.handlers = handlers;
}

Logger.Levels = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug',
};

Logger.Builder = function () {
  const options = {
    disable: false,
    file: null,
    format: null,
    handlers: [],
  };
  return {
    disable(value) {
      options.disable = value;
      return this;
    },
    file(value) {
      options.file = value;
      return this;
    },
    format(value) {
      options.format = value;
      return this;
    },
    handle(value) {
      options.handlers.push(value);
      return this;
    },
    build() {
      const { disable, file, format, handlers } = options;
      return new Logger(disable, file, format, handlers);
    },
  };
};

Logger.Default = function () {
  return Logger.Builder().build();
};

Logger.prototype.log = function (level, message) {
  const { disable, file, format, handlers } = this;
  const timestamp = Date.now();
  const isDisabled = typeof disable === 'boolean' ? disable : disable(level);
  if (isDisabled) return;
  if (handlers.length !== 0) {
    handlers.forEach(handler => handler(timestamp, level, message));
  }
  const output = format ? format(timestamp, level, message) : message;
  if (file) {
    const path = typeof file === 'string' ? file : file(timestamp, level);
    fs.appendFileSync(path, `${output}\n`);
  }
  if (console[level]) {
    console[level](output);
  } else {
    console.log(output);
  }
};

Logger.prototype.info = function (message) {
  this.log(Logger.Levels.INFO, message);
};

Logger.prototype.warn = function (message) {
  this.log(Logger.Levels.WARN, message);
};

Logger.prototype.error = function (message) {
  this.log(Logger.Levels.ERROR, message);
};

Logger.prototype.debug = function (message) {
  this.log(Logger.Levels.DEBUG, message);
};

module.exports = Logger;
