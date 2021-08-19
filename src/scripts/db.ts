// https://qiita.com/KZ-taran/items/afa3ebd5cfa4b046d8c9#connection
import { Connection, createConnection, getConnection } from "typeorm";

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      const connection = await createConnection();

      return connection;
    })();
  }

  return connectionReadyPromise;
};
