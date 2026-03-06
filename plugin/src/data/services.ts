// ── Types ─────────────────────────────────────────────────────────────────────

export interface SecurityGroupRule {
  id: string;
  direction: 'Inbound' | 'Outbound';
  protocol: string;
  portRange: string;
  source: string;
  description: string;
}

export interface SecurityGroup {
  id: string;
  name: string;
  managedBy: string;
  hasUpdates?: boolean;
  rules: SecurityGroupRule[];
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

export const ACCOUNTS = [
  'cfg-edo-dev',
  'cfg-edo-staging',
  'cfg-edo-prod',
  'cfg-paas-dev',
  'cfg-paas-prod',
  'cfg-shared-services',
];

export const REGIONS = [
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'eu-west-1',
  'eu-west-2',
  'eu-central-1',
  'ap-southeast-1',
  'ap-southeast-2',
];

export const SECURITY_GROUPS: SecurityGroup[] = [
  {
    id: 'sg-001',
    name: 'cfg-edo-dev-us-east-1-vpc-paas-rhos-edo-ocp-sg',
    managedBy: 'Terraform',
    hasUpdates: true,
    rules: [
      {
        id: 'r-001',
        direction: 'Inbound',
        protocol: 'TCP',
        portRange: '443',
        source: '10.0.0.0/8',
        description: 'Allow HTTPS from internal VPC',
      },
      {
        id: 'r-002',
        direction: 'Inbound',
        protocol: 'TCP',
        portRange: '8080-8090',
        source: 'sg-0abc12345',
        description: 'Allow app traffic from web tier SG',
      },
      {
        id: 'r-003',
        direction: 'Outbound',
        protocol: 'All',
        portRange: 'All',
        source: '0.0.0.0/0',
        description: 'Allow all outbound',
      },
    ],
  },
  {
    id: 'sg-002',
    name: 'cfg-edo-dev-us-east-1-vpc-paas-rhos-edo-db-sg',
    managedBy: 'Terraform',
    hasUpdates: false,
    rules: [
      {
        id: 'r-004',
        direction: 'Inbound',
        protocol: 'TCP',
        portRange: '5432',
        source: 'sg-0abc12345',
        description: 'PostgreSQL from app tier',
      },
      {
        id: 'r-005',
        direction: 'Inbound',
        protocol: 'TCP',
        portRange: '3306',
        source: '10.100.0.0/16',
        description: 'MySQL from data subnet',
      },
    ],
  },
  {
    id: 'sg-003',
    name: 'cfg-edo-dev-us-east-1-vpc-paas-rhos-edo-alb-sg',
    managedBy: 'Terraform',
    hasUpdates: true,
    rules: [
      {
        id: 'r-006',
        direction: 'Inbound',
        protocol: 'TCP',
        portRange: '80',
        source: '0.0.0.0/0',
        description: 'HTTP from internet',
      },
      {
        id: 'r-007',
        direction: 'Inbound',
        protocol: 'TCP',
        portRange: '443',
        source: '0.0.0.0/0',
        description: 'HTTPS from internet',
      },
    ],
  },
  {
    id: 'sg-004',
    name: 'cfg-edo-dev-us-east-1-vpc-paas-rhos-edo-mgmt-sg',
    managedBy: 'Terraform',
    hasUpdates: false,
    rules: [],
  },
  {
    id: 'sg-005',
    name: 'cfg-paas-dev-us-east-1-vpc-openshift-control-plane-sg',
    managedBy: 'Terraform',
    hasUpdates: false,
    rules: [
      {
        id: 'r-008',
        direction: 'Inbound',
        protocol: 'TCP',
        portRange: '6443',
        source: '10.0.0.0/8',
        description: 'Kubernetes API server',
      },
      {
        id: 'r-009',
        direction: 'Inbound',
        protocol: 'TCP',
        portRange: '2379-2380',
        source: '10.0.0.0/8',
        description: 'etcd server/client API',
      },
    ],
  },
];
