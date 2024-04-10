export interface GenericRepository<T> {
    findby(field: any): Promise<T>
}