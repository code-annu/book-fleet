import { supabaseClient } from "../config/db";

export class BaseRepository<T> {
  private db = supabaseClient;
  constructor(protected readonly table: string) {}

  protected async insert(data: T): Promise<T> {
    const result = await this.db
      .from(this.table)
      .insert(data)
      .select()
      .single();
    if (result.error) throw result.error;
    return result.data;
  }

  protected async getById(id: string | number): Promise<T | null> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  protected async updateById(
    id: string | number,
    updates: Partial<Omit<T, "id">>
  ): Promise<T> {
    const { data, error } = await this.db
      .from(this.table)
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data!;
  }

  protected async deleteById(id: string | number): Promise<T> {
    const { data, error } = await this.db
      .from(this.table)
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data!;
  }

  protected async listByIds(ids: Array<string | number>): Promise<T[]> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .in("id", ids);
    if (error) throw error;
    return data || [];
  }
}
