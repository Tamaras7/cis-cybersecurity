const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors({
  origin: [
    "http://cis-cybersecurity.local:3000",
    "https://cis-cybersecurity-1.onrender.com"
  ]
}));


// Example endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello, your backend is working!" });
});

// ---------------- Existing Topics ----------------
const topics = {
  firewall: {
    title: "Firewalls",
    description: "Firewalls monitor and control incoming and outgoing network traffic based on security rules.",
    keyPoints: [
      "Packet filtering",
      "Stateful inspection",
      "Next-generation firewall features"
    ],
    vendors: ["Cisco", "Fortinet", "Palo Alto"],
    businessValue: "Protects networks from unauthorized access and threats.",
    technicalValue: "Provides traffic filtering and intrusion prevention."
  },
  encryption: {
    title: "Encryption",
    description: "Encryption secures data by converting it into unreadable format, only accessible with a key.",
    keyPoints: [
      "AES symmetric encryption",
      "RSA public-key encryption",
      "TLS for secure communication"
    ],
    vendors: ["OpenSSL", "Microsoft", "Cisco"],
    businessValue: "Ensures confidentiality of sensitive data.",
    technicalValue: "Mathematical algorithms for secure encoding."
  },
  siem: {
    title: "SIEM",
    description: "Security Information and Event Management collects and analyzes log data for threat detection.",
    keyPoints: [
      "Centralized log management",
      "Real-time alerting",
      "Integration with SOAR"
    ],
    vendors: ["Splunk", "IBM QRadar", "Elastic"],
    businessValue: "Improves incident response and compliance.",
    technicalValue: "Correlates events across systems."
  },
  edr: {
    title: "Endpoint Detection & Response",
    description: "EDR solutions detect and respond to advanced threats on endpoints.",
    keyPoints: [
      "Behavioral analysis",
      "Threat hunting",
      "Automated remediation"
    ],
    vendors: ["CrowdStrike", "SentinelOne", "Microsoft Defender"],
    businessValue: "Stops endpoint attacks quickly.",
    technicalValue: "Telemetry collection and AI-driven detection."
  },
  dlp: {
    title: "Data Loss Prevention",
    description: "DLP prevents sensitive data from leaving the organization.",
    keyPoints: [
      "Data classification",
      "Policy enforcement",
      "Encryption of sensitive files"
    ],
    vendors: ["Broadcom Symantec", "Forcepoint", "Microsoft Purview"],
    businessValue: "Protects intellectual property and compliance.",
    technicalValue: "Scans data in motion, at rest, and in use."
  },
  iam: {
    title: "Identity & Access Management",
    description: "IAM ensures only authorized users access systems.",
    keyPoints: [
      "Single Sign-On (SSO)",
      "Multi-Factor Authentication (MFA)",
      "Role-based access control"
    ],
    vendors: ["Okta", "Microsoft Azure AD", "Ping Identity"],
    businessValue: "Reduces unauthorized access risk.",
    technicalValue: "Centralized identity management."
  },
  pam: {
    title: "Privileged Access Management",
    description: "PAM secures and monitors privileged accounts.",
    keyPoints: [
      "Credential vaulting",
      "Session recording",
      "Just-in-time access"
    ],
    vendors: ["Wallix", "CyberArk", "BeyondTrust"],
    businessValue: "Prevents insider threats.",
    technicalValue: "Audit trails and credential rotation."
  },
  proxy: {
    title: "Proxy Servers",
    description: "Proxies act as intermediaries between users and the internet.",
    keyPoints: [
      "Web filtering",
      "Traffic anonymization",
      "Caching for performance"
    ],
    vendors: ["Squid", "Blue Coat", "Zscaler"],
    businessValue: "Controls internet usage and improves security.",
    technicalValue: "Intercepts and filters traffic."
  },
  email: {
    title: "Email Security",
    description: "Email security protects against phishing, spam, and malware.",
    keyPoints: [
      "Spam filtering",
      "Attachment sandboxing",
      "Click-time URL protection"
    ],
    vendors: ["Proofpoint", "Mimecast", "Microsoft Defender"],
    businessValue: "Prevents phishing and business email compromise.",
    technicalValue: "Analyzes email content and links."
  },
  waf: {
    title: "Web Application Firewall",
    description: "WAF protects web apps from common attacks.",
    keyPoints: [
      "SQL injection prevention",
      "Cross-site scripting protection",
      "Bot mitigation"
    ],
    vendors: ["F5", "Imperva", "Cloudflare"],
    businessValue: "Keeps web apps secure.",
    technicalValue: "Filters HTTP traffic to applications."
  },
  code: {
    title: "Secure Coding",
    description: "Secure coding practices prevent vulnerabilities in software.",
    keyPoints: [
      "Input validation",
      "Secure authentication",
      "Error handling"
    ],
    vendors: ["OWASP guidelines", "Snyk", "Checkmarx"],
    businessValue: "Reduces risk of exploitable bugs.",
    technicalValue: "Coding standards and automated scanning."
  },
  loadbalancing: {
    title: "Load Balancing",
    description: "Distributes traffic across servers for performance and reliability.",
    keyPoints: [
      "Round-robin distribution",
      "Health checks",
      "SSL offloading"
    ],
    vendors: ["F5 BIG-IP", "HAProxy", "NGINX"],
    businessValue: "Improves uptime and scalability.",
    technicalValue: "Balances requests across multiple servers."
  },
  dns: {
    title: "DNS Security",
    description: "Protects DNS infrastructure from attacks.",
    keyPoints: [
      "DNS filtering",
      "DNSSEC validation",
      "Threat intelligence integration"
    ],
    vendors: ["Infoblox", "Cisco Umbrella", "Quad9"],
    businessValue: "Prevents DNS hijacking and phishing.",
    technicalValue: "Secures domain resolution process."
  },
  network: {
    title: "Network Security",
    description: "Protects the integrity and usability of network infrastructure.",
    keyPoints: [
      "Intrusion detection",
      "Segmentation",
      "Zero Trust networking"
    ],
    vendors: ["Cisco", "Fortinet", "Juniper"],
    businessValue: "Keeps enterprise networks safe.",
    technicalValue: "Monitors and controls traffic flows."
  },
  cloud: {
    title: "Cloud Security",
    description: "Secures cloud workloads and data.",
    keyPoints: [
      "CASB (Cloud Access Security Broker)",
      "Cloud workload protection",
      "Compliance monitoring"
    ],
    vendors: ["Palo Alto Prisma", "Microsoft Defender for Cloud", "Zscaler"],
    businessValue: "Enables safe cloud adoption.",
    technicalValue: "Visibility and control across SaaS/IaaS."
  },
  collaboration: {
    title: "Collaboration Security",
    description: "Secures tools like Teams, Slack, and Zoom.",
    keyPoints: [
      "Data leakage prevention",
      "Secure file sharing",
      "Identity integration"
    ],
    vendors: ["Microsoft Teams Security", "Slack Enterprise Grid", "Zoom Security"],
    businessValue: "Keeps collaboration safe.",
    technicalValue: "Protects chat, video, and shared files."
  },
  telco: {
    title: "Telecom Security",
    description: "Protects telecom infrastructure and services.",
    keyPoints: [
      "SS7 signaling security",
      "VoIP protection",
      "SIM swap prevention"
    ],
    vendors: ["Ericsson", "Nokia", "Huawei"],
    businessValue: "Secures telecom networks and subscribers.",
    technicalValue: "Protects signaling and voice/data traffic."
  }
};


