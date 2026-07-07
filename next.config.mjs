/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Stream Node SDK is a server-only package that must not be bundled by
  // Turbopack/webpack — bundling it breaks its class prototypes and throws
  // "Cannot read properties of undefined (reading 'prototype')" on import.
  // Marking it external makes Next require it as a native Node module.
  serverExternalPackages: ["@stream-io/node-sdk"],
};

export default nextConfig;
