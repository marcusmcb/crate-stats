export function calculateTagHealth(filledTagCount: number, totalCount: number) {
  const safeTotal = totalCount <= 0 ? 0 : totalCount;
  const safeFilled = filledTagCount < 0 ? 0 : filledTagCount;

  if (safeTotal === 0) {
    return {
      percentage_with_tag: 0,
      empty_tag_count: 0,
    };
  }

  const percentage = (safeFilled / safeTotal) * 100;
  return {
    percentage_with_tag: Math.round(percentage * 100) / 100,
    empty_tag_count: safeTotal - safeFilled,
  };
}
