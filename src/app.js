/**
 * Count the sum of scores from an object
 * @param {Array} scores
 * @example - getScore({ Ann: 5, Joe: 10 }) // 15
 */
export const getScore = (scores) => {
  return Object.values(scores).reduce((sum, score) => sum + score, 0);
}