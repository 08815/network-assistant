# 网工智能助手 — 完整开发实施计划

> 整合「网课笔记管家」+「网络故障排除手册」两大方案
> 使用工具：OpenCode AI编程助手
> 技术栈：HTML + CSS + JavaScript（纯前端，零后端依赖）
> 预计工期：5天

---

## 一、产品定位

| 项目 | 内容 |
|------|------|
| 作品名称 | 网工智能助手 |
| 产品定位 | 面向计算机网络技术专业学生的「笔记管理 + 故障排查 + AI智能问答」一体化工具 |
| 核心卖点 | 笔记与故障知识联动，AI基于个人笔记给出个性化排查建议和配置命令 |
| 开发工具 | OpenCode AI编程助手 |
| 数据存储 | localStorage（浏览器本地，无需服务器） |
| 运行方式 | 直接浏览器打开 index.html |

---

## 二、整合后功能架构

```
网工智能助手
├── 模块一：我的笔记（来自方案七）
│   ├── 笔记列表浏览
│   ├── 新增/编辑/删除笔记
│   ├── 智能标签（AI自动推荐标签）
│   └── 笔记搜索
│
├── 模块二：故障手册（来自方案三）
│   ├── 故障案例浏览（按分类）
│   ├── 故障搜索与筛选
│   ├── 故障详情（现象/原因/排查步骤）
│   └── 收藏常用故障
│
├── 模块三：AI智能问答（整合亮点）
│   ├── 基于笔记内容的故障答疑
│   ├── 配置命令生成与解释
│   ├── 知识点关联推荐
│   └── 排查思路智能引导
│
└── 模块四：命令参考（新增）
    ├── 常用网络命令速查（Ping/Tracert/Netstat/Ipconfig等）
    ├── 设备配置示例（华为/思科命令对照）
    └── 命令搜索与收藏
```

---

## 三、核心功能清单（满足竞赛要求）

> 竞赛要求：至少2项独立核心功能 + 至少调用1项AI能力

### 核心功能一：笔记管理

| 子功能 | 说明 | AI调用 |
|--------|------|--------|
| 笔记CRUD | 新增、查看、编辑、删除笔记 | 无 |
| 智能标签 | AI分析笔记内容，自动推荐3-5个标签 | ✅ 文本处理AI |
| 笔记搜索 | 按标题/内容/标签全文搜索 | 无 |
| 笔记分类 | 按标签筛选笔记 | 无 |

### 核心功能二：故障手册

| 子功能 | 说明 | AI调用 |
|--------|------|--------|
| 故障浏览 | 按分类查看15条故障案例 | 无 |
| 故障搜索 | 关键词实时搜索故障 | 无 |
| 故障详情 | 展示现象/原因/排查步骤 | 无 |
| 收藏功能 | 收藏常用故障案例 | 无 |

### 核心功能三：AI智能问答 ⭐（核心亮点）

| 子功能 | 说明 | AI调用 |
|--------|------|--------|
| 故障答疑 | 输入故障现象，AI基于笔记+故障库给出排查思路 | ✅ 智能问答AI |
| 命令生成 | 输入需求（如"配置VLAN 10"），AI生成对应配置命令 | ✅ 文本生成AI |
| 知识点推荐 | AI根据当前查看的故障，推荐相关的笔记条目 | ✅ 文本处理AI |

### 核心功能四：命令速查（加分项）

| 子功能 | 说明 |
|--------|------|
| 命令列表 | 分类展示常用网络命令（Windows/Linux/华为/思科） |
| 命令搜索 | 搜索命令名称和用途 |
| 命令详情 | 展示命令语法、参数说明、使用示例 |

> ✅ 共计 **4项核心功能**，远超竞赛要求的2项
> ✅ 共计 **3处AI能力调用**，远超竞赛要求的1项

---

## 四、数据结构设计

### 4.1 笔记数据（notes）

```javascript
// js/data-notes.js
const notesData = [
  {
    id: 1,
    title: "VLAN配置基础",
    content: "VLAN（虚拟局域网）可以将一个物理局域网在逻辑上划分成多个广播域。配置步骤：1. 创建VLAN：vlan 10  2. 端口加入VLAN：port link-type access, port default vlan 10  3. 验证：display vlan",
    tags: ["VLAN", "华为命令", "二层交换"],
    createdAt: "2025-03-01",
    updatedAt: "2025-03-05",
    category: "交换技术"
  },
  {
    id: 2,
    title: "静态路由配置",
    content: "静态路由手工配置，适合小型网络。华为命令：ip route-static 目标网段 掩码 下一跳地址。例如：ip route-static 192.168.2.0 255.255.255.0 192.168.1.1",
    tags: ["路由", "华为命令", "静态路由"],
    createdAt: "2025-03-02",
    updatedAt: "2025-03-05",
    category: "路由技术"
  },
  // ... 共预置8-10条示例笔记
];
```

