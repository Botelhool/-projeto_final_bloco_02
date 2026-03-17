import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";


@Controller('produtos')
export class ProdutoController{
    constructor(private readonly produtoService:ProdutoService){}
    
    @Get('/:id')
    findById(@Param('id',ParseIntPipe)id:number):Promise<Produto>{
      return this.produtoService.findById(id);
    }

  
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

      @Get('/nome/:nome')
        @HttpCode(HttpStatus.OK)
        findByDescricao(@Param('nome') nome: string): Promise<Produto[]> {
            return this.produtoService.findByDescricao(nome);
        }
    




    @Post()
    @HttpCode(HttpStatus.CREATED)
   async create(@Body()produto:Produto):Promise<Produto>{
        return await this.produtoService.create(produto)
    }


    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()produto:Produto):Promise<Produto>{
        return this.produtoService.update(produto);

    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.produtoService.delete(id);
    }


}