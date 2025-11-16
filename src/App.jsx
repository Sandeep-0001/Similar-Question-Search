import React, { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { SearchSection } from './components/SearchSection';
import { SimilarQuestionsView } from './components/SimilarQuestionsView';
import Navbar from './components/Navbar';
import './index.css';
import { extractSlugFromUrl as utilExtractSlugFromUrl } from './utils/helpers';
import { getSimilarByPattern } from './lib/patterns';
import { fetchSimilarFromLeetCode } from './services/api';

// Mock data - Replace with real LeetCode API calls
const mockQuestionData = {
  'two-sum': {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    similar: [
      { title: '3Sum', slug: '3sum', difficulty: 'Medium' },
      { title: '4Sum', slug: '4sum', difficulty: 'Medium' },
      { title: 'Two Sum II - Input array is sorted', slug: 'two-sum-ii-input-array-is-sorted', difficulty: 'Medium' },
      { title: 'Two Sum III - Data structure design', slug: 'two-sum-iii-data-structure-design', difficulty: 'Easy' },
    ],
  },
  '3sum': {
    title: '3Sum',
    slug: '3sum',
    difficulty: 'Medium',
    similar: [
      { title: 'Two Sum', slug: 'two-sum', difficulty: 'Easy' },
      { title: '4Sum', slug: '4sum', difficulty: 'Medium' },
      { title: '3Sum Closest', slug: '3sum-closest', difficulty: 'Medium' },
    ],
  },
  '4sum': {
    title: '4Sum',
    slug: '4sum',
    difficulty: 'Medium',
    similar: [
      { title: 'Two Sum', slug: 'two-sum', difficulty: 'Easy' },
      { title: '3Sum', slug: '3sum', difficulty: 'Medium' },
      { title: '3Sum Closest', slug: '3sum-closest', difficulty: 'Medium' },
    ],
  },
  'reverse-integer': {
    title: 'Reverse Integer',
    slug: 'reverse-integer',
    difficulty: 'Medium',
    similar: [
      { title: 'String to Integer (atoi)', slug: 'string-to-integer-atoi', difficulty: 'Medium' },
      { title: 'Palindrome Number', slug: 'palindrome-number', difficulty: 'Easy' },
      { title: 'Plus One', slug: 'plus-one', difficulty: 'Easy' },
    ],
  },
};

// Extract slug from LeetCode URL or return the input as-is
const extractSlug = (input) => {
  // Handle full LeetCode URLs
  const urlMatch = input.match(/leetcode\.com\/problems\/([^\/]+)/);
  if (urlMatch) {
    return urlMatch[1];
  }
  // Otherwise treat input as slug
  return input.toLowerCase().replace(/\s+/g, '-');
};

const getQuestionSimilar = async (input) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Prefer robust util for slug extraction, fallback to local
  const slug = utilExtractSlugFromUrl(input) || extractSlug(input);

  // 1) Try LeetCode GraphQL via proxy (dev or Vercel API route)
  try {
    const lc = await fetchSimilarFromLeetCode(slug);
    if (lc && lc.title) {
      const similar = (lc.similar || []).map(item => ({
        title: item.title,
        slug: item.slug,
        difficulty: 'Medium',
      }));
      return {
        title: lc.title,
        slug: lc.slug || slug,
        difficulty: 'Medium',
        similar,
      };
    }
  } catch (e) {
    console.warn('LeetCode fetch failed, using local engines.', e);
  }

  // 2) Offline pattern-based engine
  const patternResult = getSimilarByPattern(slug);
  if (patternResult) return patternResult;

  // 3) Fallback to mock for known examples
  return mockQuestionData[slug] || null;
};

function App() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    document.title = 'Similar Question Search';
  }, []);

  const handleSearch = async (slug) => {
    if (!slug.trim()) {
      toast.error('Please enter a question name');
      return;
    }

    const currentId = ++requestIdRef.current;
    setIsLoading(true);
    try {
      const data = await getQuestionSimilar(slug);
      if (currentId !== requestIdRef.current) return;

      if (data) {
        setSelectedQuestion(data);
        toast.success(`Found: ${data.title}`);
      } else {
        toast.error(`Question not found. Try "two-sum", "3sum", or "4sum"`);
      }
    } catch (error) {
      if (requestIdRef.current === 0) return;
      toast.error('Failed to fetch question. Please try again.');
      console.error('Error:', error);
    } finally {
      if (requestIdRef.current === currentId) {
        setIsLoading(false);
      }
    }
  };

  const handleBackToSearch = () => {
    requestIdRef.current = 0;
    setSelectedQuestion(null);
    setIsLoading(false);
  };

  const handleSelectSimilarQuestion = async (slug) => {
    const currentId = ++requestIdRef.current;
    setIsLoading(true);
    try {
      const data = await getQuestionSimilar(slug);
      if (currentId !== requestIdRef.current) return;

      if (data) {
        setSelectedQuestion(data);
        toast.success(`Loaded: ${data.title}`);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      if (requestIdRef.current === 0) return;
      toast.error('Failed to load question');
      console.error('Error:', error);
    } finally {
      if (requestIdRef.current === currentId) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
          <Navbar />
        </header>

        {/* Main content */}
        <main className="flex-1 flex justify-center px-4 py-10 md:py-16">
          <div className="w-full max-w-5xl mx-auto">
            {!selectedQuestion ? (
              <SearchSection onSearch={handleSearch} isLoading={isLoading} />
            ) : (
              <div className="space-y-6">
                <button
                  onClick={handleBackToSearch}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-600 text-xs md:text-sm text-zinc-200 font-medium transition-all shadow-sm"
                >
                  <span className="text-lg">
                    ←
                  </span>
                  Back to search
                </button>
                <SimilarQuestionsView
                  question={selectedQuestion}
                  isLoading={isLoading}
                  onSelectSimilar={handleSelectSimilarQuestion}
                  onSearch={handleSearch}
                />
              </div>
            )}
          </div>
        </main>

        <Toaster richColors position="bottom-right" theme="dark" />
      </div>
    </div>
  );
}

export default App;
