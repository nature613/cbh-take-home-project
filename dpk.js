const crypto = require("crypto");

const createHash = (key) => {
  return crypto.createHash("sha3-512").update(key).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = "0"

  if (typeof event == "object" && event) {
    if (event.partitionKey) {
      const eventPartitionKey = (typeof event.partitionKey == "string") ? event.partitionKey : JSON.stringify(event.partitionKey);
      candidate = eventPartitionKey.length > MAX_PARTITION_KEY_LENGTH ? createHash(eventPartitionKey) : eventPartitionKey
    } else {
      const stringifiedEvent = JSON.stringify(event);
      candidate = createHash(stringifiedEvent)
    }
  }

  return candidate;
};
