#!/bin/bash
cd /home/kavia/workspace/code-generation/goalmap-visualizer-111016-0bad53c1/goal_roadmap_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

