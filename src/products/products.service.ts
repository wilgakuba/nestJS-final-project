import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from './products.interface';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService){}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({ include: { publisher: true }})
  }

  public getById(id: Product['id']): Promise<Product | null>{
    return this.prismaService.product.findUnique({
      where: { id },
      include: { publisher: true },
    })
  }
}