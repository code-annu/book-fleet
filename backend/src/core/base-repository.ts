import { supabaseClient } from "../config/db";

export class BaseRepository<T> {
  private db = supabaseClient;
  constructor(protected readonly table: string) {}

  protected async insert(data: T): Promise<T> {
    const result = await this.db.from(this.table).insert(data).select();
    // result.
    return data;
  }
}
