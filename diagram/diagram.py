from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import EC2, ECS
from diagrams.aws.database import RDS
from diagrams.aws.network import ELB, ALB
from diagrams.aws.storage import S3
from diagrams.programming.flowchart import Action

with Diagram("Web Service", show=False):
  s3 = S3("s3")
  rds = RDS("rds")
  targetgroupproduction = Action("Target Group Production")
  targetgroupstaging = Action("Target Group Staging")
  edgeProduction = Edge(label="production")
  edgeStaging = Edge(label="production")
  edgeProductionPortToTargetGroup = Edge(label="from production port to production target group listener rule")
  edgeStagingPortToTargetGroup = Edge(label="from Staging port to Staging target group listener rule")
  with Cluster("ECS"):
    alb = ALB("alb")
    with Cluster("t2.micro 1 instance"):
      with Cluster("ECS Service Production"):
        with Cluster("ECS Task"):
          prod = EC2("EC2 Blue/Green Deploy")
      with Cluster("ECS Service Staging"):
        with Cluster("ECS Task"):
          stg = EC2("EC2 Rolling Update")
    s3 >> edgeProduction >> prod
    s3 >> edgeStaging >> stg
    alb >> edgeProductionPortToTargetGroup >> targetgroupproduction >> Edge(label="dynamic port mapping") >> prod >> Edge(label="instance to rds inbound security group") >> rds
    alb >> edgeStagingPortToTargetGroup >> targetgroupstaging >> Edge(label="dynamic port mapping") >> stg >> Edge(label="instance to rds inbound security group") >> rds

