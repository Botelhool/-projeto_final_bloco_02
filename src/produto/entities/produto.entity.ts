import { Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, IsObject, IsOptional, IsUrl, Length, Min, MinDate } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ValueTransformer } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

// Definição do NumericTransformer
class NumericTransformer implements ValueTransformer {
    to(value: number): string {
        return value.toString();
    }
    from(value: string): number {
        return parseFloat(value);
    }
}

@Entity({ name: 'tb_produtos' })
export class Produto {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsOptional()
    id: number;

    @Column({ length: 60, nullable: false })
    @IsNotEmpty({ message: 'O nome do produto é obrigatório!' })
    @Length(4, 60, { message: 'O tamanho deve ter no mínimo 4 caracteres' })
    @Transform((param) => param.value.trim())
    nome: string;

    @Column('decimal', { precision: 6, nullable: false, scale: 2, transformer: new NumericTransformer() })
    @IsNotEmpty({ message: 'O preço do produto é obrigatório!' })
    @Min(0, { message: 'O preço não pode ser negativo' })
    @Type(() => Number)
    preco: number;

    @Column({ type: 'date', nullable: true })
    @Type(() => Date)
    @IsNotEmpty({ message: 'A data de validade do produto é obrigatória!' })
    @MinDate(new Date(), { message: 'A data não pode ser retroativa' })
    dataDeValidade: Date;

    @Column('int', { nullable: true, default: 0 })
    @Min(0, { message: 'A quantidade não pode ser negativa' })
    @Transform(({ value }) => parseInt(value, 10))

    quantidade: number;

    @Column('varchar', { length: 1000, nullable: true })
    @IsOptional()
    @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
    imgUrl: string;

    @IsDefined()
    @IsObject()
    @IsNotEmpty({ message: 'A categoria do produto é obrigatória!' })
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE'
    })

    categoria: Categoria;
}