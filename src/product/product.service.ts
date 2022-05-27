import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    return this.productRepository.save(createProductInput);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    return this.productRepository.findOne(id);
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    await this.productRepository.update(id, { ...updateProductInput });
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException({ id });
    }
    return product;
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
