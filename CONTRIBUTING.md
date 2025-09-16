# 🤝 贡献指南

感谢您对大模型MaaS平台项目的关注！我们欢迎各种形式的贡献。

## 📋 目录

- [如何贡献](#如何贡献)
- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
- [提交流程](#提交流程)
- [问题报告](#问题报告)
- [功能请求](#功能请求)
- [文档贡献](#文档贡献)

## 🚀 如何贡献

### 贡献类型

我们欢迎以下类型的贡献：

- 🐛 **Bug修复**: 修复现有功能的问题
- ✨ **新功能**: 添加新的功能特性
- 📚 **文档改进**: 完善文档内容
- 🎨 **UI/UX优化**: 改进用户界面和体验
- ⚡ **性能优化**: 提升系统性能
- 🧪 **测试**: 添加或改进测试用例
- 🔧 **工具改进**: 改进开发工具和流程

### 贡献流程

1. **Fork项目** - 点击右上角的Fork按钮
2. **创建分支** - 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. **提交更改** - 提交您的更改 (`git commit -m 'Add amazing feature'`)
4. **推送分支** - 推送到您的Fork (`git push origin feature/amazing-feature`)
5. **创建PR** - 创建Pull Request

## 🛠️ 开发环境设置

### 环境要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0
- **Git**: >= 2.0.0

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/chenxingqiang/maas-docs.git
cd maas-docs
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **验证安装**
```bash
npm run validate
npm run test
```

### 开发工具

推荐使用以下开发工具：

- **编辑器**: VS Code
- **插件**: 
  - Markdown All in One
  - Prettier
  - ESLint
  - GitLens

## 📝 代码规范

### Markdown规范

我们使用以下Markdown规范：

- **标题**: 使用 `#` 表示标题层级
- **列表**: 使用 `-` 表示无序列表
- **代码块**: 使用 ``` 包围代码
- **链接**: 使用 `[文本](链接)` 格式
- **图片**: 使用 `![alt](链接)` 格式

### 文件命名

- **文档文件**: 使用中文名称，如 `用户指南.md`
- **配置文件**: 使用英文名称，如 `package.json`
- **脚本文件**: 使用英文名称，如 `validate-links.js`

### 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明:**
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例:**
```
feat: 添加用户认证功能

- 实现JWT令牌认证
- 添加用户登录/注册接口
- 更新API文档

Closes #123
```

## 🔄 提交流程

### 1. 创建Issue

在提交代码之前，请先创建Issue讨论您的想法：

- **Bug报告**: 使用Bug报告模板
- **功能请求**: 使用功能请求模板
- **文档改进**: 使用文档改进模板

### 2. 创建分支

```bash
# 从main分支创建新分支
git checkout -b feature/your-feature-name

# 或者从issue创建分支
git checkout -b fix/issue-123
```

### 3. 开发代码

- 遵循代码规范
- 添加必要的测试
- 更新相关文档
- 确保所有测试通过

### 4. 提交代码

```bash
# 添加更改
git add .

# 提交更改
git commit -m "feat: 添加新功能"

# 推送分支
git push origin feature/your-feature-name
```

### 5. 创建Pull Request

- 填写PR模板
- 关联相关Issue
- 请求代码审查
- 等待合并

## 🐛 问题报告

### 报告Bug

使用以下模板报告Bug：

```markdown
## Bug描述
简要描述Bug的情况

## 重现步骤
1. 进入页面 '...'
2. 点击按钮 '...'
3. 滚动到 '...'
4. 看到错误

## 预期行为
描述您期望发生的情况

## 实际行为
描述实际发生的情况

## 环境信息
- 操作系统: [e.g. Windows 10]
- 浏览器: [e.g. Chrome 91]
- 版本: [e.g. 1.0.0]

## 截图
如果适用，请添加截图

## 附加信息
添加任何其他相关信息
```

### 报告安全漏洞

如果您发现了安全漏洞，请通过以下方式报告：

- **邮箱**: security@example.com
- **描述**: 详细描述漏洞情况
- **影响**: 说明漏洞的影响范围
- **修复建议**: 如果有的话，提供修复建议

## 💡 功能请求

### 请求新功能

使用以下模板请求新功能：

```markdown
## 功能描述
简要描述您希望添加的功能

## 使用场景
描述这个功能的使用场景

## 预期效果
描述添加这个功能后的预期效果

## 替代方案
描述您考虑过的替代方案

## 附加信息
添加任何其他相关信息
```

## 📚 文档贡献

### 文档类型

我们欢迎以下文档贡献：

- **用户指南**: 帮助用户使用平台
- **开发者文档**: 帮助开发者集成API
- **API文档**: 详细的API接口说明
- **部署指南**: 帮助部署和运维
- **最佳实践**: 分享使用经验

### 文档规范

- **语言**: 中文为主，英文为辅
- **格式**: Markdown格式
- **结构**: 清晰的标题层级
- **示例**: 提供代码示例
- **链接**: 使用相对链接

### 文档审查

所有文档更改都需要经过审查：

- **内容准确性**: 确保信息正确
- **格式规范**: 遵循Markdown规范
- **链接有效性**: 确保所有链接有效
- **用户体验**: 确保易于理解

## 🏷️ 标签说明

我们使用以下标签分类Issue和PR：

### Issue标签

- `bug`: Bug报告
- `enhancement`: 功能增强
- `documentation`: 文档相关
- `good first issue`: 适合新手的Issue
- `help wanted`: 需要帮助的Issue
- `priority: high`: 高优先级
- `priority: medium`: 中优先级
- `priority: low`: 低优先级

### PR标签

- `ready for review`: 准备审查
- `needs review`: 需要审查
- `approved`: 已批准
- `changes requested`: 需要修改
- `merged`: 已合并

## 🎯 贡献者认可

我们重视每一位贡献者：

- **贡献者列表**: 在README中列出贡献者
- **特殊贡献**: 对重大贡献者给予特殊认可
- **社区徽章**: 为活跃贡献者提供徽章
- **感谢信**: 定期发送感谢信

## 📞 联系我们

如果您有任何问题，请通过以下方式联系我们：

- **GitHub Issues**: 在项目仓库创建Issue
- **邮箱**: contact@example.com
- **讨论区**: GitHub Discussions
- **微信群**: 扫描二维码加入

## 📄 许可证

通过贡献代码，您同意您的贡献将在 [MIT许可证](LICENSE) 下发布。

---

感谢您的贡献！🎉

*最后更新: 2024-01-16*
