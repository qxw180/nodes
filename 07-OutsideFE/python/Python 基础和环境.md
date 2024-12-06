# Python 基础概念&环境配置

## pip Python 包管理工具

- 安装依赖：`pip install package_name`
- 保存依赖：`pip freeze > requirements.txt`
- 安装所有依赖：`pip install -r requirements.txt`

## Anaconda

Python 环境管理工具，适用于数据科学。Conda 除了管理 Python 环境，还可以管理其他依赖（如 C++ 库）。

- 创建环境：`conda create -n <环境名> [python=<版本号>]`
- 查看所有环境：`conda info --envs`
- 激活环境：`conda activate <环境名>`
- 删除环境：`conda remove -n <环境名> --all`
- 安装包：`conda install <包名>`
- 查看环境中现有的包：`conda list`
- 导出环境：`conda env export > environment.yml`
- 导入环节：`conda env create -f environment.yml`
