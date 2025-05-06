# podman

The best free & open source container tools

## [installation](https://podman.io/docs/installation)

Podman 本身是 无守护进程（daemonless） 的容器引擎，原生支持 Linux。但由于 Windows 和 macOS 不是基于 Linux 内核，因此：**Podman 需要一个虚拟机（VM）来提供 Linux 内核**

## containers

## pods

在 Podman 中，Pod 是一个包含一个或多个容器的组，这些容器共享相同的网络命名空间和其他资源。
这一概念源自 Kubernetes，在 Kubernetes 中，Pod 是最小的部署单元。Podman 通过引入 Pod 的概念，使用户能够在本地环境中模拟和测试与 Kubernetes Pod 类似的行为。

- 共享网络命名空间： 同一个 Pod 内的所有容器共享相同的网络命名空间，这意味着它们可以通过 localhost 直接相互通信。
- 资源共享： Pod 内的容器可以共享存储卷和其他资源，方便数据交换和协作。

```bash
# 创建一个 Pod
podman pod create --name my-pod
# 在 Pod 中运行容器
podman run -dt --pod my-pod my-container-image
# 查看当前系统中的 Pod 列表
podman pod ps
# 查看特定 Pod 内的容器
podman ps --pod
```

## images
