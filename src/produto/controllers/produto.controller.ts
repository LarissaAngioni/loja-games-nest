import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/produtos")
export class ProdutoController{

    constructor(private readonly produtoService: ProdutoService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }

    @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    findByNome(@Param("nome") nome: string): Promise<Produto[]>{
        return this.produtoService.findByNome(nome);
    }

    @Get("/preco_acima/:valor")
    @HttpCode(HttpStatus.OK)
    maiorQue(@Param("valor") valor: number): Promise<Produto[]>{
        return this.produtoService.maiorQue(valor)
    }

    @Get("/preco_abaixo/:valor")
    @HttpCode(HttpStatus.OK)
    menorQue(@Param("valor") valor: number): Promise<Produto[]>{
        return this.produtoService.menorQue(valor)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id") id: number){
        return this.produtoService.delete(id);
    }
}