### 4.2 故障案例数据（faults）

```javascript
// js/data-faults.js
const faultsData = [
  {
    id: 1,
    title: "电脑获取不到IP地址",
    category: "连接类",
    tags: ["DHCP", "IP", "获取不到地址"],
    symptom: "电脑网络连接显示黄色感叹号，无法获取IP地址，ipconfig显示169.254.x.x",
    cause: "可能原因：1.DHCP服务器未开启 2.网线接触不良 3.网卡驱动异常 4.交换机端口故障",
    steps: [
      "检查网线是否插好，更换网线测试",
      "检查网卡驱动是否正常，更新驱动",
      "在CMD中执行 ipconfig /release 和 ipconfig /renew",
      "检查交换机端口指示灯，更换端口测试",
      "联系网络管理员检查DHCP服务器状态"
    ],
    difficulty: "初级",
    relatedNotes: [5, 8],  // 关联笔记ID
    relatedCommands: ["ipconfig", "ping"]
  },
  // ... 共15条故障案例
];
```

### 4.3 命令参考数据（commands）

```javascript
// js/data-commands.js
const commandsData = [
  {
    id: 1,
    name: "ping",
    platform: "Windows/Linux",
    category: "连通性测试",
    description: "测试网络连通性，发送ICMP回显请求",
    syntax: "ping [选项] 目标地址",
    examples: [
      "ping 192.168.1.1  // 测试与网关的连通性",
      "ping -t 8.8.8.8   // 持续ping，直到按Ctrl+C停止",
      "ping -n 10 www.baidu.com  // 发送10个包"
    ],
    relatedNotes: [3, 7]
  },
  {
    id: 2,
    name: "tracert / traceroute",
    platform: "Windows / Linux",
    category: "路径追踪",
    description: "追踪数据包从源到目标经过的路由路径",
    syntax: "tracert 目标地址  // Windows\ntraceroute 目标地址  // Linux",
    examples: [
      "tracert www.baidu.com  // 追踪到百度的路径",
      "tracert 8.8.8.8  // 追踪到Google DNS的路径"
    ],
    relatedNotes: [3]
  },
  {
    id: 3,
    name: "vlan（华为）",
    platform: "华为交换机",
    category: "VLAN配置",
    description: "创建VLAN并将端口加入VLAN",
    syntax: "vlan batch 10 20 30  // 批量创建VLAN\nport link-type access  // 设置端口类型\nport default vlan 10  // 端口加入VLAN",
    examples: [
      "// 创建VLAN 10并将端口0/0/1加入\nvlan batch 10\ninterface GigabitEthernet 0/0/1\nport link-type access\nport default vlan 10"
    ],
    relatedNotes: [1]
  },
  // ... 共20条命令参考
];
```

### 4.4 localStorage 数据结构

```javascript
// localStorage中的数据格式
{
  "notes": [...],           // 用户笔记（初始为预置数据）
  "faults": [...],          // 故障案例（只读，初始为预置数据）
  "commands": [...],       // 命令参考（只读，初始为预置数据）
  "favoriteFaults": [1,5], // 收藏的故障ID数组
  "favoriteCommands": [1], // 收藏的命令ID数组
  "recentViewed": [3,1,5], // 最近浏览的ID（混合类型和来源）
  "aiHistory": [...]        // AI对话历史（最多保存20条）
}
```

---

## 五、页面结构设计（6个页面）

### 页面导航结构

```
首页（index.html）
├── 底部导航栏：[笔记] [故障] [命令] [AI问答]
│
├── 笔记列表页（notes-list.html）
│   ├── 搜索框
│   ├── 标签筛选
│   ├── 笔记卡片列表
│   └── 新增笔记按钮（悬浮）
│
├── 笔记详情/编辑页（note-edit.html）
│   ├── 标题输入框
│   ├── 内容文本域
│   ├── 标签展示与编辑
│   ├── [AI推荐标签] 按钮
│   └── 保存/删除按钮
│
├── 故障列表页（faults-list.html）
│   ├── 搜索框
│   ├── 分类筛选（连接类/配置类/性能类/设备类/应用类）
│   ├── 故障卡片列表
│   └── [我的收藏] 入口
│
├── 故障详情页（fault-detail.html）
│   ├── 故障信息展示
│   ├── 排查步骤（可复制）
│   ├── 相关笔记推荐（点击跳转）
│   ├── 相关命令推荐（点击跳转）
│   ├── [AI分析] 按钮
│   └── 收藏按钮
│
├── 命令列表页（commands-list.html）
│   ├── 搜索框
│   ├── 分类筛选（Windows/Linux/华为/思科）
│   ├── 命令卡片列表
│   └── [我的收藏] 入口
│
├── 命令详情页（command-detail.html）
│   ├── 命令名称与平台
│   ├── 语法说明
│   ├── 使用示例（可复制）
│   ├── 相关笔记推荐
│   └── 收藏按钮
│
└── AI问答页（ai-chat.html）
    ├── 对话历史展示
    ├── 快速提问按钮（3个常用问题）
    ├── 输入框
    └── 清除历史按钮
```

