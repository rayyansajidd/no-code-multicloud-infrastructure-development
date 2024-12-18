import { Cloud, Database, FunctionSquare, Server } from 'lucide-react';

// Define each cloud service category with its items
export const Compute = {
  category: 'Compute',
  items: [
    {
      id: 'lambda',
      name: 'Lambda Function',
      icon: FunctionSquare,
    },
    {
      id: 'ec2',
      name: 'EC2 Instance',
      icon: Server,
    },
  ],
};

export const Storage = {
  category: 'Storage',
  items: [
    {
      id: 's3',
      name: 'S3 Bucket',
      icon: Database,
    },
    {
      id: 'dynamodb',
      name: 'DynamoDB',
      icon: Database,
    },
  ],
};

export const Network = {
  category: 'Network',
  items: [
    {
      id: 'vpc',
      name: 'VPC',
      icon: Cloud,
    },
    {
      id: 'subnet',
      name: 'Subnet',
      icon: Cloud,
    },
  ],
};

// You can export all the services if needed
export const cloudServices = [Compute, Storage, Network];
