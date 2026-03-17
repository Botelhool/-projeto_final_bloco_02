import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaService } from "./services/categoria.service";
import { CategoriaController } from "./controllers/categoria.controller";
import { Categoria } from "./entities/categoria.entity";


@Module
({
    imports:[TypeOrmModule.forFeature([Categoria])],
    exports:[CategoriaService],
    controllers:[CategoriaController],
    providers:[CategoriaService],
})
export class CategoriaModule{}