# Work Remotion

Remotion 视频项目集合仓库。每个 `demo-*` 子目录对应一个独立的 Remotion 视频项目，统一由当前 git 仓库管理。

## 目录结构

```
work-remotion/
├── .git/                   # 统一 Git 仓库
├── demo-caveman/           # 示例视频项目 1
├── demo-xxx/               # 可在此处添加更多 demo
├── ...
└── README.md
```

每个 demo 目录下包含独立的 Remotion 项目（`src/`、`public/`、`remotion.config.ts` 等），但共享同一个根仓库提交历史。

## 使用方式

进入任意 demo 目录，按照该项目下的 `README.md` 操作：

```bash
cd demo-caveman
pnpm install    # 首次进入需安装依赖
pnpm dev        # 本地预览
```

## 视频预览

在浏览器中打开 `http://localhost:3000`，使用 Remotion Studio 播放、暂停、调整帧和参数，确认视频效果。

## 导出视频

确认预览无误后，导出视频：

```bash
npx remotion render <组件名称> <输出路径>
```

例如：

```bash
npx remotion render CavemanVideo out/video.mp4
```

导出参数（分辨率、帧率、格式等）在各 demo 的 `remotion.config.ts` 中配置。

## 添加新的 Demo

在根目录下创建新文件夹，例如：

```bash
mkdir demo-myvideo
cd demo-myvideo
# 初始化 Remotion 项目或复制已有模板
```

新目录同样不需要独立的 `.git`，由根仓库统一管理。
