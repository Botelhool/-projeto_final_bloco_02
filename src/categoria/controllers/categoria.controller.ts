import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";

@Controller('categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    @Get('/:id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);

    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }


    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByDescricao(@Param('nome') nome: string): Promise<Categoria[]> {
        return this.categoriaService.findByDescricao(nome);
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria);



    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body()categoria: Categoria): Promise<Categoria> {
        return await this.categoriaService.update(categoria);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id',ParseIntPipe)id: number): Promise<DeleteResult> {
        return this.categoriaService.delete(id);
    }

}