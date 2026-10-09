import { describe, expect, it } from 'vitest';
import { movements, sessions } from '../../shared/frontend/data-access/src/catalog';

const october7 = sessions[0];

describe('October 7 session', () => {
  it('keeps warm-up, movement prep, and the timed piece on one class', () => {
    expect(october7?.blocks.map((block) => block.title)).toEqual([
      'Warm-Up 暖身',
      'Movement Prep 主要訓練',
      'EMOM10 循環頻率',
    ]);
  });

  it('keeps laterality and the rest instruction without extra fields', () => {
    const warmup = october7?.blocks[0];
    const row = warmup?.items[2];
    const emom = october7?.blocks[2];
    expect(warmup?.scheme).toBe('每一項在 1 分鐘內做完，剩下的時間休息。');
    expect(warmup?.items.map((item) => item.frequencyAndTime)).toEqual([
      '40 秒，休息 20 秒',
      '40 秒，休息 20 秒',
      '40 秒，休息 20 秒',
      '40 秒，休息 20 秒',
    ]);
    expect(row?.note).toBe('5/5');
    expect(movements.find((movement) => movement.id === 'shoulder-taps')?.cues).toContain(
      '單手碰對側肩膀',
    );
    expect(movements.find((movement) => movement.id === 'single-arm-row')?.cues).toContain(
      '手肘沿身體側邊向後拉',
    );
    expect(emom?.scheme).toContain('Rest remaining of the minute');
    expect(emom?.items[0]?.sets).toBe('Sets 1-5');
    expect(emom?.items[1]?.note).toBe('3/3');
  });
});
