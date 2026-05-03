// js/data-notes.js - 网络技术学习笔记数据
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
  {
    id: 3,
    title: "OSPF动态路由协议",
    content: "OSPF（开放最短路径优先）是基于链路状态的内部网关协议。配置步骤：1. 启动OSPF进程：ospf 1  2. 配置区域：area 0  3. 宣告网段：network 192.168.1.0 0.0.0.255",
    tags: ["OSPF", "路由协议", "华为命令"],
    createdAt: "2025-03-03",
    updatedAt: "2025-03-06",
    category: "路由技术"
  },
  {
    id: 4,
    title: "ACL访问控制列表",
    content: "ACL用于过滤数据包，分为基本ACL（2000-2999）和高级ACL（3000-3999）。配置：1. 创建ACL：acl 2000  2. 添加规则：rule deny source 192.168.1.0 0.0.0.255  3. 应用接口：traffic-filter inbound",
    tags: ["ACL", "安全", "华为命令"],
    createdAt: "2025-03-04",
    updatedAt: "2025-03-07",
    category: "安全技术"
  },
  {
    id: 5,
    title: "NAT网络地址转换",
    content: "NAT用于私网地址与公网地址转换。Easy IP适合动态公网IP场景。配置：1. ACL定义私网：acl 2000, rule permit source 192.168.1.0 0.0.0.255  2. 接口应用：nat outbound 2000",
    tags: ["NAT", "华为命令", "广域网"],
    createdAt: "2025-03-05",
    updatedAt: "2025-03-08",
    category: "广域网技术"
  },
  {
    id: 6,
    title: "STP生成树协议",
    content: "STP防止二层环路，通过选举根桥、根端口、指定端口来阻塞冗余链路。配置：1. 启用STP：stp enable  2. 设置模式：stp mode rstp  3. 设置优先级：stp priority 4096",
    tags: ["STP", "二层交换", "环路防护"],
    createdAt: "2025-03-06",
    updatedAt: "2025-03-09",
    category: "交换技术"
  },
  {
    id: 7,
    title: "子网划分计算",
    content: "子网划分用于合理分配IP地址。关键公式：子网数=2^n，主机数=2^(32-n)-2。例如/26子网有64个地址，可用主机62个。常用子网掩码：/24(255.255.255.0)、/25(255.255.255.128)、/26(255.255.255.192)",
    tags: ["子网划分", "IP地址", "计算"],
    createdAt: "2025-03-07",
    updatedAt: "2025-03-10",
    category: "网络基础"
  },
  {
    id: 8,
    title: "以太网基础知识",
    content: "以太网是最常见的局域网技术。标准演进：10Mbps→100Mbps→1000Mbps→10Gbps。双工模式：半双工（CSMA/CD）、全双工。网线类型：Cat5e(千兆)、Cat6(万兆)、光纤(长距离)",
    tags: ["以太网", "局域网", "物理层"],
    createdAt: "2025-03-08",
    updatedAt: "2025-03-11",
    category: "网络基础"
  },
  {
    id: 9,
    title: "DHCP动态主机配置协议",
    content: "DHCP自动分配IP地址，工作流程：Discover→Offer→Request→Ack。华为配置：1. 启用DHCP：dhcp enable  2. 配置全局地址池：ip pool vlan10, network 192.168.10.0 24, gateway-list 192.168.10.1  3. 接口应用：dhcp select global",
    tags: ["DHCP", "华为命令", "IP分配"],
    createdAt: "2025-03-09",
    updatedAt: "2025-03-12",
    category: "网络服务"
  },
  {
    id: 10,
    title: "DNS域名解析原理",
    content: "DNS将域名转换为IP地址。查询过程：本地缓存→DNS服务器→根域名→顶级域名→权威域名。常用记录：A记录(IPv4)、AAAA记录(IPv6)、CNAME(别名)、MX(邮件)。故障排查命令：nslookup、dig",
    tags: ["DNS", "域名解析", "应用层"],
    createdAt: "2025-03-10",
    updatedAt: "2025-03-13",
    category: "网络服务"
  }
];
