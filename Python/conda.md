* conda --version 查看版本



环境

* activate env_name 切换到指定环境
* conda deactivate 退出环境
* conda info -e 显示所有已经创建的环境
* conda create --name new_env_name --clone old_env_name 创建新环境
* conda create -n py37 python=3.7 按照指定python版本创建新环境
* conda remove --name env_name --all 移除环境



包

* conda list 查看所有已经安装的包
* conda install pkg_name 在当前环境中安装包
* conda install --name env_name pkg_name 在指定环境中安装包
* conda remove --name env_name pkg_name 删除指定环境中的包
* conda remove pkg 删除当前环境中的包
* conda update --all 更新所有包
* conda update pkg_name 更新指定的包



源

* 添加源
  1. 先 conda config --add channels https://repo.continuum.io/pkgs/main/  
  2. 然后  conda config --set show_channel_urls yes 
* 删除源
  *  conda config --remove channels ‘https://repo.continuum.io/pkgs/main/‘   （删除有引号） 
  *  如果遇到无法删除可以尝试先执行
    conda config --set show_channel_urls yes
    再执行
    conda config --remove channels ’https://repo.continuum.io/pkgs/main/‘ 

* 恢复Anaconda的源为默认  

  **conda config --remove-key channels**



jupyter切换kernel

1. 创建新环境

2. activate 新环境

3. 安装 `conda install ipykernel`

4. 将新环境加入到kernel中 

   ```shell
   python -m ipykernel install --user --name 要加入到kernel的环境名称 --display-name "jupyter界面中显示的kernel名称"
   ```

   >   要加入到kernel的环境名称 : 这个一般是base
   >
   >   jupyter界面中显示的kernel名称: 这个一般写当前环境的名称

5. 重启jupyter

6. 即可在kernel选项中切换kernel