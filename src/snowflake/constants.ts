export const SnowflakeConstants = {
  SEQUENCE_BITS: 12n,
  MACHINE_ID_BITS: 5n,
  DATACENTER_ID_BITS: 5n,
  TIMESTAMP_BITS: 41n,
  SIGN_BITS: 1n,

  get MAX_SEQUENCE(): bigint {
    return (1n << this.SEQUENCE_BITS) - 1n
  },

  get MAX_MACHINE_ID(): number {
    return (1 << Number(this.MACHINE_ID_BITS)) - 1
  },

  get MAX_DATACENTER_ID(): number {
    return (1 << Number(this.DATACENTER_ID_BITS)) - 1
  },

  get TIMESTAMP_SHIFT(): bigint {
    return this.SEQUENCE_BITS + this.MACHINE_ID_BITS + this.DATACENTER_ID_BITS
  },

  get DATACENTER_ID_SHIFT(): bigint {
    return this.SEQUENCE_BITS + this.MACHINE_ID_BITS
  },

  get MACHINE_ID_SHIFT(): bigint {
    return this.SEQUENCE_BITS
  }
} as const;