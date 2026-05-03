// js/data-commands.js - 网络命令参考数据
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
    relatedNotes: [7, 8]
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
    name: "ipconfig / ifconfig",
    platform: "Windows / Linux",
    category: "网络配置查看",
    description: "查看本机网络配置信息",
    syntax: "ipconfig [选项]  // Windows\nifconfig [选项]  // Linux",
    examples: [
      "ipconfig /all  // 查看详细网络配置",
      "ipconfig /release  // 释放IP地址",
      "ipconfig /renew  // 重新获取IP地址"
    ],
    relatedNotes: [9]
  },
  {
    id: 4,
    name: "netstat",
    platform: "Windows/Linux",
    category: "连接查看",
    description: "显示网络连接、路由表、接口统计等信息",
    syntax: "netstat [选项]",
    examples: [
      "netstat -an  // 显示所有连接和监听端口",
      "netstat -r  // 显示路由表",
      "netstat -s  // 显示协议统计信息"
    ],
    relatedNotes: [8]
  },
  {
    id: 5,
    name: "nslookup / dig",
    platform: "Windows / Linux",
    category: "DNS查询",
    description: "查询DNS记录，诊断域名解析问题",
    syntax: "nslookup [域名] [DNS服务器]\ndig [域名] [@DNS服务器]",
    examples: [
      "nslookup www.baidu.com  // 查询百度IP",
      "nslookup www.baidu.com 8.8.8.8  // 使用Google DNS查询",
      "dig www.baidu.com  // Linux下查询"
    ],
    relatedNotes: [10]
  },
  {
    id: 6,
    name: "arp",
    platform: "Windows/Linux",
    category: "地址解析",
    description: "查看和操作ARP缓存表",
    syntax: "arp [选项]",
    examples: [
      "arp -a  // 显示ARP表",
      "arp -d  // 删除ARP缓存",
      "arp -s IP MAC  // 添加静态ARP条目"
    ],
    relatedNotes: [8]
  },
  {
    id: 7,
    name: "telnet",
    platform: "Windows/Linux",
    category: "端口测试",
    description: "测试远程主机端口是否开放",
    syntax: "telnet [主机] [端口]",
    examples: [
      "telnet 192.168.1.1 80  // 测试80端口",
      "telnet www.baidu.com 443  // 测试HTTPS端口"
    ],
    relatedNotes: [8]
  },
  {
    id: 8,
    name: "ssh",
    platform: "Linux",
    category: "远程连接",
    description: "安全远程登录到Linux服务器或网络设备",
    syntax: "ssh [选项] 用户名@主机",
    examples: [
      "ssh admin@192.168.1.1  // 登录交换机",
      "ssh -p 2222 root@server  // 指定端口连接"
    ],
    relatedNotes: [4]
  },
  {
    id: 9,
    name: "curl",
    platform: "Linux",
    category: "网络请求",
    description: "发送HTTP请求，测试Web服务",
    syntax: "curl [选项] URL",
    examples: [
      "curl http://www.baidu.com  // 获取网页内容",
      "curl -I http://www.baidu.com  // 只获取响应头",
      "curl -o page.html http://www.baidu.com  // 保存到文件"
    ],
    relatedNotes: [10]
  },
  {
    id: 10,
    name: "iptables",
    platform: "Linux",
    category: "防火墙配置",
    description: "Linux防火墙规则管理",
    syntax: "iptables [选项] [链] [规则]",
    examples: [
      "iptables -L  // 查看规则列表",
      "iptables -A INPUT -p tcp --dport 80 -j ACCEPT  // 放行80端口",
      "iptables -F  // 清空所有规则"
    ],
    relatedNotes: [4]
  },
  {
    id: 11,
    name: "systemctl",
    platform: "Linux",
    category: "服务管理",
    description: "管理系统服务的启动、停止、状态",
    syntax: "systemctl [命令] [服务名]",
    examples: [
      "systemctl status sshd  // 查看SSH服务状态",
      "systemctl restart nginx  // 重启Nginx",
      "systemctl enable httpd  // 设置开机启动"
    ],
    relatedNotes: [10]
  },
  {
    id: 12,
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
  {
    id: 13,
    name: "ip route-static（华为）",
    platform: "华为路由器",
    category: "路由配置",
    description: "配置静态路由",
    syntax: "ip route-static 目标网段 掩码 下一跳地址",
    examples: [
      "ip route-static 192.168.2.0 255.255.255.0 192.168.1.1  // 添加静态路由",
      "ip route-static 0.0.0.0 0.0.0.0 202.100.1.1  // 默认路由"
    ],
    relatedNotes: [2]
  },
  {
    id: 14,
    name: "ospf（华为）",
    platform: "华为路由器",
    category: "路由协议",
    description: "配置OSPF动态路由协议",
    syntax: "ospf [进程号]\narea [区域号]\nnetwork [网段] [反掩码]",
    examples: [
      "ospf 1 router-id 1.1.1.1\narea 0\nnetwork 192.168.1.0 0.0.0.255"
    ],
    relatedNotes: [3]
  },
  {
    id: 15,
    name: "acl（华为）",
    platform: "华为交换机/路由器",
    category: "安全配置",
    description: "配置访问控制列表",
    syntax: "acl [编号]\nrule [permit/deny] [条件]",
    examples: [
      "acl 2000\nrule deny source 192.168.1.0 0.0.0.255\nrule permit source any",
      "// 应用ACL到接口\ninterface GigabitEthernet 0/0/1\ntraffic-filter inbound acl 2000"
    ],
    relatedNotes: [4]
  },
  {
    id: 16,
    name: "nat（华为）",
    platform: "华为路由器",
    category: "NAT配置",
    description: "配置网络地址转换",
    syntax: "nat outbound [ACL编号]",
    examples: [
      "acl 2000\nrule permit source 192.168.1.0 0.0.0.255\ninterface GigabitEthernet 0/0/1\nnat outbound 2000"
    ],
    relatedNotes: [5]
  },
  {
    id: 17,
    name: "vlan（思科）",
    platform: "思科交换机",
    category: "VLAN配置",
    description: "思科交换机VLAN配置命令",
    syntax: "vlan [VLAN号]\nname [VLAN名称]\nswitchport mode access\nswitchport access vlan [VLAN号]",
    examples: [
      "vlan 10\nname Sales\ninterface FastEthernet 0/1\nswitchport mode access\nswitchport access vlan 10"
    ],
    relatedNotes: [1]
  },
  {
    id: 18,
    name: "ip route（思科）",
    platform: "思科路由器",
    category: "路由配置",
    description: "思科路由器静态路由配置",
    syntax: "ip route [目标网段] [掩码] [下一跳或出接口]",
    examples: [
      "ip route 192.168.2.0 255.255.255.0 192.168.1.1\nip route 0.0.0.0 0.0.0.0 202.100.1.1"
    ],
    relatedNotes: [2]
  },
  {
    id: 19,
    name: "router ospf（思科）",
    platform: "思科路由器",
    category: "路由协议",
    description: "思科路由器OSPF配置",
    syntax: "router ospf [进程号]\nnetwork [网段] [反掩码] area [区域号]",
    examples: [
      "router ospf 1\nnetwork 192.168.1.0 0.0.0.255 area 0\nnetwork 10.0.0.0 0.0.0.3 area 0"
    ],
    relatedNotes: [3]
  },
  {
    id: 20,
    name: "show commands（思科）",
    platform: "思科设备",
    category: "查看命令",
    description: "思科设备常用查看命令",
    syntax: "show [参数]",
    examples: [
      "show ip route  // 查看路由表",
      "show vlan brief  // 查看VLAN摘要",
      "show interfaces  // 查看接口状态",
      "show running-config  // 查看当前配置"
    ],
    relatedNotes: [6, 8]
  }
];