### 页面UI结构示例

**首页（index.html）**
```
┌─────────────────────────────────┐
│  [Logo] 网工智能助手            │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │  📝 我的笔记              │   │
│  │  管理你的学习笔记         │   │
│  │  → 进入 [8条笔记]        │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  🔧 故障手册              │   │
│  │  15个常见网络故障排查     │   │
│  │  → 进入 [5个收藏]        │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  💻 命令速查              │   │
│  │  20条常用网络命令参考     │   │
│  │  → 进入 [3个收藏]        │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  🤖 AI智能问答            │   │
│  │  基于你的笔记智能答疑     │   │
│  │  → 开始问答              │   │
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│  [首页] [笔记] [故障] [命令] [AI]│
└─────────────────────────────────┘
```

---

## 六、AI能力调用设计（3处）

### AI调用点1：智能标签推荐

**触发时机**：用户在笔记编辑页点击「AI推荐标签」按钮

**提示词模板**：
```
你是一名网络技术专业导师。
请分析以下学习笔记内容，推荐3-5个标签（每个标签2-6个字），
标签应涵盖：技术点、设备类型、协议名称、应用场景等维度。
笔记内容：{noteContent}
只返回标签列表，格式为：标签1,标签2,标签3
```

**代码实现**：
```javascript
async function aiRecommendTags(noteContent) {
    const prompt = `你是一名网络技术专业导师。
请分析以下学习笔记内容，推荐3-5个标签（每个标签2-6个字），
标签应涵盖：技术点、设备类型、协议名称、应用场景等维度。
笔记内容：${noteContent}
只返回标签列表，格式为：标签1,标签2,标签3`;
    
    // 调用OpenCode AI接口
    const response = await callOpenCodeAI(prompt);
    return response.trim().split(/[,，、\s]+/);
}
```

### AI调用点2：故障智能答疑

**触发时机**：用户在故障详情页点击「AI分析」或在AI问答页输入故障相关问题

**提示词模板**：
```
你是一名资深网络工程师，擅长故障排查。
用户可以参考以下笔记内容（如果有）：
{relatedNotesContent}

当前故障背景：
标题：{faultTitle}
现象：{faultSymptom}
已知排查步骤：{faultSteps}

用户补充现象：{userInput}
请基于以上信息，给出进一步的排查建议。
要求：
1. 分步骤说明，每步不超过30字
2. 如果涉及命令，给出具体命令和说明
3. 如果涉及配置，给出配置示例
4. 推荐用户查看相关笔记（如果有）
```

### AI调用点3：配置命令生成

**触发时机**：用户在AI问答页输入配置需求（如"怎么配置OSPF"）

**提示词模板**：
```
你是一名网络工程师，精通华为和思科命令。
用户需求：{userInput}
请按以下格式回复：
1. 功能说明（一句话）
2. 华为命令示例（含注释）
3. 思科命令示例（含注释，如果适用）
4. 注意事项（2-3点）
5. 推荐相关笔记主题
```

### AI调用封装函数

```javascript
// js/ai.js - AI调用统一封装
const AI_CONFIG = {
    temperature: 0.3,   // 低温度，保证回答准确性
    maxTokens: 800,
    model: "opencode-zen" // 使用OpenCode官方精选模型
};

async function callOpenCodeAI(prompt, options = {}) {
    const { temperature = AI_CONFIG.temperature, maxTokens = AI_CONFIG.maxTokens } = options;
    
    // 显示loading
    showLoading(true);
    
    try {
        // OpenCode AI接口调用
        // 注意：具体API地址和参数格式需根据OpenCode平台文档调整
        const response = await fetch('https://api.opencode.ai/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getApiKey()}` // 从配置读取
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [{ role: 'user', content: prompt }],
                temperature: temperature,
                max_tokens: maxTokens
            })
        });
        
        if (!response.ok) throw new Error(`API错误：${response.status}`);
        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('AI调用失败：', error);
        return `⚠️ AI服务暂时不可用，请稍后重试。\n（错误：${error.message}）`;
    } finally {
        showLoading(false);
    }
}

// 获取API Key（从localStorage读取，用户需在设置页面配置）
function getApiKey() {
    return localStorage.getItem('opencode_api_key') || '';
}

