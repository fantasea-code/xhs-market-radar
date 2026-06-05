param(
  [int]$Port = 9222,
  [string]$ProfileDir = "C:\chrome-ai-profile",
  [string]$ChromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
)

if (-not (Test-Path -LiteralPath $ChromePath)) {
  throw "Chrome not found at: $ChromePath"
}

New-Item -ItemType Directory -Path $ProfileDir -Force | Out-Null

$args = @(
  "--remote-debugging-port=$Port",
  "--user-data-dir=$ProfileDir"
)

Start-Process -FilePath $ChromePath -ArgumentList $args -WindowStyle Normal

Write-Host "Started Chrome for Agent use."
Write-Host "CDP endpoint: http://127.0.0.1:$Port"
Write-Host "Profile dir: $ProfileDir"
