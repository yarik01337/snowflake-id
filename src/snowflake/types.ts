export interface SnowflakeConfig {
  epoch?: bigint;
  datacenterId?: number;
  machineId?: number;
}

export interface DecomposedSnowflake {
  timestamp: bigint;
  datacenterId: number;
  machineId: number;
  sequence: number;
  epoch: bigint;
}

export type SnowflakeID = bigint | string;