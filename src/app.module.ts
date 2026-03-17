import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    entities: [],
    database: 'db_farmacia',
    synchronize: true,
    autoLoadEntities: true,//Carrega todas as entidades automaticamente, 
    // sem precisar importar cada uma no forRoot
  }),
  ProdutoModule,
  CategoriaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }