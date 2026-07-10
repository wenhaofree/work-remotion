# Remotion Video — 使用说明

本目录为 Remotion 视频项目，用于通过代码生成和导出视频。

## 前置要求

确保已安装 [Node.js](https://nodejs.org/)（推荐 v18+）和 [pnpm](https://pnpm.io/) 或 npm。

## 使用步骤

### 1. 进入 demo 目录

```bash
cd demo-caveman
```

> 后续如果有多个 demo，分别进入对应目录即可，例如 `cd demo-xxx`。

### 2. 构建与安装依赖

```bash
pnpm install
# 或
npm install
```

### 3. 本地预览

在浏览器中实时预览视频效果：

```bash
pnpm dev
# 或
npm run dev
```

浏览器会自动打开 `http://localhost:3000`，你可以在 Remotion Studio 中播放、暂停、调整帧和参数，确认视频效果无误。

### 4. 导出视频

确认预览效果满意后，执行以下命令导出视频：

```bash
npx remotion render <组件名称> <输出路径>
```

例如：

```bash
npx remotion render CavemanVideo out/video.mp4
```

> 导出参数（分辨率、帧率、格式等）可在 `remotion.config.ts` 中配置。

## 项目说明

- `src/` — 视频组件源码
- `public/` — 静态资源（图片、字体等）
- `remotion.config.ts` — Remotion 配置文件

## 参考文档

- [Remotion 官方文档](https://www.remotion.dev/docs/the-fundamentals)
- [Discord 社区](https://discord.gg/6VzzNDwUwV)
- [GitHub Issues](https://github.com/remotion-dev/remotion/issues/new)