// ---------------- CIS Summary Topics ----------------
const cisSummaryTopics = {
  opentext: {
    title: "OpenText",
    description: "Enterprise Content Management (ECM) and Digital Forensics.",
    keyPoints: [
      "Extended ECM for enterprise content lifecycle management",
      "EnCase Digital Forensics for investigations and eDiscovery",
      "Secure archiving and governance tools",
      "Integration APIs for connecting with ERP/CRM systems",
      "Strong compliance support (GDPR, HIPAA, SOX)"
    ],
    businessValue: "Reduces compliance risk, improves productivity, supports legal defensibility.",
    technicalValue: "Integration APIs, forensic agents, secure repositories."
  },
  broadcom: {
    title: "Broadcom Symantec",
    description: "Data Loss Prevention (DLP), Identity, and Endpoint Security.",
    keyPoints: [
      "Symantec DLP for preventing sensitive data leaks",
      "Symantec VIP for identity and access protection",
      "Endpoint Security with behavioral detection and AI",
      "Email security with sandboxing and click‑time URL protection",
      "Integration with Microsoft Purview for compliance"
    ],
    businessValue: "Protects brand reputation, reduces breach costs.",
    technicalValue: "Unified console, AI-driven detection, Microsoft Purview integration."
  },
  infoblox: {
    title: "Infoblox",
    description: "DDI (DNS, DHCP, IPAM) and DNS-layer security.",
    keyPoints: [
      "BloxOne DDI for DNS, DHCP, and IPAM management",
      "Threat Defense for DNS‑layer security and early attack prevention",
      "Cloud‑based DNS filtering for hybrid environments",
      "Automated IP address management with visibility across networks",
      "Integration with SIEM/SOAR platforms for incident response"
    ],
    businessValue: "Reduces downtime, improves trust, scales easily.",
    technicalValue: "DNS visibility, automated IP management, SIEM/SOAR integration."
  },
  paloalto: {
    title: "Palo Alto Networks",
    description: "Cloud security, secure access, advanced detection.",
    keyPoints: [
      "Prisma Access for secure remote connectivity",
      "Prisma Cloud for cloud workload protection",
      "Cortex XDR for advanced detection and response",
      "ML‑powered threat prevention across endpoints and networks",
      "API‑driven integration for DevSecOps pipelines"
    ],
    businessValue: "Simplifies cloud security, reduces tool cost.",
    technicalValue: "Global infra, API integration, ML-powered detection."
  },
  fortinet: {
    title: "Fortinet",
    description: "Network security and centralized management.",
    keyPoints: [
      "FortiGate NGFW with ASIC acceleration for high performance",
      "FortiAnalyzer for centralized log analysis",
      "FortiManager for policy orchestration and automation",
      "Security Fabric for unified visibility across endpoints, VPN, and ZTNA",
      "AI‑driven detection and automated response"
    ],
    businessValue: "Lower TCO, unified security fabric.",
    technicalValue: "Custom ASIC chips, scalable log management."
  },
  f5: {
    title: "F5",
    description: "Secures applications and APIs.",
    keyPoints: [
      "BIG‑IP AFM for advanced firewalling",
      "Advanced WAF for application security against OWASP Top 10 threats",
      "Distributed Cloud WAAP for API and bot protection",
      "SSL/TLS offloading and traffic visibility",
      "Programmable policies for granular app control"
    ],
    businessValue: "Protects customer apps, reduces fraud, ensures uptime.",
    technicalValue: "API security, traffic visibility, programmable policies."
  },
  cisco: {
    title: "Cisco",
    description: "Broad platform: firewalls, identity, zero trust, threat intelligence.",
    keyPoints: [
      "Secure Firewall with deep packet inspection",
      "Duo MFA for identity security",
      "Umbrella DNS‑layer protection for remote users",
      "Talos threat intelligence for global visibility",
      "SecureX platform for unified security orchestration"
    ],
    businessValue: "Unified platform, trusted brand.",
    technicalValue: "AI detection, deep integration with Cisco networking."
  },
  wallix: {
    title: "Wallix",
    description: "Privileged Access Management (PAM).",
    keyPoints: [
      "Bastion for privileged session management",
      "PAM4ALL for centralized privileged access control",
      "Trustelem for identity federation and SSO",
      "Credential vaulting and rotation for admin accounts",
      "Audit trails and compliance reporting for critical systems"
    ],
    businessValue: "Ensures compliance, reduces insider risk.",
    technicalValue: "Audit trails, OT-specific controls, API integration."
  }
};


