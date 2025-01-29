import { SnowflakeConstants } from './constants';
import { SnowflakeConfig, DecomposedSnowflake, SnowflakeID } from './types';
import { SnowflakeValidator } from './validator';
import { SnowflakeComposer } from './composer';
import { SnowflakeParser } from './parser';

export class Snowflake {
  private lastTimestamp = -1n;
  private sequence = 0n;
  private readonly composer: SnowflakeComposer;

  constructor(private readonly config: SnowflakeConfig = {}) {
    this.config.epoch ??= 1288834974657n;
    this.config.datacenterId ??= 0;
    this.config.machineId ??= 0;

    SnowflakeValidator.validate({
      datacenterId: this.config.datacenterId,
      machineId: this.config.machineId
    });

    this.composer = new SnowflakeComposer(
      this.config.epoch,
      this.config.datacenterId,
      this.config.machineId
    );
  }

  generate(format: 'bigint' | 'string' = 'bigint'): SnowflakeID {
    let timestamp = this.currentTimestamp;

    if (timestamp < this.lastTimestamp) {
      throw new Error('Clock moved backwards!');
    }

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1n) & SnowflakeConstants.MAX_SEQUENCE;
      if (this.sequence === 0n) {
        timestamp = this.waitNextMillis(timestamp);
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    const id = this.composer.compose(timestamp, this.sequence);
    return format === 'bigint' ? id : id.toString();
  }

  static decompose(id: SnowflakeID, epoch: bigint): DecomposedSnowflake {
    const numericId = typeof id === 'string' ? BigInt(id) : id;
    return SnowflakeParser.decompose(numericId, epoch);
  }

  private get currentTimestamp(): bigint {
    return BigInt(Date.now());
  }

  private waitNextMillis(currentTimestamp: bigint): bigint {
    let timestamp = this.currentTimestamp;
    while (timestamp <= currentTimestamp) {
      timestamp = this.currentTimestamp;
    }
    return timestamp;
  }
}