import { SnowflakeConstants } from './constants';
import { DecomposedSnowflake } from './types';

export class SnowflakeParser {
  static decompose(id: bigint, epoch: bigint): DecomposedSnowflake {
    return {
      timestamp: (id >> SnowflakeConstants.TIMESTAMP_SHIFT) + epoch,
      datacenterId: Number(
        (id >> SnowflakeConstants.DATACENTER_ID_SHIFT) &
        BigInt(SnowflakeConstants.MAX_DATACENTER_ID)
      ),
      machineId: Number(
        (id >> SnowflakeConstants.MACHINE_ID_SHIFT) &
        BigInt(SnowflakeConstants.MAX_MACHINE_ID)
      ),
      sequence: Number(id & SnowflakeConstants.MAX_SEQUENCE),
      epoch
    };
  }
}