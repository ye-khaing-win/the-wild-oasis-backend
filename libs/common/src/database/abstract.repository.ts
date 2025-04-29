import {
  FilterQuery,
  HydratedDocument,
  Model,
  PopulateOptions,
  UpdateQuery,
} from 'mongoose';
import { AbstractDocument } from './abstract-document';

export abstract class AbstractRepository<T extends AbstractDocument> {
  protected constructor(protected readonly model: Model<T>) {}

  async create(data: T): Promise<HydratedDocument<T>> {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async find(
    filter: FilterQuery<T>,
    populate?: PopulateOptions[],
  ): Promise<HydratedDocument<T>[]> {
    const query = this.model.find(filter);

    if (populate) {
      query.populate(populate);
    }

    return query.exec();
  }

  async findOne(
    filter: FilterQuery<T>,
    populate?: PopulateOptions[],
  ): Promise<HydratedDocument<T>> {
    const query = this.model.findOne(filter);

    if (populate) {
      query.populate(populate);
    }

    const doc = await query.exec();

    if (!doc) {
      return null;
    }

    return doc;
  }

  async updateOne(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
  ): Promise<HydratedDocument<T>> {
    const doc = await this.model.findOneAndUpdate(filter, data, {
      new: true,
    });

    if (!doc) {
      return null;
    }

    return doc;
  }

  async deleteOne(filter: FilterQuery<T>): Promise<HydratedDocument<T>> {
    const doc = await this.model.findOneAndUpdate(filter, {
      deletedAt: new Date(),
    });

    if (!doc) {
      return null;
    }

    return doc;
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const doc = await this.model.exists(filter);

    return Boolean(doc);
  }
}
