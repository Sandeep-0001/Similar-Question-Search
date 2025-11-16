export const extractSlugFromUrl = (value) => {
  // Handle direct slug input (e.g., "two-sum")
  if (!value.includes('.') && !value.includes('/')) {
    return value.trim().toLowerCase();
  }

  // Handle full LeetCode URL
  try {
    const url = new URL(value);
    const pathSegments = url.pathname.split('/').filter(Boolean);

    // Extract from URL patterns like:
    // leetcode.com/problems/two-sum
    // leetcode.com/problems/two-sum/
    // leetcode.com/problems/two-sum/description
    const problemIndex = pathSegments.indexOf('problems');
    if (problemIndex !== -1 && problemIndex + 1 < pathSegments.length) {
      return pathSegments[problemIndex + 1];
    }
  } catch (error) {
    // Not a valid URL, treat as slug
    return value.trim().toLowerCase();
  }

  return null;
};

export const formatCount = (count) => {
  if (count > 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count > 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toLocaleString();
};

export const getTotalScore = (topics, acRate, difficulty) => {
  // Calculate a composite score based on multiple factors
  let score = 1;

  if (difficulty === 'Hard') score += 2;
  else if (difficulty === 'Medium') score += 1;

  if (acRate < 30) score += 1;
  else if (acRate < 50) score += 0.5;

  if (topics && topics.length > 2) score += 1;

  return Math.min(Math.ceil(score), 5);
};

export const validateInput = (value) => {
  if (!value || !value.trim()) {
    return { valid: false, error: 'Please enter a LeetCode link or question slug' };
  }

  const slug = extractSlugFromUrl(value);
  if (!slug) {
    return { valid: false, error: 'Invalid LeetCode link or slug format' };
  }

  return { valid: true, slug };
};
