// js/data-faults.js - 网络故障案例数据
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
    relatedNotes: [5, 8],
    relatedCommands: ["ipconfig", "ping"]
  },
  {
    id: 2,
    title: "网页打开慢但QQ能上",
    category: "应用类",
    tags: ["DNS", "网页慢", "应用故障"],
    symptom: "QQ等软件正常使用，但浏览器打开网页非常慢或打不开",
    cause: "可能原因：1.DNS服务器故障 2.浏览器代理设置错误 3.系统hosts文件被篡改 4.防火墙拦截",
    steps: [
      "执行 nslookup www.baidu.com 检查DNS解析",
      "更换DNS服务器为 8.8.8.8 或 114.114.114.114",
      "检查浏览器代理设置，取消勾选代理服务器",
      "执行 netsh winsock reset 重置网络",
      "检查hosts文件是否有异常记录"
    ],
    difficulty: "初级",
    relatedNotes: [10],
    relatedCommands: ["nslookup", "ping"]
  },
  {
    id: 3,
    title: "交换机端口指示灯不亮",
    category: "设备类",
    tags: ["交换机", "端口", "硬件故障"],
    symptom: "网线插入交换机端口后，端口指示灯不亮，设备无法通信",
    cause: "可能原因：1.网线损坏 2.交换机端口损坏 3.设备网卡故障 4.端口被管理员shutdown",
    steps: [
      "更换网线测试",
      "更换交换机端口测试",
      "登录交换机执行 display interface 查看端口状态",
      "检查端口是否被关闭：shutdown / undo shutdown",
      "检查网卡是否正常，更新驱动"
    ],
    difficulty: "中级",
    relatedNotes: [8],
    relatedCommands: ["display interface", "ping"]
  },
  {
    id: 4,
    title: "VLAN间无法通信",
    category: "配置类",
    tags: ["VLAN", "路由", "配置错误"],
    symptom: "同一交换机不同VLAN下的电脑无法互相ping通",
    cause: "可能原因：1.未配置VLANIF接口IP 2.未开启路由功能 3.端口类型配置错误 4.VLAN未正确划分",
    steps: [
      "检查VLAN是否正确创建：display vlan",
      "检查端口VLAN配置：display current-configuration interface",
      "配置VLANIF接口IP：interface vlanif 10, ip address 192.168.10.1 24",
      "确认不同VLAN在不同网段",
      "测试ping VLANIF接口地址"
    ],
    difficulty: "中级",
    relatedNotes: [1],
    relatedCommands: ["ping", "display vlan"]
  },
  {
    id: 5,
    title: "网络环路导致广播风暴",
    category: "性能类",
    tags: ["环路", "广播风暴", "STP"],
    symptom: "网络突然变慢，交换机所有端口指示灯狂闪，部分设备掉线",
    cause: "可能原因：1.网线两端接在同一交换机 2.冗余链路未启用STP 3.私接小交换机形成环路",
    steps: [
      "立即拔掉疑似环路的网线",
      "启用STP协议：stp enable, stp mode rstp",
      "检查交换机CPU利用率：display cpu",
      "逐个端口排查，找到异常流量端口",
      "配置环路检测：loopback-detection enable"
    ],
    difficulty: "高级",
    relatedNotes: [6],
    relatedCommands: ["display cpu", "display stp"]
  },
  {
    id: 6,
    title: "静态路由配置错误导致网络不通",
    category: "配置类",
    tags: ["静态路由", "路由配置", "网络不通"],
    symptom: "配置静态路由后，两个网段之间无法互相访问",
    cause: "可能原因：1.下一跳地址错误 2.目标网段或掩码写错 3.双向路由未配置 4.接口状态down",
    steps: [
      "检查路由表：display ip routing-table",
      "验证下一跳地址是否可达：ping 下一跳",
      "确认目标网段和掩码正确",
      "检查对端是否配置了回程路由",
      "检查相关接口状态：display interface brief"
    ],
    difficulty: "中级",
    relatedNotes: [2],
    relatedCommands: ["ping", "display ip routing-table"]
  },
  {
    id: 7,
    title: "WiFi信号弱经常断线",
    category: "连接类",
    tags: ["WiFi", "无线", "信号弱"],
    symptom: "WiFi连接后信号只有一两格，经常断开重连",
    cause: "可能原因：1.距离AP太远 2.障碍物过多 3.信道干扰严重 4.AP发射功率低",
    steps: [
      "靠近AP测试信号是否改善",
      "使用WiFi分析仪查看信道干扰情况",
      "修改AP信道为干扰较小的信道（1/6/11）",
      "调整AP位置和天线方向",
      "增加AP或部署信号放大器"
    ],
    difficulty: "初级",
    relatedNotes: [8],
    relatedCommands: ["ping", "ipconfig"]
  },
  {
    id: 8,
    title: "OSPF邻居关系无法建立",
    category: "配置类",
    tags: ["OSPF", "邻居", "路由协议"],
    symptom: "两台路由器配置OSPF后，邻居状态停留在Init或2-Way，无法达到Full",
    cause: "可能原因：1.Hello时间间隔不一致 2.区域ID不匹配 3.认证配置不一致 4.网络类型不匹配",
    steps: [
      "检查OSPF邻居状态：display ospf peer",
      "验证Hello和Dead时间间隔是否一致",
      "检查区域ID配置：display ospf",
      "检查认证密码是否一致",
      "查看OSPF日志：display ospf error"
    ],
    difficulty: "高级",
    relatedNotes: [3],
    relatedCommands: ["display ospf peer", "display ospf"]
  },
  {
    id: 9,
    title: "Ping测试丢包严重",
    category: "性能类",
    tags: ["丢包", "Ping", "网络性能"],
    symptom: "ping网关或外网时丢包率超过30%，网络时断时续",
    cause: "可能原因：1.网络拥塞 2.设备CPU过高 3.线路质量差 4.网线老化或水晶头接触不良",
    steps: [
      "持续ping -t观察丢包规律",
      "检查设备CPU和内存利用率",
      "分段测试：ping网关→ping外网，定位问题段",
      "检查网线质量，重新制作水晶头",
      "使用tracert追踪丢包节点"
    ],
    difficulty: "中级",
    relatedNotes: [7],
    relatedCommands: ["ping", "tracert"]
  },
  {
    id: 10,
    title: "ACL配置后所有流量被阻断",
    category: "配置类",
    tags: ["ACL", "访问控制", "配置错误"],
    symptom: "配置ACL后，发现所有流量都被拒绝，包括允许的流量",
    cause: "可能原因：1.ACL规则顺序错误 2.忘记配置permit规则 3.ACL应用方向错误 4.隐含deny all生效",
    steps: [
      "检查ACL规则顺序：display acl 2000",
      "确认有permit允许必要流量",
      "检查ACL应用方向：inbound还是outbound",
      "注意ACL默认最后有一条deny all",
      "调整规则顺序，精确规则放前面"
    ],
    difficulty: "高级",
    relatedNotes: [4],
    relatedCommands: ["display acl", "ping"]
  },
  {
    id: 11,
    title: "NAT配置后内网无法上网",
    category: "配置类",
    tags: ["NAT", "上网", "配置错误"],
    symptom: "配置NAT后，内网电脑仍然无法访问外网",
    cause: "可能原因：1.ACL未匹配内网地址 2.外网接口未配置NAT 3.默认路由缺失 4.运营商限制",
    steps: [
      "检查ACL是否正确匹配内网地址",
      "确认外网接口配置了nat outbound",
      "检查默认路由：ip route-static 0.0.0.0 0.0.0.0 下一跳",
      "在出口路由器抓包分析",
      "联系运营商确认是否限制NAT"
    ],
    difficulty: "高级",
    relatedNotes: [5],
    relatedCommands: ["display nat session", "ping"]
  },
  {
    id: 12,
    title: "网线线序错误导致不通",
    category: "连接类",
    tags: ["网线", "线序", "物理层"],
    symptom: "自制网线插入后端口不通，或速度只能达到100M而非1000M",
    cause: "可能原因：1.线序错误（T568A/B混用） 2.只接通4芯而非8芯 3.水晶头压接不良 4.线对绞距过大",
    steps: [
      "使用测线仪测试8芯是否全部导通",
      "确认两端都是T568B标准（橙白橙绿白蓝蓝白绿棕白棕）",
      "重新制作水晶头，确保线序正确",
      "千兆网线必须8芯全通",
      "使用合格网线测试仪验证"
    ],
    difficulty: "初级",
    relatedNotes: [8],
    relatedCommands: ["display interface brief"]
  },
  {
    id: 13,
    title: "服务器无法远程连接",
    category: "应用类",
    tags: ["服务器", "远程桌面", "连接失败"],
    symptom: "无法通过远程桌面连接服务器，提示连接超时",
    cause: "可能原因：1.服务器IP变更 2.防火墙拦截3389端口 3.远程桌面服务未启动 4.网络不通",
    steps: [
      "ping服务器IP确认网络连通",
      "telnet 服务器IP 3389 测试端口",
      "检查服务器防火墙是否放行3389",
      "确认Remote Desktop Services服务运行",
      "检查服务器IP是否变更，使用ARP确认"
    ],
    difficulty: "中级",
    relatedNotes: [4],
    relatedCommands: ["ping", "telnet", "netstat"]
  },
  {
    id: 14,
    title: "DHCP地址冲突频繁",
    category: "性能类",
    tags: ["DHCP", "IP冲突", "地址池"],
    symptom: "多台电脑频繁弹出IP地址冲突提示，网络不稳定",
    cause: "可能原因：1.DHCP地址池过小 2.存在静态IP与DHCP冲突 3.多个DHCP服务器 4.租期设置过长",
    steps: [
      "检查DHCP地址池范围和已分配地址",
      "排查是否有设备配置了静态IP占用DHCP地址",
      "检查网络中是否存在多个DHCP服务器",
      "适当缩短DHCP租期时间",
      "扩大DHCP地址池范围"
    ],
    difficulty: "中级",
    relatedNotes: [9],
    relatedCommands: ["ipconfig", "arp -a"]
  },
  {
    id: 15,
    title: "交换机CPU占用率过高",
    category: "设备类",
    tags: ["交换机", "CPU", "性能"],
    symptom: "交换机管理界面卡顿，配置命令响应慢，部分数据包转发异常",
    cause: "可能原因：1.广播风暴 2.路由震荡 3.大量ARP请求 4.设备硬件老化",
    steps: [
      "查看CPU占用率：display cpu",
      "检查端口流量：display interface brief",
      "排查是否有环路或广播风暴",
      "检查路由表是否频繁变化",
      "如硬件问题，联系厂商更换设备"
    ],
    difficulty: "高级",
    relatedNotes: [6],
    relatedCommands: ["display cpu", "display interface"]
  }
];
