#! /bin/bash

# get task arn
task=$(aws ecs list-tasks --cluster sample-cluster --service staging|jq -r '.taskArns[0]')

TASK_NOT_DEFINED=null

# task defined thus stop the task
if [[ $task != $TASK_NOT_DEFINED ]]; then

  # task desired count to 0
  aws ecs update-service --cluster sample-cluster --service staging --desired-count 0&>/dev/null

  # stop the task
  aws ecs stop-task --cluster sample-cluster --task $task&>/dev/null

  # repeat to confirm stop the task
  while :
  do
  runningTaskCount=$(aws ecs describe-services --cluster sample-cluster --services staging|jq -r '.services[0].runningCount')
  if [ $runningTaskCount == 0 ]; then
    echo stopped!
    break
  fi
  echo running...
  sleep 5
  done
fi

# task desired count to 1. as a result execute the task.
aws ecs update-service --cluster sample-cluster --service staging --desired-count 1&>/dev/null

# repeat to confirm execute the task
while :
do
result=$(aws ecs describe-services --cluster sample-cluster --services staging|jq -r '.services[0].runningCount')
if [ $result == 1 ]; then
  echo running!
  break
fi
echo not running...
sleep 5
done