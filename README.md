# simple-snowflake-id
[![npm version](https://img.shields.io/npm/v/simple-snowflake-id)](https://www.npmjs.com/package/simple-snowflake-id)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

A lightweight TypeScript implementation of Twitter's Snowflake ID generator for distributed systems.

## Features  
- 🚀 **High Performance**: Generate 1M IDs/second on modern hardware  
- ⚙️ **Configurable**: Custom epochs, datacenter/machine IDs (0-31)  
- 🔍 **Debuggable**: Built-in ID decomposition  
- 📦 **Zero Dependencies**: Pure TypeScript implementation  
- 🔧 **Type Safe**: Full TypeScript support  

# Usage

## Installation
```bash 
npm install simple-snowflake-id
```

## Basic Usage
```typescript 
import { Snowflake } from 'simple-snowflake-id';

// Initialize with default configuration
const generator = new Snowflake();

// Generate ID as BigInt
const id = generator.generate();
console.log('Generated ID:', id); // 182305294335246336n

// Generate as String
const strId = generator.generate('string');
console.log('String ID:', strId); // "182305294335246336"
```

## ID Decomposition
```typescript 
const details = Snowflake.decompose(id);
console.log('Decomposed ID:', details);
/* Output:
{
  timestamp: 1712345678901n,
  datacenterId: 0,
  machineId: 0,
  sequence: 0,
  epoch: 1288834974657n
}
*/
```

## Advanced Configuration
```typescript 
// Custom epoch (January 1, 2024 UTC)
const CUSTOM_EPOCH = 1704067200000n;

const customGenerator = new Snowflake({
  epoch: CUSTOM_EPOCH,
  datacenterId: 5,  // 0-31
  machineId: 10     // 0-31
});

// Bulk generation
const ids = Array(1000).fill(null).map(() => customGenerator.generate());
```

# API Reference
## Snowflake Class

Constructor

```typescript 
new Snowflake(config?: SnowflakeConfig)
```

| Parameter     | Type          | Default        | Description                 |
| ------------- |:-------------:| :-------------:| ---------------------------:|
| epoch         | bigint        | 1288834974657n | Custom epoch (milliseconds) |
| datacenterId  | number        | 0              | Datacenter ID (0-31)        |
| machineId     | number        | 0              | Machine ID (0-31)           |

### Methods
- generate(format?: 'bigint' | 'string')
- static decompose(id: bigint | string, epoch?: bigint)

## Performance
| Metric                | Result              |
| --------------------- |:-------------------:|
| 1M IDs generation     | ~120ms              |
| Collision resistance  | 4096 IDs/ms/machine |
| Memory usage          | <1MB per 1M IDs     |


## Development
```bash
# Install dependencies
npm install

# Build project
npm run build

# Run tests
npm test

# Run benchmarks
npm run benchmark
``` 

## License
MIT © [[Yaroslav Kharchenko](https://github.com/yarik01337)]

## Support:
- GitHub: yarik01337/simple-snowflake-id
- Email: kharchnekoyaroslav@gmail.com