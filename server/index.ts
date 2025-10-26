#!/usr/bin/env node

/**
 * This file now runs Next.js instead of Express
 * The Next.js application is located in the app/ directory
 */

import { spawn } from "child_process";

console.log("🚀 Starting Next.js development server with Turbopack...");

const nextDev = spawn("npx", ["next", "dev", "--turbo"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

nextDev.on("error", (error) => {
  console.error("Failed to start Next.js:", error);
  process.exit(1);
});

nextDev.on("close", (code) => {
  if (code !== 0) {
    console.error(`Next.js process exited with code ${code}`);
    process.exit(code || 1);
  }
});

// Handle cleanup
process.on("SIGINT", () => {
  nextDev.kill("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  nextDev.kill("SIGTERM");
  process.exit(0);
});
