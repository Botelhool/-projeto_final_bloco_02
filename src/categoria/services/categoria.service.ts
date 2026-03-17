import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {DeleteResult ,ILike,Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";



@Injectable()
export class CategoriaService{

    constructor(@InjectRepository(Categoria) 
    private categoriaRepository:Repository<Categoria>){}

    //CRUD
    async findById(id:number):Promise <Categoria> {
        const resultado = await this.categoriaRepository.findOne({where:{id}});
        
        if(resultado === null){
            throw new HttpException('Categoria não encontrada!',HttpStatus.NOT_FOUND)
        }

        return resultado;
    }
    
    findAll():Promise<Categoria[]>{
        return this.categoriaRepository.find({});
    }


   async findByDescricao(descricao:string):Promise<Categoria[]>{
        return await this.categoriaRepository.find({where:{
            nome:ILike(`%${descricao}%`)}});
    }



    create(categoria:Categoria):Promise<Categoria>{
       return this.categoriaRepository.save(categoria);
        
    }


   async upadate(categoria:Categoria):Promise<Categoria>{
       
    if (!categoria || !categoria.id) {
        throw new HttpException('Dados da categoria inválidos ou ID não informado!', HttpStatus.BAD_REQUEST);
    }
    
        await this.findById(categoria.id);
        return this.categoriaRepository.save(categoria);
    }


   async delete(id:number): Promise<DeleteResult>{
        await this.findById(id);
        return this.categoriaRepository.delete(id);
    }





}