// 保存对话历史到localStorage
function saveAIHistory(question, answer) {
    const history = JSON.parse(localStorage.getItem('aiHistory') || '[]');
    history.unshift({
        q: question,
        a: answer,
        time: new Date().toLocaleString()
    });
    // 最多保存20条
    if (history.length > 20) history.pop();
    localStorage.setItem('aiHistory', JSON.stringify(history));
}
```

---

## 七、详细开发计划（5天）

### Day 1：环境搭建 + 数据准备

**目标**：项目初始化，完成所有模拟数据

#### 步骤1：项目初始化

```bash
mkdir network-assistant && cd network-assistant
opencode
/init
```

在OpenCode（Plan模式）中输入：
```
我想创建一个名为"网工智能助手"的纯前端项目，
整合笔记管理、故障手册、命令速查、AI问答四大模块。
请帮我规划完整的文件目录结构，
并说明每个文件的职责。
```

#### 步骤2：创建所有空文件

按照OpenCode生成的计划，在Build模式创建文件：
```
network-assistant/
├── index.html              # 首页
├── notes-list.html         # 笔记列表
├── note-edit.html          # 笔记编辑/详情
├── faults-list.html        # 故障列表
├── fault-detail.html       # 故障详情
├── commands-list.html      # 命令列表
├── command-detail.html     # 命令详情
├── ai-chat.html            # AI问答
├── css/
│   └── style.css           # 全局样式
├── js/
│   ├── app.js              # 通用工具函数
│   ├── data-notes.js       # 笔记数据
│   ├── data-faults.js      # 故障数据
│   ├── data-commands.js   # 命令数据
│   ├── ai.js               # AI调用封装
│   ├── notes.js            # 笔记模块逻辑
│   ├── faults.js           # 故障模块逻辑
│   └── commands.js         # 命令模块逻辑
└── AGENTS.md               # OpenCode项目说明
```

#### 步骤3：生成模拟数据

在OpenCode中对话（使用 `/web` 联网搜索真实网络命令）：

```
请帮我生成以下3个数据文件，要求内容真实专业：

1. js/data-notes.js - 包含10条网络技术学习笔记，
   涵盖：VLAN、路由协议、ACL、NAT、STP、OSPF、以太网、子网划分
   每条笔记包含：id, title, content(200字左右), tags数组, createdAt, updatedAt, category

2. js/data-faults.js - 包含15条网络故障案例，
   分类均匀覆盖：连接类、配置类、性能类、设备类、应用类
   每条包含：id, title, category, tags, symptom, cause, steps数组(5-8步), difficulty, relatedNotes, relatedCommands

3. js/data-commands.js - 包含20条网络命令参考，
   涵盖：Windows命令(5条)、Linux命令(5条)、华为命令(5条)、思科命令(5条)
   每条包含：id, name, platform, category, description, syntax, examples数组, relatedNotes

请直接生成完整的3个.js文件内容，用JavaScript数组格式，
变量名分别为：notesData, faultsData, commandsData。
```

**当日产出**：
- [x] 项目目录结构完整
- [x] 所有HTML文件创建（空模板）
- [x] 3个数据文件完整生成（共45条数据）
- [x] AGENTS.md文件

---

### Day 2：首页 + 通用样式 + 笔记列表页

**目标**：完成首页和笔记模块的展示功能

#### 步骤1：编写全局样式

在OpenCode中输入：
```
请编写css/style.css，要求：
1. 主色调：#1a73e8（蓝），辅色：#f8f9fa（浅灰），强调色：#34a853（绿），警告色：#ea4335（红）
2. 全局字体：系统默认无衬线字体
3. 卡片样式：白色背景、圆角8px、阴影0 2px 8px rgba(0,0,0,0.1)
4. 按钮样式：主按钮（蓝色填充）、次按钮（蓝色描边）、文字按钮
5. 底部导航栏：固定在底部，5个标签页（首页/笔记/故障/命令/AI）
6. 移动端适配：@media (max-width: 480px) 调整字体和间距
7. 动画：卡片hover时向上移动2px，按钮点击时有缩放效果
请生成完整CSS代码。
```

#### 步骤2：开发首页

```
请编写index.html和对应的js逻辑（可以直接写在HTML的script标签中），要求：
1. 顶部标题栏："网工智能助手"
2. 4个功能入口卡片（笔记/故障/命令/AI），每个卡片有图标、标题、简介、数据统计
3. 最近浏览区域（从localStorage读取，展示最近查看的3条内容）
4. 底部导航栏（5个标签，首页为高亮状态）
5. 点击功能卡片跳转到对应页面
请生成完整可运行的代码。
```

#### 步骤3：开发笔记列表页

```
请编写notes-list.html，功能需求：
1. 顶部搜索框（实时搜索，按标题、内容、标签搜索）
2. 标签筛选区（展示所有标签，点击筛选，再次点击取消）
3. 笔记卡片列表，每张卡片展示：标题、摘要（前50字）、标签、更新时间
4. 右下角悬浮按钮（新增笔记）
5. 点击卡片跳转到note-edit.html?id=xxx（查看模式）
6. 底部导航栏（笔记标签为高亮状态）
请生成完整代码，包括页面逻辑（直接写在script标签）。
```

**当日产出**：
- [x] css/style.css（完整样式）
- [x] index.html（首页，可运行）
- [x] notes-list.html（笔记列表，可运行）
- [x] js/app.js（通用工具函数）

---

### Day 3：笔记编辑页 + 故障列表页 + 故障详情页

**目标**：完成笔记的增删改查，以及故障模块的展示

#### 步骤1：开发笔记编辑/详情页

在OpenCode中输入：
```
请编写note-edit.html，功能需求：
1. 支持两种模式：新增模式（无id参数）和编辑模式（有id参数）
2. 表单字段：标题（input）、内容（textarea）、标签（展示区+输入框）
3. 标签功能：
   - 展示已添加的标签（可点击×删除）
   - 输入框添加新标签（回车或点击添加按钮）
   - [AI推荐标签] 按钮（调用js/ai.js中的函数）
