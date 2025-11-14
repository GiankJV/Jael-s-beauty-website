import type {
  Hairstyle,
  HairGoal,
  HairLength,
  HairTexture,
  ColorHistory,
} from './hairstyles';

export type VisionAnswers = {
  goal?: HairGoal;
  length?: HairLength;
  texture?: HairTexture;
  colorHistory?: ColorHistory;
  maintenance?: 'low' | 'moderate' | 'high';
};

export type ScoredHairstyle = Hairstyle & { score: number };

export function scoreHairstyles(
  hairstyles: Hairstyle[],
  answers: VisionAnswers
): ScoredHairstyle[] {
  return hairstyles
    .map((style) => {
      let score = 0;

      if (answers.goal) {
        if (style.goals.includes(answers.goal)) score += 4;
      }

      if (answers.length) {
        if (style.lengths.includes(answers.length)) score += 2;
      }

      if (answers.texture) {
        if (style.textures.includes(answers.texture)) score += 2;
      }

      if (answers.colorHistory) {
        if (style.colorHistory.includes(answers.colorHistory)) score += 2;
      }

      if (answers.maintenance) {
        if (style.maintenance === answers.maintenance) score += 2;
        else if (style.maintenance === 'high' && answers.maintenance === 'low') score -= 2;
      }

      if (style.requiresConsult) score += 1;

      return { ...style, score };
    })
    .sort((a, b) => b.score - a.score);
}
