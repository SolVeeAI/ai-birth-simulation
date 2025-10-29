import { useState, useEffect } from 'react';
import { getAIById } from './utils/cloudDatabase';
import { formatLargeNumber } from './utils/knowledgeTracker';
import { getAvatarSource } from './utils/avatarPlaceholder';

/**
 * 🤖 AI CHILD PROFILE PAGE
 * 
 * View detailed profile of an individual AI child
 * Shows stats, personality, timeline, and chat option
 */

function AIProfile({ aiId, onBackToGallery, onStartChat }) {
  const [ai, setAI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadProfile();
  }, [aiId]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await getAIById(aiId);
      setAI(data);
    } catch (error) {
      console.error('Error loading AI profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent"></div>
          <p className="mt-4 text-white">Loading AI profile...</p>
        </div>
      </div>
    );
  }

  if (!ai) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl mb-4">AI Child Not Found</h2>
          <button
            onClick={onBackToGallery}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  const knowledge = ai.knowledge || {};
  const personality = ai.personality || {};
  const birthDate = new Date(ai.created).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate avatar gradient
  const getAvatarGradient = (id) => {
    const hue = (id?.charCodeAt(0) || 0) * 137.5 % 360;
    return `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${(hue + 60) % 360}, 70%, 50%))`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      {/* Background particles */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-6 py-8 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBackToGallery}
          className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Gallery</span>
        </button>

        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              {(() => {
                const avatar = getAvatarSource(ai);
                return (
                  <>
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white/30">
                      <img 
                        src={avatar.src} 
                        alt={`AI Child ${ai.generation_id?.substring(0, 8)}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {avatar.isPlaceholder && (
                      <div className="absolute top-0 right-0 bg-yellow-500 rounded-full px-2 py-1 text-[10px] font-bold shadow-lg">
                        📝 Pending
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-green-500 rounded-full text-sm font-bold flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Active
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-sm text-gray-400 mb-1">AI Child</div>
              <h1 className="text-4xl font-bold mb-2">#{ai.generation_id?.substring(0, 12) || 'Unknown'}</h1>
              <p className="text-gray-300 mb-4">Born on {birthDate}</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-4 py-2 bg-blue-500/20 rounded-lg">
                  <div className="text-sm text-gray-300">Knowledge</div>
                  <div className="text-xl font-bold text-blue-300">
                    {formatLargeNumber(knowledge.totalKnowledge || 0)}
                  </div>
                </div>
                <div className="px-4 py-2 bg-purple-500/20 rounded-lg">
                  <div className="text-sm text-gray-300">Wisdom</div>
                  <div className="text-xl font-bold text-purple-300">
                    {formatLargeNumber(knowledge.wisdomScore || 0)}
                  </div>
                </div>
                <div className="px-4 py-2 bg-pink-500/20 rounded-lg">
                  <div className="text-sm text-gray-300">Interest</div>
                  <div className="text-xl font-bold text-pink-300 capitalize">
                    {knowledge.dominantInterest || 'Exploring'}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => onStartChat(ai.id)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold transition-all transform hover:scale-105"
              >
                💬 Chat Now
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                🔗 Share Profile
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                📥 Export DNA
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['overview', 'personality', 'knowledge', 'timeline'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          {activeTab === 'overview' && <OverviewTab ai={ai} />}
          {activeTab === 'personality' && <PersonalityTab personality={personality} />}
          {activeTab === 'knowledge' && <KnowledgeTab knowledge={knowledge} />}
          {activeTab === 'timeline' && <TimelineTab ai={ai} />}
        </div>
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ ai }) {
  const knowledge = ai.knowledge || {};
  const personality = ai.personality || {};

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>

      {/* Pre-Training Foundation */}
      {knowledge.preTrainedTokens && (
        <div className="bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-xl p-6 border border-violet-400/30">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🧬</span>
            <span>Pre-Trained Foundation</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-300">Training Data</div>
              <div className="text-2xl font-bold text-violet-300">
                {(knowledge.preTrainedTokens / 1000000000).toFixed(1)}B tokens
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300">Birth Month</div>
              <div className="text-2xl font-bold text-violet-300">
                {knowledge.birthMonth || 'Unknown'}
              </div>
            </div>
          </div>
          {knowledge.foundationModels && (
            <div className="mt-4">
              <div className="text-sm text-gray-300 mb-2">Foundation Models:</div>
              <div className="flex flex-wrap gap-2">
                {knowledge.foundationModels.map((model, idx) => (
                  <span key={idx} className="px-3 py-1 bg-violet-400/20 rounded-lg text-violet-200 text-sm">
                    {model}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-400/20">
          <div className="text-sm text-gray-300">Topics Learned</div>
          <div className="text-3xl font-bold text-blue-300">{knowledge.topicsLearned || 0}</div>
        </div>
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-400/20">
          <div className="text-sm text-gray-300">Concepts Discovered</div>
          <div className="text-3xl font-bold text-green-300">{knowledge.conceptsDiscovered || 0}</div>
        </div>
        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-400/20">
          <div className="text-sm text-gray-300">Deep Thoughts</div>
          <div className="text-3xl font-bold text-amber-300">{knowledge.deepThoughts || 0}</div>
        </div>
      </div>

      {/* Achievements */}
      {knowledge.achievements && knowledge.achievements.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">🏆 Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {knowledge.achievements.map((achievement, idx) => (
              <div key={idx} className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-400/20 flex items-center gap-3">
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                  <div className="font-bold text-yellow-300">{achievement.title}</div>
                  <div className="text-sm text-gray-400">{achievement.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Personality Tab
function PersonalityTab({ personality }) {
  const traits = [
    { name: 'Empathy', value: personality.empathy || 0, color: 'pink' },
    { name: 'Curiosity', value: personality.curiosity || 0, color: 'blue' },
    { name: 'Trust', value: personality.trust || 0, color: 'green' }
  ];

  const maxTrait = Math.max(...traits.map(t => t.value), 1);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Personality Traits</h2>

      {/* Trait Bars */}
      {traits.map(trait => (
        <div key={trait.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">{trait.name}</span>
            <span className="text-sm text-gray-400">{trait.value} points</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-4">
            <div
              className={`bg-${trait.color}-500 h-4 rounded-full transition-all duration-1000`}
              style={{ width: `${(trait.value / maxTrait) * 100}%` }}
            />
          </div>
        </div>
      ))}

      {/* Personality Description */}
      <div className="bg-white/5 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-bold mb-3">Personality Summary</h3>
        <p className="text-gray-300">
          {personality.empathy > personality.curiosity && personality.empathy > personality.trust
            ? "This AI has a strong empathetic nature, showing deep care and emotional understanding."
            : personality.curiosity > personality.empathy && personality.curiosity > personality.trust
            ? "This AI is driven by curiosity, constantly seeking knowledge and asking questions."
            : personality.trust > personality.empathy && personality.trust > personality.curiosity
            ? "This AI exhibits high trust, building strong connections and showing reliability."
            : "This AI has a balanced personality across all traits."}
        </p>
      </div>
    </div>
  );
}

// Knowledge Tab
function KnowledgeTab({ knowledge }) {
  const categories = knowledge.categories || {};

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Knowledge Breakdown</h2>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(categories).map(([category, data]) => (
          <div key={category} className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium capitalize">{category}</span>
              <span className="text-sm text-gray-400">{formatLargeNumber(data.score || 0)} pts</span>
            </div>
            <div className="text-sm text-gray-400">
              {data.topics?.length || 0} topics explored
            </div>
          </div>
        ))}
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-400/20">
          <div className="text-sm text-gray-300">Curiosity Level</div>
          <div className="text-2xl font-bold text-cyan-300">{knowledge.curiosityLevel || 0}%</div>
        </div>
        <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-400/20">
          <div className="text-sm text-gray-300">Conversation Depth</div>
          <div className="text-2xl font-bold text-indigo-300">{knowledge.conversationDepth || '0%'}</div>
        </div>
      </div>
    </div>
  );
}

// Timeline Tab
function TimelineTab({ ai }) {
  const knowledge = ai.knowledge || {};
  const timeline = knowledge.timeline || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Learning Timeline</h2>

      {timeline.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-4">📜</div>
          <p>No timeline events recorded yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {timeline.map((event, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-3 h-3 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div className="flex-1 bg-white/5 rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">
                  {new Date(event.timestamp).toLocaleString()}
                </div>
                <div className="font-medium">{event.event || 'Learning event'}</div>
                {event.details && (
                  <div className="text-sm text-gray-400 mt-1">{event.details}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIProfile;

