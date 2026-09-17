// Real-time Cross-Tab and Cross-Window Synchronization Helper

export const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('hadescore_data_channel')
  : null;

export function notifyDataChange(type: string = 'data_updated') {
  try {
    if (syncChannel) {
      syncChannel.postMessage({ type, timestamp: Date.now() });
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hadescore_data_updated', { detail: { type } }));
    }
  } catch {}
}

export function subscribeToDataChanges(callback: () => void): () => void {
  const handleEvent = () => {
    callback();
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key && (e.key.includes('leads') || e.key.includes('students') || e.key.includes('quiz'))) {
      callback();
    }
  };

  if (syncChannel) {
    syncChannel.addEventListener('message', handleEvent);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('hadescore_data_updated', handleEvent);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleEvent);
  }

  return () => {
    if (syncChannel) {
      syncChannel.removeEventListener('message', handleEvent);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('hadescore_data_updated', handleEvent);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleEvent);
    }
  };
}
