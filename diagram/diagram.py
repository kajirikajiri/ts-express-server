from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDS
from diagrams.aws.storage import S3
from diagrams.onprem.ci import GithubActions
from diagrams.onprem.vcs import Github
from diagrams.custom import Custom
from diagrams.generic.device import Mobile, Tablet


with Diagram("Web Service", show=False):
  cloud_flare = Custom("CloudFlare", "./diagram/cloudflare-icon-color_3x.png")
  github = Github("")
  github_actions = GithubActions("GithubActions")
  mobile = Mobile("device")
  tablet = Tablet("device")
  with Cluster("AWS"):
    s3 = S3("s3")
    rds = RDS("rds")
    with Cluster("ECS"):
      with Cluster("ALB"):
        with Cluster("t2.micro 1 instance"):
          with Cluster("Target Group Prod"):
            with Cluster("ECS Service"):
              with Cluster("ECS Task"):
                prod = EC2("EC2")
                prod >> s3
          with Cluster("Target Group Stg"):
            with Cluster("ECS Service"):
              with Cluster("ECS Task"):
                stg = EC2("EC2")
                stg >> s3
  github >> github_actions >> Edge(label="Blue/Green Deploy") >> prod >> rds
  github_actions >> Edge(label="Rolling Update") >> stg >> rds
  mobile >> cloud_flare >> Edge(label="to ALB") >> prod
  tablet >> Edge(label="to ALB") >> stg