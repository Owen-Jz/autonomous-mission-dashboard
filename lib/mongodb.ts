import { MongoClient, Db, Collection } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://new_owen_user:0lLdhFMmLK582IDp@cluster0.zvxia6f.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = process.env.MONGODB_DB || 'autonomous-mission-dashboard';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (db) {
    return { client: client!, db };
  }

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  
  console.log('Connected to MongoDB:', DB_NAME);
  return { client, db };
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase() first.');
  }
  return db;
}

export function getCollection(name: string): Collection {
  return getDatabase().collection(name);
}

// Collections
export const COLLECTIONS = {
  DEPARTMENTS: 'departments',
  WORKERS: 'workers',
  TASKS: 'tasks',
  AGENT_NOTES: 'agent_notes',
  TASK_LOGS: 'task_logs',
  SESSIONS: 'sessions',
  GENERATED_CONTENT: 'generated_content',
} as const;
