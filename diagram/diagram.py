from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDS
from diagrams.aws.storage import S3
from diagrams.onprem.ci import GithubActions
from diagrams.onprem.vcs import Github

with Diagram("Web Service", show=False):
  s3 = S3("s3")
  rds = RDS("rds")
  github = Github("")
  with Cluster("ECS"):
    with Cluster("ALB"):
      with Cluster("t2.micro 1 instance"):
        with Cluster("Target Group Prod"):
          with Cluster("ECS Service"):
            with Cluster("ECS Task"):
              prod = EC2("EC2")
        with Cluster("Target Group Stg"):
          with Cluster("ECS Service"):
            with Cluster("ECS Task"):
              stg = EC2("EC2")
  github >> GithubActions("GithubActions") >> Edge(label="Blue/Green Deploy") >> prod >> rds
  github >> GithubActions("GithubActions") >> Edge(label="Rolling Update") >> stg >> rds
  s3 >>  prod
  s3 >>  stg
