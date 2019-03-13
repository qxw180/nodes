#Mac开发环境
##使用brew作为环境和软件的包管理工具

##使用nvm来管理node的版本
[NVM](https://github.com/creationix/nvm)
``` bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
 # 安装之后：
 mkdir ~/.nvm
 vi ~/.bash_profile
 # 把下面这段添加到后面，注意，如果使用zsh的话，请把这段话贴在 ~/.zshrc 里面
 export NVM_DIR="$HOME/.nvm"
 [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
 # 然后
 source ~/.bash_profile
 # 安装最新版的node
 nvm install node
 # 使用node
 nvm use node
```


##使用iTerm2来作为终端工具，zsh作为shell，Oh My Zsh作为默认配置文件
[iTerm2](https://www.iterm2.com/)Mac下最好用的终端工具
[zsh](https://www.zsh.org/)一款顺手的shell
[Oh My Zsh](https://ohmyz.sh/)让zsh配置降到0门槛