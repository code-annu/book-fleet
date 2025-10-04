import { SupabaseClient } from "@supabase/supabase-js";

export class BaseRepository<T, V> {
  constructor(
    protected readonly table: string,
    protected readonly db: SupabaseClient
  ) {}

  protected async insert(data: V): Promise<T> {
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
    updates: Partial<Omit<V, "id">>
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
