import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    entities: [],
    database: 'db_lojagames',
    synchronize: true,
    autoLoadEntities: true,//Carrega todas as entidades automaticamente, 
    // sem precisar importar cada uma no forRoot
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }