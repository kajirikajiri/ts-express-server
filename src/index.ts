import "reflect-metadata";
import * as express from "express";
import { Scrap } from "./entity/Scrap";
import { Thread } from "./entity/Thread";
import { UserScrapRelation } from "./entity/UserScrapRelation";
import { ScrapThreadRelation } from "./entity/ScrapThreadRelation";
import { createConnection } from "typeorm";

createConnection()
  .then(async (connection) => {
    const app: express.Express = express();
    app.use((_, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "POST");
      next();
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Constants
    const PORT = 3000;
    const HOST = "0.0.0.0";

    // App
    app.get("/", (_, res) => {
      res.send("!");
    });

    app.get("/json", (_, res) => {
      res.send({ json: "json" });
    });

    app.post("/scrap", async (req, res) => {
      const { title, userId } = req.body as { title?: string; userId?: string };
      if (
        typeof title != "string" ||
        typeof userId != "string" ||
        title.length == 0 ||
        userId.length == 0
      ) {
        return res.status(400).send();
      }
      const scrap = new Scrap(title);
      const usr = new UserScrapRelation(userId, scrap);
      try {
        const { scrap: s } = await connection.manager.save(usr);
        return res.send({ scrapId: s.id });
      } catch (_) {
        return res.send({ message: "exception" });
      }
    });

    app.delete("/scrap", async (req, res) => {
      const { id } = req.body as { id?: string };
      if (typeof id != "string" || id.length == 0) {
        return res.status(400).send();
      }
      try {
        // cascade soft delete not working
        // https://github.com/typeorm/typeorm/issues/5877
        await connection
          .getRepository(UserScrapRelation)
          .createQueryBuilder("user_scrap_relation")
          .where("scrapId = :id", { id })
          .softDelete()
          .execute();
        await connection
          .getRepository(Scrap)
          .createQueryBuilder("scrap")
          .where("id = :id", { id })
          .softDelete()
          .execute();
        const threads = await connection
          .getRepository(ScrapThreadRelation)
          .createQueryBuilder("scrap_thread_relation")
          .select("threadId")
          .where("scrapId = :id", { id })
          .execute();
        await connection
          .getRepository(ScrapThreadRelation)
          .createQueryBuilder("scrap_thread_relation")
          .where("scrapId = :id", { id })
          .softDelete()
          .execute();
        const promises = threads.map((thread) => {
          return connection
            .getRepository(Thread)
            .createQueryBuilder("thread")
            .where("id = :id", { id: thread.threadId })
            .softDelete()
            .execute();
        });
        await Promise.all(promises);
        return res.send();
      } catch (_) {
        return res.send({ message: "exception" });
      }
    });

    app.post("/thread", async (req, res) => {
      const { text, scrapId } = req.body as { text?: string; scrapId?: string };
      if (
        typeof text != "string" ||
        typeof scrapId != "string" ||
        text.length == 0 ||
        scrapId.length == 0
      ) {
        return res.status(400).send();
      }
      const thread = new Thread(text);
      const str = new ScrapThreadRelation(thread, scrapId);
      try {
        const { thread: t } = await connection.manager.save(str);
        return res.send({ threadId: t.id });
      } catch (_) {
        return res.send({ message: "exception" });
      }
    });

    app.delete("/thread", async (req, res) => {
      const { id } = req.body as { id?: string };
      if (typeof id != "string" || id.length == 0) {
        return res.status(400).send();
      }
      try {
        // cascade soft delete not working
        // https://github.com/typeorm/typeorm/issues/5877
        await connection
          .getRepository(Thread)
          .createQueryBuilder("thread")
          .where("id = :id", { id })
          .softDelete()
          .execute();
        await connection
          .getRepository(ScrapThreadRelation)
          .createQueryBuilder("scrap_thread_relation")
          .where("threadId = :id", { id })
          .softDelete()
          .execute();
        return res.send();
      } catch (_) {
        return res.send({ message: "exception" });
      }
    });

    app.get("/health", (_, res) => {
      res.send("d(^_^)");
    });

    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
