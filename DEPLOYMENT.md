# 文档网站部署指南

## 🚀 快速部署到GitHub Pages

### 1. 创建GitHub仓库

1. 在GitHub上创建一个新仓库，命名为 `maas-docs`
2. 将本地文件推送到GitHub仓库：

```bash
git init
git add .
git commit -m "Initial commit: MaaS platform documentation"
git branch -M main
git remote add origin https://github.com/chenxingqiang/maas-docs.git
git push -u origin main
```

### 2. 启用GitHub Pages

1. 进入仓库的 **Settings** 页面
2. 滚动到 **Pages** 部分
3. 在 **Source** 下选择 **GitHub Actions**
4. 保存设置

### 3. 自动部署

GitHub Actions会自动检测到 `.github/workflows/docsify.yml` 文件并开始部署。

## 🛠️ 本地开发

### 安装Docsify

```bash
npm install -g docsify-cli
```

### 启动本地服务器

```bash
docsify serve .
```

访问 `http://localhost:3000` 查看文档网站。

## 📝 编辑文档

### 在线编辑
- 直接在GitHub上编辑markdown文件
- 网站会自动更新（需要等待几分钟）

### 本地编辑
1. 克隆仓库到本地
2. 编辑markdown文件
3. 提交并推送更改

```bash
git add .
git commit -m "Update documentation"
git push
```

## 🎨 自定义配置

### 修改主题
编辑 `index.html` 中的CSS样式：

```css
:root {
  --theme-color: #42b983;  /* 主题色 */
  --sidebar-width: 300px;  /* 侧边栏宽度 */
}
```

### 添加插件
在 `index.html` 中添加更多Docsify插件：

```html
<!-- 数学公式支持 -->
<script src="//cdn.jsdelivr.net/npm/docsify-katex@latest/dist/docsify-katex.js"></script>

<!-- 图片缩放 -->
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
```

## 🔧 高级配置

### 自定义域名
1. 在仓库根目录创建 `CNAME` 文件
2. 添加您的域名：
   ```
   docs.yourdomain.com
   ```
3. 在DNS设置中添加CNAME记录

### SEO优化
在 `index.html` 中添加meta标签：

```html
<meta name="description" content="大模型MaaS平台项目文档">
<meta name="keywords" content="MaaS,大模型,AI,文档">
<meta property="og:title" content="大模型MaaS平台文档">
<meta property="og:description" content="完整的大模型即服务平台技术文档">
```

## 📊 网站功能

### 已启用的功能
- ✅ 响应式设计
- ✅ 搜索功能
- ✅ 代码高亮
- ✅ 复制代码
- ✅ 分页导航
- ✅ 编辑链接
- ✅ 移动端适配

### 可添加的功能
- 📊 访问统计
- 💬 评论系统
- 🔔 更新通知
- 📱 PWA支持
- 🌙 暗色主题

## 🐛 故障排除

### 常见问题

1. **网站无法访问**
   - 检查GitHub Pages设置
   - 确认Actions部署成功

2. **搜索功能不工作**
   - 检查 `_sidebar.md` 文件格式
   - 确认文件路径正确

3. **样式显示异常**
   - 清除浏览器缓存
   - 检查CDN链接是否可访问

### 获取帮助
- 📧 邮箱: support@maas-platform.com
- 💬 微信群: 扫码加入技术交流群
- 🐛 问题反馈: [GitHub Issues](https://github.com/chenxingqiang/maas-docs/issues)

---

**部署完成后，您的文档网站将在以下地址访问：**
`https://chenxingqiang.github.io/maas-docs`
