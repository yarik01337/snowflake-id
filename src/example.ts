import { Snowflake } from './snowflake';

const generator = new Snowflake({
  epoch: 1288834974657n,
  datacenterId: 5,
  machineId: 10
});
const id1 = generator.generate(); // bigint
const id2 = generator.generate('string'); // string

console.log({ id1, id2 });

const details = Snowflake.decompose(id1, 1288834974657n);
console.log(details);