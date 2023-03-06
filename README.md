# This is demo app for ecs deployment

## Run locally:

### Prerequisites:
Nodejs with npm (latest recommended)
### Run:
- Install dependencies: npm install
- Start: npm run start

## Run locally with docker:
- Install docker
- Build package: npm run build
- Build docker image: docker build -t simple-ecs-deploy .
- Start container with image: docker run -d -p 3000:3000 simple-ecs-deploy

## Deploy to ECS with EC2:

### Prerequisites
- Install aws cli
- Install docker

### If deploy image from Docker hub:


Ref: https://docs.docker.com/docker-hub/repos/
- Build docker image: docker build -t <hub-user>/<repo-name>:<tag>
- Push to docker hub repository: docker push <hub-user>/<repo-name>:<tag>
- Set image uri for Task definition = <docker-hub-namespace>/<repository-name>:<tag>

### Create ECR repository

- Go to Amazon ECR
- Create public repository with name simple-ecs-deploy
- View push commands of repository
- Login to aws account using Access key id and Secret access key (If not done yet):
    - Run: aws configure
    - Input Access key id & Secret access key
    - If not have Access key id & Secret access key, then go to IAM to create one
- Execute step by step the push commands, for example:
    - Run: aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/t6m2x6b0
    - Build docker image: docker build -t simple-ecs-deploy .
    - Tag image: docker tag simple-ecs-deploy:latest public.ecr.aws/t6m2x6b0/simple-ecs-deploy:latest
    - Push image to AWS repository: docker push public.ecr.aws/t6m2x6b0/simple-ecs-deploy:latest

### Create ECS cluster

- Go to Amazon ECS
- Create Cluster with name: simple-ecs-cluster
EC2 instance type:
    - Need to select Operating system/Architecture Linux/X86_64
    - Cannot use t4g.small
    - Use t4g.small because of T4g free trial 750 hours per month until 31 December, 2023
    - Ref AMI detail: https://aws.amazon.com/ec2/instance-types/t4/
    - Ref https://aws.amazon.com/ec2/faqs/: "How can customers get access to the T4g free trial"

### Create ECS service

- Select Computed configuration Launch type
- Select EC2 Launch type
- Create Task definition
