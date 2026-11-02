# Yuxiang Lin Homepage：本地运行与内容维护

本站以 academic-homepage 的 Jekyll 框架为基础，迁入 PRISM 的个人简介、14 篇论文、11 条历史动态、头像和论文配图，并补充教育、审稿、奖学金与达摩院实习。

## 语言与页面

- `/`、`/publications`、`/cv`：英文。
- `/zh/`、`/zh/publications`、`/zh/cv`：中文。
- 根路径固定显示英文，语言由 URL 决定；导航提供手动切换。
- 深浅主题可通过导航按钮切换；论文页提供搜索、年份/类型筛选、逐篇 BibTeX 和文献列表下载。
- 默认采用深炭黑背景、暖白正文与金色点缀；主题按钮可切换为暖白浅色版本。
- 浏览器会记住手动选择的主题，首次访问默认黑金；主题设置不影响页面语言。
- 论文按年月倒序排列，同月按 `source_order` 保持原 BibTeX 中的先后；首页、论文页和 CV 共用 `_includes/personal/publications.html`。

## 本机运行

在本目录执行：

```bash
./preview.sh
```

打开 <http://127.0.0.1:4000/>。按 Ctrl+C 停止。此脚本使用本目录 `.bundle/tools/` 中的 Bundler 和 `vendor/bundle/` 中的项目依赖。

静态构建：

```bash
GEM_HOME="$PWD/.bundle/tools" GEM_PATH="$PWD/.bundle/tools" BUNDLE_PATH="$PWD/vendor/bundle" .bundle/tools/bin/bundle exec jekyll build
```

输出目录为 `_site/`。将来在新的机器上运行，需要 Ruby、匹配的开发头文件、编译工具和 Bundler，然后执行 `bundle config set --local path vendor/bundle` 与 `bundle install`。

## GitHub Pages 发布

线上地址为 <https://lenislin.github.io/>，源码仓库为 `LenisLin/lenislin.github.io`。
推送到 `main` 后，`.github/workflows/deploy.yml` 会构建 Jekyll 并发布 `_site/`。
GitHub Pages 的发布来源使用 GitHub Actions。`Gemfile.lock` 随源码提交，以固定构建依赖。
本机 `academic-homepage` 的 `origin` 指向个人主页仓库，`upstream` 保留模板仓库地址。

## 内容维护位置

| 内容 | 维护位置 |
| --- | --- |
| 身份、联系方式、双语简介、教育/实习/审稿/奖项 | `_data/profile.yml` |
| 双语界面文案 | `_data/ui.yml` |
| 导航 | `_data/navigation.yml` |
| 首页新闻/精选条数 | `_data/display.yml` |
| 论文元数据、作者、配图、链接、BibTeX | `_publications/*.md` |
| 动态与中英文内容 | `_news/*.md` |
| 头像、论文图片、研究主题横幅 | `assets/images/` |
| 可下载 BibTeX | `assets/files/publications.bib` |
| 页面布局与样式 | `_layouts/`、`_includes/personal/`、`assets/css/personal.css` |

迁移后，`_data/`、`_publications/`、`_news/` 是网站内容的维护来源，运行不再依赖相邻的 PRISM 或 CV 目录。可下载的 `.bib` 是迁移时的文献快照；以后增改论文时，需同步该文件中的相应记录。

网页头像与论文封面使用同目录的 `.webp` 展示版本（头像宽 600 px、论文封面宽 432 px），降低首次加载体积。更新图片时，生成对应展示版本并修改 `portrait_url` 或论文的 `cover`。机构 Logo 直接加载，使 CV 打印时也能显示；打印使用白底深色文字。

## 信息口径

- 教育、审稿、奖励来自 Awesome-PhD-CV 中主简历实际引用的 `education.tex`、`academic_service.tex`、`honors.tex`。
- 博士：2022–2027（预计）；本科：2018.09–2022.06。
- 达摩院实习来自用户补充：2026.10–至今，职务为 Intern。
- 奖学金仅记录本科校级两次、博士三次，未提供年份。
- 论文元数据与已有资源链接以 PRISM 为迁移依据；本次不进行外部文献核验。CV 的 TiRank 署名角色在不同材料中存在差异，本次保留 PRISM 的作者顺序与姓名高亮，待确认后再添加角色标记。
- 首页保留原有 5 篇精选标记；历史新闻折叠展示，日期只按原材料的精度显示。
- 新横幅为本地 SVG，独立绘制单细胞、组织上下文与计算网络元素。
- 机构标识使用官网资源：[厦门大学学校标识](https://www.xmu.edu.cn/sdgl/xxbs.htm)、[达摩院](https://damo.alibaba.com/)。本地文件位于 `assets/images/institutions/`，条目的 `logo` 与 `website` 在 `_data/profile.yml` 维护。

参考设计：<https://cying18.github.io/>。框架许可保留于 `LICENSE`，PRISM 资源的许可保留于 `PRISM-LICENSE`。
