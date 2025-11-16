import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.nextleet.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getQuestionInsights = async (titleSlug) => {
  try {
    const response = await apiClient.get(`/questions/${titleSlug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching question insights:', error);
    throw error;
  }
};

export const getCompanyTags = async (titleSlug) => {
  try {
    const response = await apiClient.get(`/questions/${titleSlug}/companies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company tags:', error);
    throw error;
  }
};

export const getSimilarQuestions = async (titleSlug) => {
  try {
    const response = await apiClient.get(`/questions/${titleSlug}/similar`);
    return response.data;
  } catch (error) {
    console.error('Error fetching similar questions:', error);
    throw error;
  }
};

// Direct LeetCode GraphQL call via Vite dev proxy
export const fetchSimilarFromLeetCode = async (titleSlug) => {
  const query = `query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      title
      titleSlug
      similarQuestions
    }
  }`;

  const resp = await fetch('/leetcode/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { titleSlug } }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`LeetCode GraphQL HTTP ${resp.status}: ${text}`);
  }

  const json = await resp.json();
  if (json.errors) {
    throw new Error(`LeetCode GraphQL Error: ${JSON.stringify(json.errors)}`);
  }

  const q = json?.data?.question;
  if (!q) return null;

  // similarQuestions may be array or JSON string; first coerce to array
  let raw = q.similarQuestions;
  if (!Array.isArray(raw) && typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) raw = parsed;
    } catch (_) {
      raw = [];
    }
  }

  // Normalize to { title, slug }
  const normalize = (item) => {
    if (!item) return null;
    if (typeof item === 'string') {
      const slug = item
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      return { title: item, slug };
    }
    if (typeof item === 'object') {
      const title = item.title || item.questionTitle || item.name || item.titleSlug || '';
      const slug = item.titleSlug || item.slug || (title ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') : '');
      return { title: title || slug, slug };
    }
    return null;
  };

  const similar = Array.isArray(raw) ? raw.map(normalize).filter(Boolean) : [];

  return {
    title: q.title || titleSlug,
    slug: q.titleSlug || titleSlug,
    similar,
  };
};

export default apiClient;
