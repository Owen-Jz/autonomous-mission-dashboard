// Department types
export interface Department {
  id: string;
  title: string;
  botName: string;
  role: string;
  href: string;
  status: 'Running' | 'Completed' | 'Idle';
  workers: Worker[];
}

// Worker types
export type WorkerStatus = 'Idle' | 'Running' | 'Completed' | 'Error' | 'Failed';

export interface Worker {
  id: string;
  departmentId: string;
  name: string;
  description: string;
  status: WorkerStatus;
  order: number;
  promptTemplate?: string;
  logs?: string[];
  output?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Session types
export interface SessionWorker {
  workerId: string;
  name: string;
  status: WorkerStatus;
  output?: string;
  logs: string[];
}

export interface SessionOutputs {
  worker1?: {
    scrapedDesigns: string[];
    sources: string[];
  };
  worker2?: {
    patterns: {
      colors: string[];
      typography: string[];
      layouts: string[];
      styles: string[];
    };
  };
  worker3?: {
    sitemap: string;
    structure: string;
    files: string[];
    previewUrl?: string;
  };
  worker4?: {
    generatedPages: string[];
    previewUrl?: string;
  };
  worker5?: {
    issuesFound: string[];
    fixes: string[];
  };
  worker6?: {
    designSystem评估: string;
    features: string[];
  };
}

export interface Session {
  id: string;
  departmentId: string;
  status: 'running' | 'completed' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  workers: SessionWorker[];
  outputs: SessionOutputs;
  notes: string[];
  emailSent: boolean;
}

// Task types
export interface Task {
  id: string;
  workerId: string;
  departmentId: string;
  name: string;
  description: string;
  status: WorkerStatus;
  input?: string;
  output?: string;
  logs: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Agent Notes types
export interface AgentNote {
  id: string;
  title: string;
  content: string;
  agent: string;
  departmentId?: string;
  workerId?: string;
  sessionId?: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

// Generated Content types
export interface GeneratedContent {
  id: string;
  sessionId: string;
  departmentId: string;
  workerId: string;
  type: 'design' | 'sitemap' | 'page' | 'pattern';
  title: string;
  content: string;
  previewUrl?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}
