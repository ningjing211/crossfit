import { Injectable } from '@angular/core';
import type { Movement } from '@app/contracts';
import { movements } from './catalog';

@Injectable()
export class MovementRepository {
  async list(): Promise<Movement[]> {
    return movements.map((movement) => structuredClone(movement)).sort((a, b) => a.name.localeCompare(b.name));
  }

  async get(id: string): Promise<Movement | null> {
    const movement = movements.find((entry) => entry.id === id);
    return movement ? structuredClone(movement) : null;
  }

  async mediaUrl(path: string | null): Promise<string | null> {
    return path;
  }
}
