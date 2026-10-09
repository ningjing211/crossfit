import { Injectable } from '@angular/core';
import type { Session } from '@app/contracts';
import { sessions } from './catalog';

@Injectable()
export class SessionRepository {
  async list(): Promise<Session[]> {
    return sessions
      .map((session) => structuredClone(session))
      .sort((a, b) => b.trainedOn.localeCompare(a.trainedOn));
  }

  async get(id: string): Promise<Session | null> {
    const session = sessions.find((entry) => entry.id === id);
    return session ? structuredClone(session) : null;
  }
}
