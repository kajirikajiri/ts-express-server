#!/bin/sh

# get task arn
task=$(aws ecs list-tasks --cluster sample-cluster --service staging|jq -r '.taskArns[0]')

# task defined thus stop the task
TASK_NOT_DEFINED=null
if [ $task != $TASK_NOT_DEFINED ]; then

  # task desired count to 0
  aws ecs update-service --cluster sample-cluster --service staging --desired-count 0 >/dev/null

  # stop the task
  aws ecs stop-task --cluster sample-cluster --task $task >/dev/null

  # repeat to confirm stop the task
  while :
  do
  runningTaskCount=$(aws ecs describe-services --cluster sample-cluster --services staging|jq -r '.services[0].runningCount')
  if [ $runningTaskCount = 0 ]; then
    echo stopped!
    break
  fi
  echo running...
  sleep 5
  done
fi

# task desired count to 1. as a result execute the task.
deploymentId=$(aws deploy create-deployment --region ap-northeast-1 --cli-input-json file://deploy/create-deployment.json|jq -r '.deploymentId')

# repeat to confirm execute the task
while :
do
instanceTerminationWaitTimeStarted=$(aws deploy get-deployment --deployment-id $deploymentId|jq -r '.deploymentInfo.instanceTerminationWaitTimeStarted')
if [ $instanceTerminationWaitTimeStarted = true ]; then
  echo deployment ok!
  break
fi
echo deploying...
sleep 5
done