4. 底部操作按钮：[保存] [删除（仅编辑模式显示）] [返回]
5. 保存时验证：标题和内容不能为空
6. 数据存入localStorage的notes数组
请生成完整代码。
```

#### 步骤2：开发故障列表页

```
请编写faults-list.html，功能需求：
1. 顶部搜索框（实时搜索标题和标签）
2. 分类筛选按钮：全部/连接类/配置类/性能类/设备类/应用类
3. 故障卡片列表，每张卡片展示：标题、分类标签、难度（⭐表示）、标签
4. 卡片右上角有收藏按钮（已收藏为红色❤️，未收藏为灰色🤍）
5. 底部有[我的收藏]入口链接
6. 点击卡片跳转到fault-detail.html?id=xxx
7. 底部导航栏（故障标签为高亮状态）
请生成完整代码。
```

#### 步骤3：开发故障详情页

```
请编写fault-detail.html，功能需求：
1. 从URL参数获取故障id，从data-faults.js读取数据渲染
2. 展示区域：
   - 标题 + 分类标签 + 难度
   - 故障现象（引用块样式）
   - 可能原因（无序列表）
   - 排查步骤（有序列表，每步旁有[复制]按钮）
   - 相关笔记推荐（读取relatedNotes字段，展示笔记标题，点击跳转note-edit.html）
   - 相关命令推荐（读取relatedCommands字段，展示命令名称，点击跳转command-detail.html）
3. 底部操作区：
   - [收藏/取消收藏] 按钮
   - [AI智能分析] 按钮（展开输入框，输入后调用AI）
4. 收藏状态存入localStorage的favoriteFaults数组
请生成完整代码，AI调用部分先预留函数接口，Day4完善。
```

**当日产出**：
- [x] note-edit.html（完整可运行，支持新增/编辑/删除）
- [x] faults-list.html（完整可运行，支持搜索/筛选/收藏）
- [x] fault-detail.html（完整可运行，收藏功能可用）
- [x] js/notes.js（笔记模块逻辑）
- [x] js/faults.js（故障模块逻辑）

---

### Day 4：AI问答页 + 命令模块 + AI功能完善

**目标**：完成AI问答功能、命令速查模块，完善所有AI调用

#### 步骤1：编写AI调用封装（js/ai.js）

在OpenCode中输入：
```
请编写js/ai.js，要求：
1. 封装callOpenCodeAI(prompt, options)函数，用于调用OpenCode AI接口
2. 封装aiRecommendTags(noteContent)函数，调用AI推荐标签
3. 封装aiFaultAnalysis(faultInfo, userInput)函数，调用AI进行故障分析
4. 封装aiCommandGen(userInput)函数，调用AI生成配置命令
5. 封装saveAIHistory(question, answer)函数，保存对话历史
6. 封装loadAIHistory()函数，加载对话历史
7. 添加loading提示函数showLoading(boolean)
8. 错误处理：API调用失败时显示友好提示，并给出模拟回复（用于演示）
9. 模拟回复功能：当未配置API Key时，使用预置的回复模板（按关键词匹配）

注意：OpenCode AI接口的具体调用方式可能随版本变化，
请在代码中用注释标注"待替换实际API地址"，
并提供模拟数据用于无API时的演示。
请生成完整代码。
```

> 💡 开发技巧：在AI功能开发阶段，先用模拟回复，确保页面流程通顺，最后再接入真实API。

#### 步骤2：开发AI问答页

```
请编写ai-chat.html，功能需求：
1. 对话展示区：用户问题靠右（蓝色气泡），AI回答靠左（灰色气泡）
2. 输入区：文本框 + [发送]按钮
3. 快速提问按钮（页面底部，点击自动填入）：
   - "电脑连不上网，怎么排查？"
   - "如何配置华为交换机的VLAN？"
   - "OSPF协议配置步骤是什么？"
