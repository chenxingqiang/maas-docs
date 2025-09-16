# 🔌 API 文档

大模型MaaS平台的完整API接口文档。

## 📋 目录

- [认证与授权](#认证与授权)
- [用户管理](#用户管理)
- [模型管理](#模型管理)
- [应用管理](#应用管理)
- [工具集市](#工具集市)
- [社区服务](#社区服务)
- [错误处理](#错误处理)

## 🔐 认证与授权

### 获取访问令牌

```http
POST /api/v1/auth/token
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

**响应示例:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 刷新令牌

```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 👤 用户管理

### 获取用户信息

```http
GET /api/v1/users/profile
Authorization: Bearer {access_token}
```

**响应示例:**
```json
{
  "id": "user_123",
  "username": "john_doe",
  "email": "john@example.com",
  "avatar": "https://example.com/avatar.jpg",
  "role": "developer",
  "created_at": "2024-01-01T00:00:00Z",
  "last_login": "2024-01-15T10:30:00Z"
}
```

### 更新用户信息

```http
PUT /api/v1/users/profile
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "username": "new_username",
  "email": "new@example.com"
}
```

## 🤖 模型管理

### 获取模型列表

```http
GET /api/v1/models?page=1&limit=20&category=text
Authorization: Bearer {access_token}
```

**查询参数:**
- `page` (int): 页码，默认1
- `limit` (int): 每页数量，默认20，最大100
- `category` (string): 模型分类 (text, image, audio, video)
- `search` (string): 搜索关键词
- `sort` (string): 排序方式 (name, created_at, popularity)

**响应示例:**
```json
{
  "data": [
    {
      "id": "model_123",
      "name": "GPT-4",
      "description": "最新的GPT-4模型",
      "category": "text",
      "version": "4.0",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### 获取模型详情

```http
GET /api/v1/models/{model_id}
Authorization: Bearer {access_token}
```

**响应示例:**
```json
{
  "id": "model_123",
  "name": "GPT-4",
  "description": "最新的GPT-4模型",
  "category": "text",
  "version": "4.0",
  "status": "active",
  "parameters": {
    "max_tokens": 4096,
    "temperature": 0.7,
    "top_p": 0.9
  },
  "pricing": {
    "input_tokens": 0.00003,
    "output_tokens": 0.00006
  },
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### 创建模型

```http
POST /api/v1/models
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "My Custom Model",
  "description": "自定义模型描述",
  "category": "text",
  "model_file": "model_file_id",
  "config": {
    "max_tokens": 2048,
    "temperature": 0.8
  }
}
```

## 🚀 应用管理

### 获取应用列表

```http
GET /api/v1/applications?page=1&limit=20
Authorization: Bearer {access_token}
```

**响应示例:**
```json
{
  "data": [
    {
      "id": "app_123",
      "name": "智能客服",
      "description": "基于GPT-4的智能客服应用",
      "model_id": "model_123",
      "status": "running",
      "endpoint": "https://api.example.com/apps/app_123",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

### 创建应用

```http
POST /api/v1/applications
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "智能写作助手",
  "description": "帮助用户进行智能写作的应用",
  "model_id": "model_123",
  "config": {
    "max_tokens": 1000,
    "temperature": 0.7,
    "system_prompt": "你是一个专业的写作助手"
  }
}
```

### 调用应用

```http
POST /api/v1/applications/{app_id}/chat
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "message": "请帮我写一篇关于人工智能的文章",
  "conversation_id": "conv_123",
  "stream": false
}
```

**响应示例:**
```json
{
  "id": "response_123",
  "message": "人工智能是计算机科学的一个分支...",
  "conversation_id": "conv_123",
  "tokens_used": {
    "input": 50,
    "output": 200
  },
  "cost": 0.0015,
  "created_at": "2024-01-15T10:30:00Z"
}
```

## 🛠️ 工具集市

### 获取工具列表

```http
GET /api/v1/tools?category=development&page=1&limit=20
Authorization: Bearer {access_token}
```

**响应示例:**
```json
{
  "data": [
    {
      "id": "tool_123",
      "name": "代码生成器",
      "description": "基于AI的代码生成工具",
      "category": "development",
      "price": 9.99,
      "rating": 4.8,
      "downloads": 1250,
      "author": {
        "id": "user_456",
        "username": "developer_pro"
      },
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 200,
    "pages": 10
  }
}
```

### 购买工具

```http
POST /api/v1/tools/{tool_id}/purchase
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "payment_method": "credit_card",
  "billing_address": {
    "country": "CN",
    "city": "Beijing"
  }
}
```

## 👥 社区服务

### 获取社区帖子

```http
GET /api/v1/community/posts?page=1&limit=20&category=discussion
Authorization: Bearer {access_token}
```

**响应示例:**
```json
{
  "data": [
    {
      "id": "post_123",
      "title": "如何优化模型性能",
      "content": "分享一些模型性能优化的经验...",
      "category": "discussion",
      "author": {
        "id": "user_789",
        "username": "ai_expert",
        "avatar": "https://example.com/avatar.jpg"
      },
      "likes": 25,
      "comments": 8,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "pages": 25
  }
}
```

### 创建帖子

```http
POST /api/v1/community/posts
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "我的新模型分享",
  "content": "我开发了一个新的文本生成模型...",
  "category": "showcase",
  "tags": ["nlp", "text-generation", "model"]
}
```

## ❌ 错误处理

### 错误响应格式

所有API错误都遵循统一的响应格式：

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "请求参数无效",
    "details": {
      "field": "email",
      "reason": "邮箱格式不正确"
    },
    "request_id": "req_123456789"
  }
}
```

### 常见错误码

| 错误码 | HTTP状态码 | 描述 |
|--------|------------|------|
| `INVALID_REQUEST` | 400 | 请求参数无效 |
| `UNAUTHORIZED` | 401 | 未授权访问 |
| `FORBIDDEN` | 403 | 禁止访问 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `RATE_LIMITED` | 429 | 请求频率超限 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |

### 限流说明

- **认证用户**: 每分钟1000次请求
- **匿名用户**: 每分钟100次请求
- **模型调用**: 每分钟100次调用

## 📊 状态码说明

| 状态码 | 描述 |
|--------|------|
| 200 | 请求成功 |
| 201 | 资源创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 429 | 请求频率超限 |
| 500 | 服务器错误 |

## 🔗 相关链接

- [贡献指南](../CONTRIBUTING.md)
- [安全策略](../SECURITY.md)
- [更新日志](../CHANGELOG.md)
- [项目状态](STATUS.md)

---

*最后更新: 2024-01-16*
