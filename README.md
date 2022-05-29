# bakeryjs/logger

Simple and Customisable Logger for Node.js Applications

## Installation

Install library via npm:

```bash
$ npm install @bakeryjs/logger
```

## How to use

Create a new logger via Builder:

```javascript
const logger = Logger.Builder()
  .disable(level => level === Logger.Levels.DEBUG) // disable only debug messages
  .file(timestamp => {
    const date = new Date(timestamp).toISOString().split('T')[0];
    return `${date}.log`; // file name in format: YYYY-MM-DD.log
  })
  .format((timestamp, level, message) => {
    const time = new Date(timestamp).toISOString()
      .split('T')[1]
      .split('.')[0];
    return `${time} [${level.toUpperCase()}]: ${message}`;
  })
  .handle((timestamp, level, message) => {
    // TODO: handle log message
  })
  .build();

logger.log('CUSTOM-LEVEL', 'custom level message');
logger.debug('debug message'); // won't be printed as in console as in file
logger.info('info message');
logger.warn('warn message');
logger.error('error message');
```

Or use the default one:

```javascript
const logger = Logger.Default();

// logger.disable = true; // disable if needed

logger.debug('debug message');
```

## API Reference

### Logger

- `(method) Logger.log(level: string, message: string)`
- `(method) Logger.info(message: string)`
- `(method) Logger.warn(message: string)`
- `(method) Logger.error(message: string)`
- `(method) Logger.debug(message: string)`

### Logger.Builder:

- `(method) disable(value: boolean | (level: string) => boolean): Logger.Builder`
- `(method) file(value: string | (timestamp: number, level: string) => string): Logger.Builder`
- `(method) format(value: (timestamp: number, level: string, message: string) => string): Logger.Builder`
- `(method) handle(value: (timestamp: number, level: string, message: string) => void): Logger.Builder`
- `(method) build(): Logger`
