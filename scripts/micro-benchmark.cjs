const crypto = require('crypto');
const { performance } = require('perf_hooks');
const CryptoJS = require('crypto-js');
const { hmac } = require('../dist/cjs');

// Configuration for the benchmark
const message = 'Benchmarking HMAC performance';
const key = 'supersecretkey';
const initialIterations = 1000;
const maxIterations = 100000;
const incrementFactor = 10;

// Node.js native HMAC implementation
function nativeHmac(key, message) {
  return crypto.createHmac('sha256', key).update(message).digest('hex');
}

// CryptoJS HMAC implementation
function cryptoJsHmac(key, message) {
  return CryptoJS.HmacSHA256(message, key).toString(CryptoJS.enc.Hex);
}

// Benchmark function to measure execution time
function benchmark(label, func, iterations) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    func();
  }
  const end = performance.now();
  console.log(
    `${label} took ${(end - start).toFixed(2)} ms for ${iterations} iterations`,
  );
}

// Ensure the key and message are in Uint8Array format for the
// custom HMAC function
const keyBytes = new Uint8Array(Buffer.from(key, 'utf-8'));
const messageBytes = new Uint8Array(Buffer.from(message, 'utf-8'));

console.log('Starting HMAC performance comparison:');
for (
  let iterations = initialIterations;
  iterations <= maxIterations;
  iterations *= incrementFactor
) {
  console.log(`\nRunning ${iterations} iterations:`);

  benchmark('Node Native HMAC', () => nativeHmac(key, message), iterations);
  benchmark('CryptoJS HMAC', () => cryptoJsHmac(key, message), iterations);
  benchmark(
    'Custom HMAC Implementation',
    () => hmac(keyBytes, messageBytes),
    iterations,
  );
}
