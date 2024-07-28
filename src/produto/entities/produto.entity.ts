import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name: "tb_produtos"})
export class Produto{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string;

    @Column({length: 255})
    foto: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    condicao: string;

    @IsNumber({maxDecimalPlaces: 2})
    @Column({ type: "decimal", precision: 10, scale: 2 })
    preco: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria;
}
