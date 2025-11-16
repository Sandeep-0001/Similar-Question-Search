// Local pattern library for suggesting similar LeetCode questions without external APIs

const make = (title, slug, difficulty) => ({ title, slug, difficulty });

const TWO_POINTERS = [
  make('Two Sum', 'two-sum', 'Easy'),
  make('Two Sum II - Input array is sorted', 'two-sum-ii-input-array-is-sorted', 'Medium'),
  make('3Sum', '3sum', 'Medium'),
  make('4Sum', '4sum', 'Medium'),
  make('Container With Most Water', 'container-with-most-water', 'Medium'),
  make('Remove Duplicates from Sorted Array', 'remove-duplicates-from-sorted-array', 'Easy'),
];

const SLIDING_WINDOW = [
  make('Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters', 'Medium'),
  make('Minimum Window Substring', 'minimum-window-substring', 'Hard'),
  make('Longest Repeating Character Replacement', 'longest-repeating-character-replacement', 'Medium'),
  make('Permutation in String', 'permutation-in-string', 'Medium'),
  make('Subarray Product Less Than K', 'subarray-product-less-than-k', 'Medium'),
];

const STACK = [
  make('Valid Parentheses', 'valid-parentheses', 'Easy'),
  make('Min Stack', 'min-stack', 'Medium'),
  make('Daily Temperatures', 'daily-temperatures', 'Medium'),
  make('Evaluate Reverse Polish Notation', 'evaluate-reverse-polish-notation', 'Medium'),
  make('Simplify Path', 'simplify-path', 'Medium'),
];

const HASHMAP = [
  make('Group Anagrams', 'group-anagrams', 'Medium'),
  make('Valid Anagram', 'valid-anagram', 'Easy'),
  make('Two Sum', 'two-sum', 'Easy'),
  make('Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters', 'Medium'),
  make('Subarray Sum Equals K', 'subarray-sum-equals-k', 'Medium'),
];

const BINARY_TREE = [
  make('Invert Binary Tree', 'invert-binary-tree', 'Easy'),
  make('Maximum Depth of Binary Tree', 'maximum-depth-of-binary-tree', 'Easy'),
  make('Diameter of Binary Tree', 'diameter-of-binary-tree', 'Easy'),
  make('Binary Tree Level Order Traversal', 'binary-tree-level-order-traversal', 'Medium'),
  make('Path Sum', 'path-sum', 'Easy'),
];

const LINKED_LIST = [
  make('Reverse Linked List', 'reverse-linked-list', 'Easy'),
  make('Merge Two Sorted Lists', 'merge-two-sorted-lists', 'Easy'),
  make('Linked List Cycle', 'linked-list-cycle', 'Easy'),
  make('Remove Nth Node From End of List', 'remove-nth-node-from-end-of-list', 'Medium'),
  make('Add Two Numbers', 'add-two-numbers', 'Medium'),
];

const DP = [
  make('Climbing Stairs', 'climbing-stairs', 'Easy'),
  make('House Robber', 'house-robber', 'Medium'),
  make('Coin Change', 'coin-change', 'Medium'),
  make('Longest Increasing Subsequence', 'longest-increasing-subsequence', 'Medium'),
  make('Longest Palindromic Substring', 'longest-palindromic-substring', 'Medium'),
];

const GRAPH = [
  make('Number of Islands', 'number-of-islands', 'Medium'),
  make('Clone Graph', 'clone-graph', 'Medium'),
  make('Course Schedule', 'course-schedule', 'Medium'),
  make('Rotting Oranges', 'rotting-oranges', 'Medium'),
  make('Pacific Atlantic Water Flow', 'pacific-atlantic-water-flow', 'Medium'),
];

const HEAP = [
  make('Kth Largest Element in an Array', 'kth-largest-element-in-an-array', 'Medium'),
  make('Top K Frequent Elements', 'top-k-frequent-elements', 'Medium'),
  make('Find Median from Data Stream', 'find-median-from-data-stream', 'Hard'),
  make('Merge k Sorted Lists', 'merge-k-sorted-lists', 'Hard'),
];

