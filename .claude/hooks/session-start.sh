#!/bin/bash
# Installs the video toolkit (FFmpeg, yt-dlp, HyperFrames) in Claude Code cloud sessions.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# FFmpeg: cuts and mixes video
if ! command -v ffmpeg >/dev/null 2>&1; then
  apt-get update -qq
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq ffmpeg
fi

# yt-dlp: downloads videos
if ! command -v yt-dlp >/dev/null 2>&1; then
  pip install --quiet --root-user-action=ignore yt-dlp
fi

# HyperFrames: captions and graphics
if ! command -v hyperframes >/dev/null 2>&1; then
  npm install -g --silent hyperframes
fi
