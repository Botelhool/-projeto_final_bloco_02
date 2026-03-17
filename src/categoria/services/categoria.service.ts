import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {DeleteResult ,ILike,Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";
import { Produto } from "../../produto/entities/produto.entity";



@Injectable()
export class CategoriaService{

    constructor(@InjectRepository(Categoria) 
    private categoriaRepository:Repository<Categoria>){}

    //CRUD
    async findById(id:number):Promise <Categoria> {
        const resultado = await this.categoriaRepository.findOne({
            where:{id},
            relations:{
                produto:true
            }
        });
        
        if(resultado === null){
            throw new HttpException('Categoria não encontrada!',HttpStatus.NOT_FOUND)
        }

        return resultado;
    }
    
    findAll():Promise<Categoria[]>{
        return this.categoriaRepository.find({relations:{produto:true}});
    }


   async findByDescricao(descricao:string):Promise<Categoria[]>{
        return await this.categoriaRepository.find({where:{
            nome:ILike(`%${descricao}%`)}});
    }



    create(categoria:Categoria):Promise<Categoria>{
       return this.categoriaRepository.save(categoria);
        
    }


   async update(categoria:Categoria):Promise<Categoria>{
    console.log(categoria);
    if (!categoria || !categoria.id) {
        throw new HttpException('Dados da categoria inválidos ou ID não informado!', HttpStatus.BAD_REQUEST);
    }

    const buscaCategoria = await this.findById(categoria.id);


    if (!buscaCategoria) {
        throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }
    
        
        return this.categoriaRepository.save(categoria);
    }


   async delete(id:number): Promise<DeleteResult>{
        await this.findById(id);
        return this.categoriaRepository.delete(id);
    }





}