4. 对话历史从localStorage加载，新对话自动保存
5. [清除历史] 按钮（带确认提示）
6. 调用js/ai.js中的callOpenCodeAI函数发送问题
请生成完整代码。
```

#### 步骤3：开发命令列表页和详情页

```
请编写commands-list.html，功能需求：
1. 顶部搜索框（实时搜索命令名称和描述）
2. 平台筛选按钮：全部/Windows/Linux/华为/思科
3. 命令卡片列表，每张卡片展示：命令名称、平台标签、分类、描述摘要
4. 卡片右上角收藏按钮
5. 点击卡片跳转到command-detail.html?id=xxx
6. 底部导航栏（命令标签为高亮状态）
请生成完整代码。

请编写command-detail.html，功能需求：
1. 展示命令完整信息：名称、平台、分类、详细描述、语法、使用示例（代码块样式，可复制）
2. 相关笔记推荐（读取relatedNotes字段）
3. 收藏按钮（切换状态）
4. [在AI中提问此命令] 按钮（跳转到ai-chat.html并自动填入相关问题）
请生成完整代码。
```

**当日产出**：
- [x] js/ai.js（AI调用封装，含模拟回复）
- [x] ai-chat.html（完整可运行，AI问答流程通顺）
- [x] commands-list.html（完整可运行）
- [x] command-detail.html（完整可运行）
- [x] fault-detail.html中的AI分析功能完善

---

### Day 5：测试 + 美化 + 提交材料

**目标**：全面测试、细节优化、准备竞赛提交材料

#### 测试清单

| 测试项 | 操作步骤 | 预期结果 | 是否通过 |
|--------|---------|---------|---------|
| 首页加载 | 打开index.html | 4个功能入口正常展示，统计数据正确 | □ |
| 笔记列表 | 打开notes-list.html | 10条预置笔记全部展示 | □ |
| 笔记搜索 | 输入关键词搜索 | 实时过滤，结果正确 | □ |
| 笔记新增 | 点击新增按钮，填写内容，保存 | 笔记出现在列表首位，数据持久化 | □ |
| 笔记编辑 | 点击笔记卡片，修改内容，保存 | 内容更新，列表同步 | □ |
| 笔记删除 | 在编辑页点击删除，确认 | 笔记从列表消失 | □ |
| AI推荐标签 | 在编辑页点击AI推荐标签 | 标签自动填入（或弹出模拟回复） | □ |
| 故障列表 | 打开faults-list.html | 15条故障全部展示 | □ |
| 故障搜索 | 输入关键词 | 实时过滤正确 | □ |
| 故障收藏 | 点击收藏按钮 | 状态切换，favorites.html可查看 | □ |
| 故障详情 | 点击故障卡片 | 详情页所有信息正确展示 | □ |
| 相关推荐 | 在故障详情页点击相关笔记/命令 | 正确跳转到对应页面 | □ |
| AI故障分析 | 在故障详情页点击AI分析 | 弹出输入框，发送后显示AI回复 | □ |
| 命令列表 | 打开commands-list.html | 20条命令全部展示 | □ |
| 命令搜索 | 输入关键词 | 实时过滤正确 | □ |
| AI问答 | 打开ai-chat.html，输入问题 | 对话展示正确，历史保存 | □ |
| 快速提问 | 点击快速提问按钮 | 自动填入并发送 | □ |
| localStorage | 刷新页面 | 所有数据持久化，不丢失 | □ |
| 移动端适配 | 用手机模式打开 | 布局不乱，可正常操作 | □ |

#### 界面美化（在OpenCode中进行）

```
请帮我优化整个项目的视觉效果，修改css/style.css：
1. 首页功能卡片增加图标（可以用emoji：📝📋🔧💻🤖）
2. 卡片增加悬停动画（向上移动+阴影加深）
3. 搜索框增加🔍图标（用CSS伪元素）
4. 标签样式优化（圆角小胶囊，主色描边，填充浅蓝）
5. 收藏按钮动画（点击时有个缩放特效）
6. AI对话气泡样式优化（圆角，最大宽度80%）
7. 代码块样式（深底白字，padding，圆角）
8. Loading动画（三个点跳动效果）
请生成优化后的完整CSS代码。
```

#### 提交材料准备

**材料1：项目工程包**
```bash
# 在项目根目录执行
zip -r 网工智能助手_项目工程.zip . -x "*.git*" "*.DS_Store"
```

**材料2：运行截图（至少5张）**

| 序号 | 截图内容 | 操作路径 |
|------|---------|---------|
| 1 | 首页全景 | 打开index.html，完整截图 |
| 2 | 笔记列表+搜索演示 | 打开notes-list.html，输入搜索词后截图 |
| 3 | 故障详情页（核心功能） | 打开fault-detail.html?id=1，完整截图 |
| 4 | AI问答演示（AI功能） | 打开ai-chat.html，有对话记录后截图 |
| 5 | 命令详情页（界面细节） | 打开command-detail.html?id=3，完整截图 |

**材料3：作品说明文档（Word）**

```markdown
# 作品说明文档框架

