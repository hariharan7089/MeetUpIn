/**
 * Node.js-only startup patch. Imported dynamically from `instrumentation.ts`
 * under the Node runtime, so it runs before any server action loads.
 *
 * Node.js v24+ removed the long-deprecated `SlowBuffer` export. The Stream
 * Node SDK depends on `jsonwebtoken` → `jws` → `jwa` → `buffer-equal-constant-time`,
 * and that last (unmaintained) package reads `SlowBuffer.prototype` at import
 * time, which throws "Cannot read properties of undefined (reading 'prototype')"
 * on modern Node. We restore a minimal, compatible `SlowBuffer` so the token
 * provider (actions/stream.actions.ts) can load the SDK.
 *
 * The proper long-term fix is to run an LTS Node version (20/22) that still
 * ships SlowBuffer; this shim keeps the app working on Node 24+ in the meantime.
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nodeBuffer = require("buffer");

if (!nodeBuffer.SlowBuffer) {
  const { Buffer } = nodeBuffer;

  function SlowBuffer(length: number) {
    return Buffer.alloc(Number(length) || 0);
  }
  SlowBuffer.prototype = Object.create(Buffer.prototype);

  nodeBuffer.SlowBuffer = SlowBuffer;
}
