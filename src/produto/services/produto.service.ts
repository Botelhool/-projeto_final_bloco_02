import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm";
import { Produto } from "../entities/produto.entity";



@Injectable()
export class ProdutoService {

    constructor(@InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,) { }




    async findById(id: number): Promise<Produto> {
        const resultado = await this.produtoRepository.findOne({ where: { id } });

        if (resultado === null)
            throw new HttpException('Produto não encontrado!', HttpStatus.BAD_REQUEST);

        return resultado;
    }

    findAll(): Promise<Produto[]> {
        return this.produtoRepository.find({});
    }

    

    async findByDescricao(descricao: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${descricao}%`)
            }
        });
    }


    async create(produto: Produto): Promise<Produto> {
        const buscaProduto = await this.produtoRepository.findOne({
            where:
                { nome: produto.nome }
        });

        if (buscaProduto)
            throw new HttpException('Produto já existe!', HttpStatus.BAD_REQUEST);


        return this.produtoRepository.save(produto);
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