一、团队信息
- 团队名称：
- 成员姓名：
- 学校：
- 专业：计算机网络技术

二、作品名称
网工智能助手

三、应用背景与使用场景
- 背景：网络技术专业学生在学习过程中需要管理大量笔记，
  在实验和实习中经常遇到网络故障，但缺乏系统性的排查指导工具
- 场景1：日常学习 - 整理和查阅学习笔记
- 场景2：实验课 - 参考故障排查步骤，快速定位问题
- 场景3：考证复习 - 查阅命令参考，巩固配置命令
- 场景4：实习运维 - AI问答辅助故障排查

四、核心功能清单（4项）
1. 笔记管理：支持笔记的增删改查、智能标签推荐、全文搜索
2. 故障手册：15个常见网络故障的排查指南，支持搜索和收藏
3. 命令速查：20条常用网络命令参考，支持搜索和收藏
4. AI智能问答：基于笔记和故障库智能答疑，生成配置命令

五、OpenCode组件及AI能力使用说明
- 开发工具：OpenCode AI编程助手（/init初始化、Plan+Build模式、/review审查代码）
- AI能力调用（3处）：
  1. 智能标签推荐：分析笔记内容，AI推荐相关标签
  2. 故障智能分析：基于故障背景，AI给出进一步排查建议
  3. 配置命令生成：输入需求，AI生成对应配置命令（华为/思科）
- [附ai.js中AI调用代码的截图]

六、作品创新点
1. 笔记与故障知识联动，AI可基于个人笔记给出个性化排查建议
2. 集成笔记管理、故障排查、命令参考、AI问答四大功能，一站式解决学习+工作需求
3. 纯前端实现，无需安装，打开浏览器即可使用，数据本地存储保护隐私
4. 面向网络技术专业深度定制，内容真实贴近实验和实习场景

七、运行操作说明
1. 解压项目包，双击index.html打开
2. 首页选择功能模块（笔记/故障/命令/AI问答）
3. 笔记模块：新增、编辑、搜索笔记，点击"AI推荐标签"获取智能标签
4. 故障模块：搜索或筛选故障，查看排查步骤，点击"AI分析"获取智能建议
5. 命令模块：搜索命令，查看语法和示例，可复制命令
6. AI问答模块：输入任何网络相关问题，AI给出专业回答

八、项目文件清单
[附项目目录结构截图]
```

**当日产出**：
- [x] 所有bug修复（按测试清单逐一验证）
- [x] 界面美化完成
- [x] 5张运行截图（保存为screenshot1-5.png）
- [x] 项目工程包（.zip文件）
- [ ] 作品说明文档（.docx，需手动填写团队信息）

---

## 八、评分要点深度分析

### 评分维度对照表

| 评分维度 | 分值 | 本作品对应亮点 | 预计得分 |
|---------|------|--------------|---------|
| **功能完整性** | 30分 | 4项核心功能，每项都有独立操作价值；功能之间有关联（故障→笔记→命令） | 27-30分 |
| **AI能力运用** | 25分 | 3处AI调用（超要求）；AI功能有实际价值，不是摆设 | 22-25分 |
| **技术实现** | 20分 | 文件结构清晰；组件复用；localStorage数据设计合理 | 17-20分 |
| **选题价值** | 15分 | 网络专业学生刚需；深圳网络产业链发达，就业相关度高 | 13-15分 |
| **界面体验** | 10分 | 统一设计语言；移动端适配；交互动画流畅 | 8-10分 |
| **总分** | 100分 | | **87-100分** |

### 扣分风险自查

| 风险项 | 是否涉及 | 应对措施 |
|--------|---------|---------|
| 套用官方模板 | ❌ 不涉及 | 完全自主设计 |
| 抄袭外部源码 | ❌ 不涉及 | 用OpenCode辅助生成，非直接搬运 |
| 功能不完整 | ❌ 不涉及 | 4项功能均完整可操作 |
| 未使用AI能力 | ❌ 不涉及 | 3处AI调用，超额完成 |
| 提交材料缺失 | ⚠️ 需注意 | 提前准备清单，逐一核对 |

---

## 九、OpenCode使用技巧（针对本项目）

### 高效使用OpenCode开发本项目的技巧

#### 技巧1：用Plan模式规划复杂功能

```
# 在开发AI问答页前，先切换到Plan模式（按Tab键）
[Plan模式]
我想开发一个AI问答页面，需求如下：
1. 对话气泡布局（用户问题靠右，AI回答靠左）
2. 支持3个快速提问按钮
3. 对话历史持久化到localStorage
4. 调用js/ai.js中的callOpenCodeAI函数
5. 响应式布局，移动端友好

