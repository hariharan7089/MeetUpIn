/**
 * Next.js instrumentation hook — runs once at server startup, before any
 * route handler or server action is evaluated.
 *
 * The actual Node-only patching lives in `instrumentation-node.ts` and is
 * imported dynamically only under the Node.js runtime, so the Edge runtime
 * bundle never sees the Node built-ins (avoids "not supported in the Edge
 * Runtime" errors).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation-node");
  }
}
