import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { CategoriaService } from "../../categoria/services/categoria.service";



@Injectable()
export class ProdutoService {

    constructor(@InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private readonly categoriaService: CategoriaService) { }




    async findById(id: number): Promise<Produto> {
        const resultado = await this.produtoRepository.findOne({ where: { id } });

        if (resultado === null)
            throw new HttpException('Produto não encontrado!', HttpStatus.BAD_REQUEST);

        return resultado;
    }

    findAll(): Promise<Produto[]> {
        return this.produtoRepository.find({relations:{categoria:true}});
    }



    async findByDescricao(descricao: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${descricao}%`)
            }
        });
    }


   async create(produto: Produto): Promise<Produto> {
    console.log("Dados recebidos no POST:", produto)
    const buscaProduto = await this.produtoRepository.findOne({
        where: { nome: produto.nome }
    });

    if (buscaProduto) {
        throw new HttpException('Produto já existe!', HttpStatus.BAD_REQUEST);
    }

   
    if (produto.categoria && produto.categoria.id) {
        const buscaCategoria = await this.categoriaService.findById(produto.categoria.id);

        if (!buscaCategoria) {
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        }

       
        return await this.produtoRepository.save(produto);
    }

    
    throw new HttpException('A categoria é obrigatória!', HttpStatus.BAD_REQUEST);
}





    async update(produto: Produto): Promise<Produto> {

        await this.findById(produto.id)
        return this.produtoRepository.save(produto);

    }


    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return this.produtoRepository.delete(id);
    }

}