const MATRIX = [
  make('Rotate Image', 'rotate-image', 'Medium'),
  make('Set Matrix Zeroes', 'set-matrix-zeroes', 'Medium'),
  make('Spiral Matrix', 'spiral-matrix', 'Medium'),
  make('Search a 2D Matrix', 'search-a-2d-matrix', 'Medium'),
  make('Number of Islands', 'number-of-islands', 'Medium'),
];

const GREEDY = [
  make('Jump Game', 'jump-game', 'Medium'),
  make('Gas Station', 'gas-station', 'Medium'),
  make('Partition Labels', 'partition-labels', 'Medium'),
  make('Non-overlapping Intervals', 'non-overlapping-intervals', 'Medium'),
  make('Hand of Straights', 'hand-of-straights', 'Medium'),
];

const PREFIX_SUM = [
  make('Subarray Sum Equals K', 'subarray-sum-equals-k', 'Medium'),
  make('Range Sum Query - Immutable', 'range-sum-query-immutable', 'Easy'),
  make('Find Pivot Index', 'find-pivot-index', 'Easy'),
  make('Maximum Subarray', 'maximum-subarray', 'Medium'),
];

const LIBRARY_BY_PATTERN = {
  'two-pointers': TWO_POINTERS,
  'sliding-window': SLIDING_WINDOW,
  'stack': STACK,
  'hashmap': HASHMAP,
  'binary-tree': BINARY_TREE,
  'linked-list': LINKED_LIST,
  'dynamic-programming': DP,
  'graph': GRAPH,
  'heap': HEAP,
  'matrix': MATRIX,
  'greedy': GREEDY,
  'prefix-sum': PREFIX_SUM,
};

const KEYWORD_TO_PATTERN = [
  { kw: ['two-sum', '3sum', '4sum', 'two-pointer', 'two pointers', 'container'], pattern: 'two-pointers' },
  { kw: ['substring', 'window', 'repeating', 'anagram in string', 'minimum window', 'permutation in string'], pattern: 'sliding-window' },
  { kw: ['parentheses', 'stack', 'temperatures', 'polish', 'rpn', 'simplify-path'], pattern: 'stack' },
  { kw: ['anagram', 'hash', 'map', 'hashmap', 'subarray sum equals k'], pattern: 'hashmap' },
  { kw: ['binary-tree', 'binary tree', 'invert', 'diameter', 'level order', 'path sum'], pattern: 'binary-tree' },
  { kw: ['linked-list', 'linked list', 'reverse linked list', 'cycle', 'merge two sorted lists', 'add two numbers'], pattern: 'linked-list' },
  { kw: ['dp', 'dynamic', 'palindromic substring', 'lis', 'coin change', 'house robber', 'climbing stairs'], pattern: 'dynamic-programming' },
  { kw: ['graph', 'islands', 'clone graph', 'course schedule', 'rotting oranges', 'bfs', 'dfs'], pattern: 'graph' },
  { kw: ['heap', 'priority', 'kth largest', 'top k frequent', 'median'], pattern: 'heap' },
  { kw: ['matrix', 'rotate image', 'spiral matrix', 'search a 2d matrix', 'set matrix zeroes'], pattern: 'matrix' },
  { kw: ['greedy', 'jump game', 'gas station', 'intervals', 'partition labels', 'hand of straights'], pattern: 'greedy' },
  { kw: ['prefix', 'prefix sum', 'range sum', 'pivot index', 'maximum subarray'], pattern: 'prefix-sum' },
];

const toTitle = (slug) => slug
  .split('-')
  .map(s => s.charAt(0).toUpperCase() + s.slice(1))
  .join(' ');

export function getSimilarByPattern(slugOrTitle) {
  const q = String(slugOrTitle || '').toLowerCase();
  const hit = KEYWORD_TO_PATTERN.find(({ kw }) => kw.some(k => q.includes(k)));
  const pattern = hit ? hit.pattern : null;
  if (!pattern) return null;

  const lib = LIBRARY_BY_PATTERN[pattern] || [];
  const normalizedSlug = q.includes('/') || q.includes('.')
    ? q.replace(/^.*problems\//, '').replace(/\/$/, '')
    : q.replace(/\s+/g, '-');

  const title = toTitle(normalizedSlug);
  const difficulty = 'Medium';

  const similar = lib.filter(item => item.slug !== normalizedSlug);
  return { title, slug: normalizedSlug, difficulty, similar };
}

export { LIBRARY_BY_PATTERN };
