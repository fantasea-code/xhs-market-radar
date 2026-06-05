#!/usr/bin/env node

const port = Number(process.argv[2] || process.env.CHROME_DEBUG_PORT || 9222);
const url = `http://127.0.0.1:${port}/json/version`;

async function main() {
  let res;
  try {
    res = await fetch(url);
  } catch (error) {
    console.error(`Chrome Attach doctor: cannot reach ${url}`);
    console.error('Start Chrome with scripts/launch-chrome.ps1, then log in to the target site.');
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

  if (!res.ok) {
    console.error(`Chrome Attach doctor: ${url} returned HTTP ${res.status}`);
    process.exit(1);
  }

  const data = await res.json();
  console.log('Chrome Attach doctor: OK');
  console.log(`Browser: ${data.Browser || 'unknown'}`);
  console.log(`WebSocket: ${data.webSocketDebuggerUrl || 'not reported'}`);
  console.log(`Endpoint: ${url}`);
}

main();
