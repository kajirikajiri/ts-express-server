#!/bin/sh

. deploy/stop-staging-task.sh
stopStagingTask

# Start blue/green deployment.
deploymentId=$(aws deploy create-deployment --region ap-northeast-1 --cli-input-json file://deploy/create-deployment.json|jq -r '.deploymentId')

# repeat to confirm deployment succeeded
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