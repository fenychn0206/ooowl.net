---
title: "它很适合我 —— Mole 使用体验"
description: "有了它，深度清理不是事！"
date: 2026-10-11
---

## 前情提要

这段时间感受到 MacBook 储存严重不足，除开文件/APP 以外，还有那 100 多 GB 的「系统资料」怎么也清理不掉。于是我便开始寻找清理工具。

早些时候蹭朋友的许可证，用了一段时间 CleanMyMac，CleanMyMac的「智能呵护」和「垃圾清理」功能的确不错，每隔一段时间进行一次清理总能帮我整掉许多系统垃圾。以及其精美的「空间透镜」功能，可以让我很好地管理硬盘空间。

但后来用着用着发现也就那样，于是便卸载，开始寻找新的清理工具，最后在 [Heo 的文章](https://blog.zhheo.com/p/lgodvfdh.html)中找到了 Mole。

本文将介绍开源免费的 Mole 终端程序。

## TL; DR

如果你不需要 GUI，可以直接像我一样使用开源免费的终端程序：https://github.com/tw93/mole

如果有可视化需求，可以前往[官网](https://mole.fit/zh/)或[数码荔枝](https://lizhi.shop/products/mole)购买。

## 主菜单

安装完成后，终端输入 `mole` 即可打开，主界面非常简洁，长这样：

![Mole 终端版主界面](https://blog-assets.ooowl.net/images/20260825/20260825212145614.png)

中间列出了它的所有功能，下面是操作快捷键，根据它的指引来操作就好了。

~~本文完。~~

## 清理

清理工具最重要的是清理，你可以直接从主菜单选择 `clean` 或在终端中输入 `mo clean` 来开启。或是使用 `mo clean --dry-run` 开启预览模式。

少说话多做事，直接看看效果。

![清理效果](https://blog-assets.ooowl.net/images/20261010/20261010230202005.png)

这次清理一共清除了 20GB 左右的垃圾~~，可以看出我的 Mac 里充满了陈年老垃圾~~。并且除开基础的系统垃圾之外，Mole 还清除了 App 的许多垃圾，如果有清理失败的项目，Mole 也会列出并提供可能的解决方案。

## App 卸载管理

你可以直接从主菜单选择 `uninstall` 或在终端中输入 `mo uninstall` 来开启。或是使用 `mo uninstall --dry-run` 开启预览模式。

![卸载器界面](https://blog-assets.ooowl.net/images/20261011/20261011113303647.png)

<kbd>空格</kbd> 可选择你想要卸载的 App（支持多选），选择好之后按 <kbd>Enter</kbd> 即可开始删除程序。

![删除确认](https://blog-assets.ooowl.net/images/20261011/20261011113541459.png)

Mole 会自动扫描与该 App 相关的各种文件，最后按 <kbd>Enter</kbd> 确认删除。

## 优化

你可以直接从主菜单选择 `optimize` 或在终端中输入 `mo optimize` 来开启。或是使用 `mo optimize --dry-run` 开启预览模式。

![优化效果](https://blog-assets.ooowl.net/images/20261011/20261011113954898.png)

维护中涵盖的项目也渗透至系统的方方面面，同时也会列出哪些已完成，哪些未更改，哪些需要我们自己操作。

## 磁盘分析

和 ClanMyMac 的「空间透镜」以及 Lemon 的「磁盘分析」类似，Mole 也支持通过文件夹大小排序帮你快速移除不需要的大文件。

你可以直接从主菜单选择 `analyze` 或在终端中输入 `mo analyze` 来开启。或是使用 `mo analyze --dry-run` 开启预览模式。

![磁盘分析界面](https://blog-assets.ooowl.net/images/20261011/20261011115208266.png)

在 TUI 中，Mole 运用长条状图形直观地展示出每个文件夹的大小，方便我们快速查找。这个功能同样适合了存文件夹功能的用户自行深度清理缓存。

## 开发项目垃圾清理

Mole 支持清理项目中的构建文件以及依赖，你可以通过这个功能清理长期不维护的项目的构建内容。

你可以在终端中输入 `mo purge` 来开启。或是使用 `mo purge --dry-run` 开启预览模式。

![开发垃圾清理界面](https://blog-assets.ooowl.net/images/20261011/20261011121856965.png)

与卸载器类似，<kbd>空格</kbd> 可选择你想要卸载的内容（支持多选），<kbd>A</kbd> 全选，选择好之后按 <kbd>Enter</kbd> 即可开始删除程序。

## 安装包清理

你可以在终端中输入 `mo installer` 来开启。或是使用 `mo installer --dry-run` 开启预览模式。

![安装包清理界面](https://blog-assets.ooowl.net/images/20261011/20261011123053700.png)

与卸载器类似，<kbd>空格</kbd> 可选择你想要卸载的安装包（支持多选），<kbd>A</kbd> 全选，选择好之后按 <kbd>Enter</kbd> 即可开始删除程序。

## 状态面板

从主菜单选择 `status` 或在终端中输入 `mo status` ，你就打开了一个~~可爱的~~状态面板，会显示 CPU、内存、磁盘、电源、进程与网络信息。

![状态面板](https://blog-assets.ooowl.net/images/20261011/20261011123506744.png)

## 写在最后

当然，除开以上这些，还有一些详细的命令需要你自行探索，可参考 https://github.com/tw93/mole#quick-start 了解更多。

本文完。
