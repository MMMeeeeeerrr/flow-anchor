# ✨ FlowAnchor

**Focus manager for the multi-tasking mind.**  
专为 ADHD 和多任务并行者设计的思维锚点工具。

![Project Status](https://img.shields.io/badge/status-active-success.svg) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Style](https://img.shields.io/badge/style-Google_AI_Studio-4285F4.svg)

> **"Context Switching is expensive. Don't lose your train of thought."**
>
> 当我们在多个任务之间频繁切换时，最大的阻力往往不是“做任务”，而是“忘记刚才想到哪了”。FlowAnchor 旨在提供一个极简的缓冲区，帮你低成本地缓存当下的念头，并快速恢复上下文。

## 🧠 Design Philosophy (设计理念)

FlowAnchor 不是一个传统的 To-Do List，而是一个 **"思维缓存区 (Mind Buffer)"**。它的核心设计遵循以下原则：

- **⚡️ 零摩擦启动 (Zero Friction):** 打开即用，无需登录。数据完全保存在浏览器本地 (LocalStorage)。
- **⚓️ 上下文锚点 (Context Anchoring):** 即使切换到别的娱乐或工作，回来时也能通过显眼的输入框和未完成项，瞬间找回"刚才想做啥"。
- **🍬 多巴胺反馈 (Gamification):** 可视化的环形进度条和流畅的微交互，为每一个小步骤的完成提供即时奖励。

## ✨ Key Features (核心功能)

- **瀑布流卡片:** 任务以卡片形式呈现，支持拖拽排序 (`Drag & Drop`)，随心所欲调整优先级。
- **像写代码一样顺滑:** 在任务条目中按下 `Enter` 键即可快速生成下一条，捕捉转瞬即逝的灵感。
- **智能进度盘:** 每个任务卡片右上角都有动态环形进度条，实时显示任务完成度。
- **沉浸式侧边栏:** 左侧导航栏高亮显示当前查看的任务，支持快速跳转。
- **隐私安全:** 所有数据存储在你的设备本地 (`LocalStorage`)，不会上传到任何服务器。

## 🛠 Tech Stack (技术栈)

这个项目是基于现代前端技术栈构建的：

- **Core:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3/v4 compatible)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Drag & Drop:** [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Utils:** `uuid`, `clsx`, `tailwind-merge`

## 🚀 Getting Started (快速开始)

### 本地运行

1.  **克隆仓库**

    ```bash
    git clone https://github.com/YourUsername/flow-anchor.git
    cd flow-anchor
    ```

2.  **安装依赖**

    ```bash
    npm install
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```
    打开浏览器访问 `http://localhost:5173` 即可。

### 部署 (Deployment)

本项目已配置 **GitHub Actions** 自动部署流程。

1.  在 `vite.config.js` 中设置 `base: '/repo-name/'`。
2.  将代码推送到 GitHub 的 `main` 分支。
3.  在 GitHub 仓库设置中：`Settings` -> `Pages` -> Source 选择 `GitHub Actions`。
4.  等待 Action 跑完，你的网页就上线了！

## 📸 Screenshots (截图)

_(建议你部署成功后，截图一张界面放在这里，替换掉这句话。截图会让仓库看起来吸引力倍增！)_

`![App Screenshot](./screenshot.png)`

## 📄 License

This project is open sourced under the MIT license.
