# ROS（Robot Operating System）

ROS 通常每年都会发行一个版本（通常是每年的世界乌龟日），每双数年会发行一个 LTS 版本，

## 环境配置

ROS 主要支持的环境是 Ubuntu，开发和部署建议使用 ROS 和 Ubuntu 的 LTS 版本

项目代码结构

- src：代码空间
- install：安装空间
- build：编译空间
- log：日志空间

## 依赖管理

在 ROS2 中，依赖管理主要通过`rosdep`工具实现，它并非独立的包管理器，而是一个元包管理器，利用系统包管理器（如 Debian/Ubuntu 上的 apt、Fedora/RHEL 上的 dnf 等）完成实际的依赖项安装

每个 ROS 2 包都包含一个`package.xml`文件，其中列出了包的所有依赖项。

- 自动识别依赖项：扫描包的`package.xml`文件，确定所需的系统库和第三方软件包。
- 跨平台支持：根据不同操作系统，自动选择合适的依赖项安装方式。
- 简化安装过程：避免手动安装每个依赖项，提高开发效率。

```bash
# 初始化
sudo rosdep init
rosdep update
# 安装包依赖项 ros_distro为ROS发行版名称如jazzy
rosdep install --ignore-src --from-path src --rosdistro <ros_distro> -y
```

## 节点 nodes

ROS 中的每个节点用于实现单个模块功能

## 主题 topics

节点直接的通信桥梁，采用发布订阅模式，单向传输，适合周期性的数据传递

- 发布者和订阅者多对多
- 异步

```bash
# 查看当前运行的话题
ros2 topic list
# 查看话题发布订阅信息
ros2 topic info <topic_name>
# 查看话题带宽
ros2 topic bw <topic_name>
# 查看话题详细信息
ros2 topic echo <topic_name>
```

话题可视化工具：[rqt_graph](https://roboticsbackend.com/rqt-graph-visualize-and-debug-your-ros-graph/)

## 服务 services

可以实现你问我答的通讯效果，解决话题单向数据传输导致的发布者无法感知订阅者接受状态的问题

## actions

## parameters
