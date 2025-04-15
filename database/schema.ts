import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
    return SQLite.openDatabaseAsync('markers.db');
  };

export const initDatabase = async () => {
    try {
        const db = await openDatabase();

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS markers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );`);
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS marker_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            marker_id INTEGER NOT NULL,
            uri TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (marker_id) REFERENCES markers (id) ON DELETE CASCADE
            );`);
        return db;
    } catch (error) {
        console.error('Ошибка инициализации базы данных:', error);
        throw error;
    }
};
