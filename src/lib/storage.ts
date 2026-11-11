import fs from 'fs';
import path from 'path';
import { AppStore } from '@/types';
import { initialStore } from '@/lib/data';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// In-memory cache for fast reads
let memoryStore: AppStore | null = null;

function ensureDataFile(): AppStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_FILE)) {
      fs.writeFileSync(STORE_FILE, JSON.stringify(initialStore, null, 2), 'utf-8');
      memoryStore = initialStore;
      return initialStore;
    }
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    memoryStore = { ...initialStore, ...parsed };
    return memoryStore!;
  } catch (err) {
    console.error('Error reading store file, falling back to initial data:', err);
    memoryStore = initialStore;
    return initialStore;
  }
}

export function getStore(): AppStore {
  if (memoryStore) {
    return memoryStore;
  }
  return ensureDataFile();
}

export function saveStore(store: AppStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    memoryStore = store;
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting store file:', err);
  }
}

export function updateStore<K extends keyof AppStore>(
  key: K,
  value: AppStore[K],
  auditUser: string = 'Admin User',
  auditDetails: string = `Updated ${String(key)}`
): AppStore {
  const current = getStore();
  const newLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    user: auditUser,
    action: `UPDATE_${String(key).toUpperCase()}`,
    entityType: String(key),
    entityId: `${String(key)}-${Date.now()}`,
    details: auditDetails,
  };

  const updated: AppStore = {
    ...current,
    [key]: value,
    auditLogs: [newLog, ...(current.auditLogs || [])].slice(0, 100),
  };

  saveStore(updated);
  return updated;
}

