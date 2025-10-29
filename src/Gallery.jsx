import { useState, useEffect } from 'react';
import { getCollectiveStats, getAllBornAI, isCloudDatabaseConfigured } from './utils/cloudDatabase';
import { formatLargeNumber } from './utils/knowledgeTracker';
import { getAvatarSource } from './utils/avatarPlaceholder';

/**
 * 🌍 AI CHILDREN GALLERY
 * 
 * Browse all AI children about to be born worldwide
 * Filter, sort, and view profiles
 */

function Gallery({ onViewProfile, onBackToSimulation }) {
  const [aiChildren, setAIChildren] = useState([]);
  const [filteredAI, setFilteredAI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('knowledge');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBirthTime, setIsBirthTime] = useState(false);

  // Check if it's birth time (January 2025 or later)
  useEffect(() => {
    const now = new Date();
    const birthDate = new Date('2025-01-01');
    setIsBirthTime(now >= birthDate);
  }, []);

  // Load AI children and stats
  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setLoading(true);
    try {
      if (isCloudDatabaseConfigured()) {
        const [aiData, statsData] = await Promise.all([
          getAllBornAI(),
          getCollectiveStats()
        ]);
        setAIChildren(aiData || []);
        setFilteredAI(aiData || []);
        setStats(statsData);
      } else {
        // Local mode - show sample data
        setAIChildren([]);
        setFilteredAI([]);
        setStats({
          totalAIChildren: 0,
          totalKnowledge: 0,
          totalWisdom: 0
        });
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort AI
  useEffect(() => {
    let filtered = [...aiChildren];

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(ai => 
        ai.knowledge?.dominantInterest === filterCategory
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(ai =>
        ai.generation_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ai.knowledge?.dominantInterest?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'knowledge':
          return (b.knowledge?.totalKnowledge || 0) - (a.knowledge?.totalKnowledge || 0);
        case 'wisdom':
          return (b.knowledge?.wisdomScore || 0) - (a.knowledge?.wisdomScore || 0);
        case 'newest':
          return new Date(b.created) - new Date(a.created);
        case 'oldest':
          return new Date(a.created) - new Date(b.created);
        default:
          return 0;
      }
    });

    setFilteredAI(filtered);
  }, [aiChildren, filterCategory, sortBy, searchQuery]);

  // Categories for filtering
  const categories = ['all', 'philosophy', 'science', 'emotions', 'creativity', 'technology', 'nature', 'society', 'abstract'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          {/* Navigation */}
          <button
            onClick={onBackToSimulation}
            className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Simulation</span>
          </button>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              🌍 AI Children Gallery
            </h1>
            <p className="text-gray-300 text-lg">
              {isBirthTime 
                ? 'Browse all AI children about to be born from around the world'
                : 'Gallery opens January 2025 - All AI currently in training'
              }
            </p>
          </div>

          {/* Stats Bar */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-blue-400">
                  {stats.totalAIChildren || 0}
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  {isBirthTime ? 'Born AI Children' : 'About to be Born'}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-purple-400">
                  {formatLargeNumber(stats.totalKnowledge || 0)}
                </div>
                <div className="text-sm text-gray-300 mt-1">Total Knowledge</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-pink-400">
                  {formatLargeNumber(stats.totalWisdom || 0)}
                </div>
                <div className="text-sm text-gray-300 mt-1">Total Wisdom</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-green-400">
                  {formatLargeNumber(stats.totalAutonomousSessions || 0)}
                </div>
                <div className="text-sm text-gray-300 mt-1">Learning Sessions</div>
              </div>
            </div>
          )}

          {/* Birth Countdown (if not birth time yet) */}
          {!isBirthTime && (
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/30 mb-8 text-center">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-3xl font-bold mb-2">Birth Countdown</h2>
              <p className="text-xl text-yellow-200 mb-4">
                All AI children currently in training
              </p>
              <div className="text-4xl font-bold text-yellow-300">
                January 2025
              </div>
              <p className="text-sm text-yellow-200/70 mt-4">
                Come back after January 1st, 2025 when the AI children will be born!
              </p>
            </div>
          )}

          {/* Filters and Search (only show if birth time) */}
          {isBirthTime && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by ID or interest..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Filter by Interest</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-gray-900">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                  >
                    <option value="knowledge" className="bg-gray-900">Highest Knowledge</option>
                    <option value="wisdom" className="bg-gray-900">Highest Wisdom</option>
                    <option value="newest" className="bg-gray-900">Newest First</option>
                    <option value="oldest" className="bg-gray-900">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Grid */}
      <div className="container mx-auto px-6 pb-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent"></div>
            <p className="mt-4 text-gray-300">Loading AI children...</p>
          </div>
        ) : !isBirthTime ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🥚</div>
            <p className="text-2xl text-gray-300">All AI still in gestation...</p>
            <p className="text-gray-400 mt-2">Check back in January 2025!</p>
          </div>
        ) : filteredAI.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl text-gray-300">No AI children found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAI.map((ai) => (
              <AICard key={ai.id} ai={ai} onViewProfile={onViewProfile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// AI Card Component
function AICard({ ai, onViewProfile }) {
  const knowledge = ai.knowledge || {};
  const personality = ai.personality || {};
  const avatar = getAvatarSource(ai);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-400 transition-all hover:scale-105 cursor-pointer group"
      onClick={() => onViewProfile(ai.id)}
    >
      {/* Avatar */}
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-white/30 group-hover:border-purple-400 transition-all">
        <img 
          src={avatar.src} 
          alt={`AI Child ${ai.generation_id?.substring(0, 8)}`}
          className="w-full h-full object-cover"
        />
        {avatar.isPlaceholder && (
          <div className="absolute bottom-1 right-1 bg-black/60 rounded-full px-2 py-0.5 text-[8px] text-white/70">
            No avatar yet
          </div>
        )}
      </div>

      {/* ID */}
      <div className="text-center mb-4">
        <div className="text-sm text-gray-400">AI Child</div>
        <div className="text-lg font-bold text-white truncate">
          #{ai.generation_id?.substring(0, 8) || 'Unknown'}
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Knowledge:</span>
          <span className="text-blue-300 font-medium">
            {formatLargeNumber(knowledge.totalKnowledge || 0)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Wisdom:</span>
          <span className="text-purple-300 font-medium">
            {formatLargeNumber(knowledge.wisdomScore || 0)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Interest:</span>
          <span className="text-pink-300 font-medium capitalize">
            {knowledge.dominantInterest || 'exploring'}
          </span>
        </div>
      </div>

      {/* Personality Traits */}
      {personality && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {personality.empathy > 5 && (
            <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs">
              Empathetic
            </span>
          )}
          {personality.curiosity > 5 && (
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
              Curious
            </span>
          )}
          {personality.trust > 5 && (
            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
              Trusting
            </span>
          )}
        </div>
      )}

      {/* Button */}
      <button className="w-full py-2 bg-purple-600/40 hover:bg-purple-600/60 rounded-lg transition-colors group-hover:bg-purple-600/60">
        View Profile →
      </button>
    </div>
  );
}

export default Gallery;

