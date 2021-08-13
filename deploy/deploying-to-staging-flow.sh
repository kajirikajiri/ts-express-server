#!/bin/sh

. deploy/stop-staging-task.sh
stopStagingTask

# task desired count to 1. as a result execute the task.
aws ecs update-service --cluster sample-cluster --service staging --desired-count 1 >/dev/null

# repeat to confirm execute the task
while :
do
runningTaskCount=$(aws ecs describe-services --cluster sample-cluster --services staging|jq -r '.services[0].runningCount')
if [ $runningTaskCount = 1 ]; then
  echo running!
  break
fi
echo not running...
sleep 5
done