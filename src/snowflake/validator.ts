import { SnowflakeConstants } from './constants';

export class SnowflakeValidator {
  static validate(config: {
    datacenterId: number;
    machineId: number;
  }): void {
    this.validateDatacenterId(config.datacenterId);
    this.validateMachineId(config.machineId);
  }

  private static validateDatacenterId(value: number): void {
    if (value > SnowflakeConstants.MAX_DATACENTER_ID || value < 0) {
      throw new Error(`Invalid datacenter ID: ${value}`);
    }
  }

  private static validateMachineId(value: number): void {
    if (value > SnowflakeConstants.MAX_MACHINE_ID || value < 0) {
      throw new Error(`Invalid machine ID: ${value}`);
    }
  }
}