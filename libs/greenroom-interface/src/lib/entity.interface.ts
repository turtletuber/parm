export interface Entity {
  _type: string;
}

export function is<T extends Entity>(entityType: string) {
  return <P extends Entity>(o: P): o is T & P => 
    o !== undefined && o !== null && o._type === entityType;
}