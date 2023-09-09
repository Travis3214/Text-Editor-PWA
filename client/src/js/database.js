import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // This shows its database and version
  const jateDb = await openDB('jate', 1);
  // Specifies db and its privledges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Opens object store
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log('Successfully added content to database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting data from database');
  // This shows its database and version
  const jateDb = await openDB('jate', 1);
  // Specifies db and its privledges
  const tx = jateDb.transaction('jate', 'readonly');
   // Opens object store
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result.value);
  return result?.value
  
};

initdb();