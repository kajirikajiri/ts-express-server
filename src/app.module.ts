import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection, getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapsModule } from './scraps/scraps.module';
import { ThreadsModule } from './threads/threads.module';
import { UserScrapRelationsModule } from './user-scrap-relations/user-scrap-relations.module';

const developmentOptions: TypeOrmModuleOptions = {
  // https://docs.nestjs.com/techniques/database#:~:text=ms)%20(default%3A%203000)-,autoLoadEntities,-If%20true%2C%20entities
  // If true, entities will be loaded automatically (default: false)
  autoLoadEntities: true,

  keepConnectionAlive: true,
};

const options = process.env.NODE_ENV == 'development' ? developmentOptions : {};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), options),
    }),
    GraphQLModule.forRoot({
      // https://docs.nestjs.com/graphql/subscriptions#:~:text=In%20addition%20to,on%20the%20server.
      // In addition to fetching data using queries and modifying data using mutations, the GraphQL spec supports a third operation type, called subscription. GraphQL subscriptions are a way to push data from the server to the clients that choose to listen to real time messages from the server. Subscriptions are similar to queries in that they specify a set of fields to be delivered to the client, but instead of immediately returning a single answer, a channel is opened and a result is sent to the client every time a particular event happens on the server.
      installSubscriptionHandlers: true,

      // https://docs.nestjs.com/graphql/quick-start#:~:text=To%20use%20the%20code%20first%20approach%2C%20start%20by%20adding%20the%20autoSchemaFile%20property%20to%20the%20options%20object%3A
      // To use the code first approach, start by adding the autoSchemaFile property to the options object:
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ScrapsModule,
    ThreadsModule,
    UserScrapRelationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
