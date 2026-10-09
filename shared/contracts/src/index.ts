export const COLLECTIONS = {
  movements: 'movements',
  sessions: 'sessions',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export function movementImagePath(movementId: string): string {
  return `movements/${movementId}/image`;
}

export function movementVideoPath(movementId: string): string {
  return `movements/${movementId}/video`;
}

export interface Movement {
  id: string;
  name: string;
  imagePath: string | null;
  videoPath: string | null;
  cues: string;
  execution: string;
}

export interface SessionItem {
  id: string;
  movementId: string | null;
  name: string;
  sets: string;
  frequencyAndTime: string;
  tempo: string;
  note: string;
}

export interface SessionBlock {
  id: string;
  title: string;
  scheme: string;
  items: SessionItem[];
}

export interface Session {
  id: string;
  title: string;
  trainedOn: string;
  location: string;
  equipment: string;
  weather: string;
  athleteNote: string;
  coachNote: string;
  blocks: SessionBlock[];
}

export type SessionProgram = Pick<Session, 'title' | 'trainedOn' | 'blocks'> & {
  id: string | null;
};

export type SessionDiary = Pick<
  Session,
  'athleteNote' | 'coachNote' | 'location' | 'equipment' | 'weather'
>;

export const VALIDATION = {
  movementName: '請填動作名稱',
  trainedOn: '請填上課日',
  blockTitle: '請填區塊標題',
  itemName: '請填動作名稱',
} as const;

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function newId(): string {
  return crypto.randomUUID();
}

export function movementNameError(name: string): string | null {
  return name.trim() ? null : VALIDATION.movementName;
}

export function isTrainedOn(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return false;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

export function sessionProgramError(
  program: Pick<SessionProgram, 'trainedOn' | 'blocks'>,
): string | null {
  if (!isTrainedOn(program.trainedOn)) {
    return VALIDATION.trainedOn;
  }
  for (const block of program.blocks) {
    if (!block.title.trim()) {
      return VALIDATION.blockTitle;
    }
    for (const item of block.items) {
      if (!item.name.trim()) {
        return VALIDATION.itemName;
      }
    }
  }
  return null;
}
