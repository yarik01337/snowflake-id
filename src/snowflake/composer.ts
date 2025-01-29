import { SnowflakeConstants } from './constants';

export class SnowflakeComposer {
  constructor(
    private readonly epoch: bigint,
    private readonly datacenterId: number,
    private readonly machineId: number
  ) { }

  compose(timestamp: bigint, sequence: bigint): bigint {
    return (
      ((timestamp - this.epoch) << SnowflakeConstants.TIMESTAMP_SHIFT) |
      (BigInt(this.datacenterId) << SnowflakeConstants.DATACENTER_ID_SHIFT) |
      (BigInt(this.machineId) << SnowflakeConstants.MACHINE_ID_SHIFT) |
      sequence
    );
  }
}