// ---------------- CIS Advantage Topics ----------------
const cisAdvantageTopics = {
  fortinet: {
    title: "Fortinet Advantages",
    description: "Security Fabric integration across firewalls, endpoints, VPN, ZTNA.",
    keyPoints: [
      "Unified visibility across network, endpoint, and cloud",
      "Automated response workflows with FortiAnalyzer/FortiManager",
      "Zero Trust Network Access (ZTNA) built-in",
      "AI-driven detection with FortiGuard Labs",
      "Custom ASIC acceleration for high performance"
    ],
    businessValue: "Unified prevention, stronger visibility.",
    technicalValue: "Fabric telemetry, FortiOS integration."
  },
  opentext: {
    title: "OpenText Advantages",
    description: "Endpoint protection with flexible deployment.",
    keyPoints: [
      "Cloud, hybrid, and on-premises deployment options",
      "Strong ECM and governance integration",
      "Digital forensics with EnCase for investigations",
      "Cost-effective for mixed environments",
      "Compliance support for regulated industries"
    ],
    businessValue: "Cost efficiency, flexible deployment.",
    technicalValue: "Baseline protection, simpler analytics."
  },
  broadcom: {
    title: "Broadcom Advantages",
    description: "Symantec heritage in email/DLP security.",
    keyPoints: [
      "Clicktime URL protection against phishing",
      "Advanced sandboxing for email attachments",
      "Comprehensive DLP policies for sensitive data",
      "Integration with Microsoft Purview compliance",
      "Strong identity protection with Symantec VIP"
    ],
    businessValue: "Strong phishing defense, compliance support.",
    technicalValue: "Advanced email/DLP policies."
  },
  infoblox: {
    title: "Infoblox Advantages",
    description: "DNS security and IPAM.",
    keyPoints: [
      "Stops DNS attacks at the earliest stage",
      "Scalable hybrid network support",
      "Automated IP address management (IPAM)",
      "Threat intelligence integration with SIEM/SOAR",
      "Cloud-based DNS filtering for remote users"
    ],
    businessValue: "Early prevention, scalability.",
    technicalValue: "DNS visibility, IPAM automation."
  },
  paloalto: {
    title: "Palo Alto Advantages",
    description: "Cortex XDR with behavioral AI.",
    keyPoints: [
      "Cross-domain telemetry correlation",
      "Superior detection of advanced threats",
      "Reduced false positives with ML models",
      "Integration with Prisma Cloud and Access",
      "API-driven automation for DevSecOps"
    ],
    businessValue: "Better detection of complex attacks.",
    technicalValue: "Behavioral AI, correlation engine."
  },
  f5: {
    title: "F5 Advantages",
    description: "BIG-IP APM and Distributed Cloud security.",
    keyPoints: [
      "Granular access control for applications",
      "Advanced WAF against OWASP Top 10 threats",
      "Distributed Cloud WAAP for API and bot defense",
      "SSL/TLS offloading for performance",
      "Programmable traffic policies for flexibility"
    ],
    businessValue: "Granular control, app protection.",
    technicalValue: "Advanced app policies, distributed cloud."
  },
  cisco: {
    title: "Cisco Advantages",
    description: "Secure Endpoint + Secure Client with VPN.",
    keyPoints: [
      "AI-driven detection with Talos intelligence",
      "Unified agent for endpoint and VPN",
      "Umbrella DNS-layer protection for hybrid workforce",
      "Duo MFA for identity security",
      "SecureX orchestration for unified workflows"
    ],
    businessValue: "Unified remote access + endpoint protection.",
    technicalValue: "SecureX integration, ML detection."
  },
  wallix: {
    title: "Wallix Advantages",
    description: "Privileged Access Management + MFA.",
    keyPoints: [
      "Zero Trust enforcement for admin accounts",
      "Session recording and audit trails",
      "Credential vaulting and rotation",
      "PAM4ALL centralized privileged access",
      "Trustelem for SSO and identity federation"
    ],
    businessValue: "Strong admin account protection.",
    technicalValue: "Credential vault, PAM integration."
  }
};

