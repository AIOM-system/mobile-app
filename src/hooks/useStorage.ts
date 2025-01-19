import { Drivers, Storage } from "@ionic/storage";
import CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { useEffect, useState } from "react";

export const initStorage = async () => {
  try {
    const storage = new Storage({
      name: "aios_local_db",
      driverOrder: [
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    });
    await storage.defineDriver(CordovaSQLiteDriver);
    return await storage.create();
  } catch (error) {
    throw error;
  }
};

export const useStorage = () => {
  const [store, setStore] = useState<Storage | null>(null);

  useEffect(() => {
    (async () => {
      const store = await initStorage();
      setStore(store);
    })();
  }, []);

  return store;
};
