# 各种名词

## DevOps

一套软件的的产生重要包括设计、开发、测试、部署、维护几个过程，软件提供服务主要包括开发（ Development ）和运维（ Operations ）两个部分，这两部分从人员到部门组织架构一般都是分开的。开发人员负责尽快的实现功能、发布版本，运维人员负责保证服务的稳定性、可靠性和安全性，这两者本身就是一种冲突。
DevOps 是一套解决方案，提升开发和部署效率及可靠性，这套解决方案一般包括配套工具及开发部署流程规范。

配套工具

- 代码管理
- 打包构建
- CI/CD
- 配置管理
- 监控
- 发布系统
- 灰度、AB 测试
- ChatOps

## XaaS & ServerLess

- IaaS(Infrastructure as a Service)基础设施服务
  - 提供底层硬件服务，开发者无需关心服务器硬件
  - 代表产物：虚拟机、Docker
- PaaS(Platform as a Service)平台服务，软件部署平台
  - 提供 runtime，可以无缝扩展，开发者只需要关注业务逻辑，不需要关注底层依赖
  - 代表产物：云服务(云存储、云数据库等)、中间件服务
- SaaS(Software as a Service)软件服务
  - 将软件的开发、管理、部署都交个第三方，自己不需要关心技术问题
  - 代表产物：npm, dockerhob 等，通过注册账号就可以享受产品服务

开发者需要关心的部分
![iaas、paas、saas开发者需要关心的部分](../../nodes/assets/images/good/Management-Iaas-Saas-Paas-Cloud.jpg)

从 IaaS 到 PaaS
![从IaaS到PaaS](../../nodes/assets/images/good/iass-sass.jpg)

## 微服务

TODO:微服务 -> FaaS ≈ ServerLess

Serverless 不是“无服务器” 而是由云计算服务商负责运维工作，以服务的方式为开发者提供数据库、消息、身份验证等功能。开发人员只需要关心业务代码。

[从 IaaS 到 FaaS—— Serverless 架构的前世今生](https://aws.amazon.com/cn/blogs/china/iaas-faas-serverless/)
[从后端架构演化史到云原生，一文解读云原生架构！](https://cloud.tencent.com/developer/article/1745528?from=information.detail.%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84%E5%8F%91%E5%B1%95%E5%8F%B2)

## 虚拟化

## 容器

## RPC
