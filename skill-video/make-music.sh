#!/usr/bin/env bash
# 以 ffmpeg 合成一段低調的環境音樂（A 小調長音 pad），作為影片背景聲。
# 用法：bash make-music.sh <秒數> <輸出檔.m4a>
set -euo pipefail
DUR="${1:-168}"
OUT="${2:-music.m4a}"
FADE_OUT_START=$(python3 -c "print(max(0, ${DUR}-6))")
EXPR="0.11*sin(2*PI*110*t)*(0.6+0.4*sin(2*PI*0.07*t))\
+0.08*sin(2*PI*164.81*t)*(0.6+0.4*sin(2*PI*0.05*t+1))\
+0.07*sin(2*PI*220*t)*(0.6+0.4*sin(2*PI*0.09*t+2))\
+0.045*sin(2*PI*261.63*t)*(0.5+0.5*sin(2*PI*0.06*t+4))\
+0.05*sin(2*PI*329.63*t)*(0.5+0.5*sin(2*PI*0.11*t+3))\
+0.03*sin(2*PI*440*t)*(0.5+0.5*sin(2*PI*0.13*t))"
ffmpeg -y -loglevel error -f lavfi -i "aevalsrc='${EXPR}|${EXPR}':s=44100:d=${DUR}" \
  -af "lowpass=f=900,highpass=f=60,tremolo=f=0.25:d=0.12,afade=t=in:d=3,afade=t=out:st=${FADE_OUT_START}:d=6,volume=0.45" \
  -c:a aac -b:a 160k "$OUT"
echo "music -> $OUT"