请帮我规划实现步骤，并按难度排序。
```

#### 技巧2：让OpenCode直接生成完整文件

```
[Build模式]
请按照以下规划，直接生成ai-chat.html的完整代码，
包括HTML结构、内联CSS、以及script标签中的JavaScript逻辑。
不要省略任何部分，确保生成后可以直接在浏览器中打开运行。
```

#### 技巧3：用 `/review` 命令审查代码质量

```
# 完成一个页面后，在OpenCode中输入
/review
请审查notes-list.html中的JavaScript代码，
重点检查：1. 是否有内存泄漏 2. 搜索性能是否可接受 3. 边界情况处理是否完善
```

#### 技巧4：用 `/web` 命令查询命令资料

```
# 在生成data-commands.js时，先查询最新命令资料
/web Windows netsh命令详解
/web 华为交换机VLAN配置命令2024
```

#### 技巧5：调试AI调用功能

```
# 如果AI调用有问题，把代码贴给OpenCode
我的js/ai.js中的callOpenCodeAI函数调用失败，
错误是：[粘贴错误信息]
相关代码：[粘贴代码]
请帮我找出问题并修复，给出完整修正后的函数代码。
```

---

## 十、项目文件完整清单

```
network-assistant/
├── index.html                  # 首页 ⭐入口页面
├── notes-list.html             # 笔记列表页
├── note-edit.html              # 笔记编辑/详情页
├── faults-list.html            # 故障列表页
├── fault-detail.html           # 故障详情页
├── commands-list.html          # 命令列表页
├── command-detail.html         # 命令详情页
├── ai-chat.html                # AI问答页 ⭐AI能力展示核心页面
├── css/
│   └── style.css               # 全局样式（约300行）
├── js/
│   ├── app.js                  # 通用工具函数（页面跳转、loading、通知）
│   ├── data-notes.js           # 笔记数据（10条）
│   ├── data-faults.js          # 故障数据（15条）
│   ├── data-commands.js        # 命令数据（20条）
│   ├── ai.js                   # ⭐AI调用封装（3个AI功能）
│   ├── notes.js                # 笔记模块逻辑
│   ├── faults.js               # 故障模块逻辑
│   └── commands.js             # 命令模块逻辑
├── AGENTS.md                   # OpenCode项目说明
└── README.md                   # 项目说明（给用户看）
```

---

## 十一、风险预案

| 风险 | 概率 | 应对方案 |
|------|------|---------|
| OpenCode AI接口调用不成功 | 中 | js/ai.js中已内置模拟回复，演示时可用模拟数据展示AI功能流程 |
| 时间来不及完成所有功能 | 低 | 优先保证：①笔记列表 ②故障详情 ③AI问答页；其他可精简 |
| 页面样式不理想 | 低 | 用OpenCode生成CSS，或参考Bootstrap等成熟框架的样式 |
| 数据量不够 | 低 | 用OpenCode批量生成，10分钟内可完成 |
| localStorage兼容性 | 低 | 所有现代浏览器均支持，无需担心 |

---

## 十二、Demo演示脚本（供比赛答辩使用）

> 提前准备一段30秒-1分钟的产品演示流程

```
[打开index.html]
"这是网工智能助手的首页，集成了四大功能模块。"

[点击"我的笔记"]
"这是笔记管理模块，我预置了10条网络技术学习笔记，
支持搜索、标签筛选、新增编辑，还可以用AI智能推荐标签。"

[点击一条笔记，再点击"AI推荐标签"]
"点击AI推荐标签，AI会分析笔记内容，自动推荐相关标签，
这是我调用OpenCode AI能力的第一处展示。"

[返回首页，点击"故障手册"]
"这是故障手册模块，包含15个常见网络故障的排查指南，
我以'电脑获取不到IP地址'为例，可以看到详细的排查步骤，
还可以看到推荐的相关笔记和相关命令。"

[点击"AI智能分析"]
"点击AI分析，输入补充现象，AI会给出进一步的排查建议，
这是我调用AI能力的第二处展示。"

[返回首页，点击"AI智能问答"]
"这是AI问答模块，我可以输入任何网络相关问题，
比如'如何配置OSPF'，AI会给出配置命令和详细说明，
这是我调用AI能力的第三处展示。"

[总结]
"本作品整合了笔记管理、故障排查、命令参考、AI问答四大功能，
调用了3处OpenCode AI能力，完全使用OpenCode开发，
适合网络技术专业学生学习使用和实习参考。"
```

---

> 📌 **下一步行动**：
> 1. 在OpenCode中执行 `/init` 初始化项目
> 2. 按照Day 1计划，先生成3个数据文件
> 3. 遇到任何问题，直接在OpenCode中询问，或用 `/web` 联网搜索
> 4. 每完成一个页面，用 `/review` 审查代码质量