// ---------------- Endpoints ----------------

// Catalog endpoint
app.get('/api', (req, res) => {
  res.json({ availableTopics: Object.keys(topics) });
});


// CIS Summary catalog
app.get('/api/cis-summary', (req, res) => {
  res.json({ availableTopics: Object.keys(cisSummaryTopics) });
});

// CIS Summary dynamic
app.get('/api/cis-summary/:topic', (req, res) => {
  const topic = req.params.topic;
  if (cisSummaryTopics[topic]) {
    res.json(cisSummaryTopics[topic]);
  } else {
    res.status(404).json({ error: "Summary topic not found" });
  }
});

// CIS Advantages catalog
app.get('/api/cis-advantages', (req, res) => {
  res.json({ availableTopics: Object.keys(cisAdvantageTopics) });
});

// CIS Advantages dynamic
app.get('/api/cis-advantages/:topic', (req, res) => {
  const topic = req.params.topic;
  if (cisAdvantageTopics[topic]) {
    res.json(cisAdvantageTopics[topic]);
  } else {
    res.status(404).json({ error: "Advantage topic not found" });
  }
});


// Generic topic endpoint (must come last!)
app.get('/api/:topic', (req, res) => {
  const topic = req.params.topic;
  if (topics[topic]) {
    res.json(topics[topic]);
  } else {
    res.status(404).json({ error: "Topic not found" });
  }
});
// ---------------- Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
