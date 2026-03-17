import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";


@Entity('tb_categorias')
export class Categoria{

    @PrimaryGeneratedColumn()
    @IsNumber()
    id:number;


    @Column({length:60,nullable:false})
    @Length(4,60,{message:'Nome da categoria deve ter entre 4 a 60 caracteres'})
    @IsNotEmpty({message:'Nome da categoria é obrigatório'})
    @Transform(param =>param.value.trim())
    nome:string;


    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];
    


}