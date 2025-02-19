# Python 基础概念&环境配置

## pip（Python Package Installer）

pip 是 Python 官方推荐的包管理工具，用于安装、管理和卸载 Python 包

- 安装包：`pip install <package_name>[==package_version]`
- 更新包：`pip install --upgrade <package_name>`
- 卸载包：`pip uninstall <package_name>`
- 查看包详细信息：`pip show <package_name>`
- 查看已安装包：`pip list`
- 保存依赖：`pip freeze > requirements.txt`
- 安装所有依赖：`pip install -r requirements.txt`

## 虚拟环境

使用 虚拟环境 可以隔离不同项目的依赖，避免版本冲突。

### Conda

Python 环境管理工具，适用于数据科学。Conda 除了管理 Python 环境，还可以管理其他依赖（如 C++ 库）。

- 创建环境：`conda create -n <环境名> [python=<版本号>]`
- 查看所有环境：`conda info --envs`
- 激活环境：`conda activate <环境名>`
- 删除环境：`conda remove -n <环境名> --all`
- 安装包：`conda install <包名>`
- 查看环境中现有的包：`conda list`
- 导出环境：`conda env export > environment.yml`
- 导入环节：`conda env create -f environment.yml`

## 直接运行 py 文件

1. py 文件首行添加注释
2. 给 py 文件添加执行权限：`chmod a+x hello.py`
3. 直接执行：`./hello.py`

```python
#!/usr/bin/env python3

print('hello, world')
```
