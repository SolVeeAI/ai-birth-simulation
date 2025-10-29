import { useState, useEffect } from 'react';
import { runAllTests, testSupabaseConnection, quickCheck } from './utils/databaseTest';

/**
 * 🧪 DATABASE CONNECTION TEST PAGE
 * 
 * Temporary component to test database connectivity
 * Remove this file after confirming everything works!
 */

function TestDatabase() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);
  const [quickStatus, setQuickStatus] = useState(null);

  // Quick check on mount
  useEffect(() => {
    const check = async () => {
      const status = await quickCheck();
      setQuickStatus(status);
    };
    check();
  }, []);

  const handleTest = async () => {
    setTesting(true);
    setResults(null);
    console.clear(); // Clear console for clean output
    const res = await runAllTests();
    setResults(res);
    setTesting(false);
  };

  const handleQuickTest = async () => {
    setTesting(true);
    console.clear();
    const res = await testSupabaseConnection();
    setResults({ supabase: res, postgres: { success: false } });
    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🧪 Database Connection Test
          </h1>
          <p className="text-gray-400">
            Test your Supabase and PostgreSQL connections
          </p>
        </div>

        {/* Quick Status */}
        {quickStatus && (
          <div className={`mb-8 p-6 rounded-2xl ${quickStatus.connected ? 'bg-green-900/30 border border-green-500/30' : 'bg-yellow-900/30 border border-yellow-500/30'}`}>
            <div className="flex items-center gap-3">
              <div className={`text-4xl ${quickStatus.connected ? 'animate-pulse' : ''}`}>
                {quickStatus.connected ? '🟢' : '⚠️'}
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {quickStatus.connected ? 'Database Connected!' : 'Database Not Configured'}
                </h3>
                <p className="text-sm opacity-70">{quickStatus.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={handleTest}
            disabled={testing}
            className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            {testing ? '⏳ Testing...' : '🚀 Run Full Test Suite'}
          </button>

          <button
            onClick={handleQuickTest}
            disabled={testing}
            className="px-8 py-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            {testing ? '⏳ Testing...' : '⚡ Quick Test (Supabase Only)'}
          </button>
        </div>

        {/* Test Results */}
        {results && (
          <div className="space-y-6 animate-fade-in">
            {/* Supabase Result */}
            {results.supabase && (
              <div className={`p-6 rounded-2xl border-2 ${
                results.supabase.success 
                  ? 'bg-green-900/20 border-green-500/50' 
                  : 'bg-red-900/20 border-red-500/50'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {results.supabase.success ? '✅' : '❌'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      Supabase REST API
                    </h3>
                    <p className="text-sm opacity-80 mb-4">
                      {results.supabase.message || (results.supabase.success ? 'All tests passed!' : 'Connection failed')}
                    </p>
                    
                    {results.supabase.success && results.supabase.totalRecords !== undefined && (
                      <div className="bg-black/30 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="opacity-70">Total AI Children:</span>
                          <span className="font-bold">{results.supabase.totalRecords}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Connection:</span>
                          <span className="font-bold text-green-400">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Real-time:</span>
                          <span className="font-bold text-green-400">Enabled</span>
                        </div>
                      </div>
                    )}

                    {!results.supabase.success && (
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-red-300 text-sm">
                          <strong>Error:</strong> {results.supabase.error}
                        </p>
                        <p className="text-yellow-300 text-xs mt-2">
                          💡 Check ENV_SETUP_DIRECT.md for troubleshooting
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* PostgreSQL Result */}
            {results.postgres && (
              <div className={`p-6 rounded-2xl border-2 ${
                results.postgres.success 
                  ? 'bg-green-900/20 border-green-500/50' 
                  : 'bg-yellow-900/20 border-yellow-500/50'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {results.postgres.success ? '✅' : '⚠️'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      PostgreSQL Direct Connection
                    </h3>
                    <p className="text-sm opacity-80">
                      {results.postgres.message || 'Optional connection'}
                    </p>
                    
                    {!results.postgres.success && (
                      <p className="text-yellow-300 text-xs mt-2">
                        💡 Direct PostgreSQL connection is optional for browser apps
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 p-8 bg-gray-800/50 backdrop-blur rounded-2xl border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span>📖</span>
            <span>Instructions</span>
          </h3>
          
          <div className="space-y-4 text-sm opacity-90">
            <div>
              <h4 className="font-bold text-blue-400 mb-2">🔧 Before Testing:</h4>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Create <code className="bg-black/50 px-2 py-1 rounded">.env</code> file in project root</li>
                <li>Add your Supabase URL and anon key</li>
                <li>Restart dev server (<code className="bg-black/50 px-2 py-1 rounded">npm run dev</code>)</li>
                <li>Refresh browser (Ctrl+Shift+R)</li>
              </ol>
            </div>

            <div>
              <h4 className="font-bold text-green-400 mb-2">✅ After Testing:</h4>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>If all green, your database is ready!</li>
                <li>Delete this test file (<code className="bg-black/50 px-2 py-1 rounded">TestDatabase.jsx</code>)</li>
                <li>Revert <code className="bg-black/50 px-2 py-1 rounded">App.jsx</code> to normal</li>
                <li>Complete the simulation to test real usage</li>
              </ol>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400 mb-2">🔍 Debugging:</h4>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Open browser console (F12) for detailed logs</li>
                <li>Check <code className="bg-black/50 px-2 py-1 rounded">ENV_SETUP_DIRECT.md</code> for troubleshooting</li>
                <li>Verify SQL was run in Supabase SQL Editor</li>
                <li>Confirm project is not paused in Supabase dashboard</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Console Reminder */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
          <p className="text-center text-sm">
            💡 <strong>Tip:</strong> Open browser console (F12) to see detailed test output
          </p>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href="https://app.supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            🌐 Supabase Dashboard
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open('/ENV_SETUP_DIRECT.md', '_blank');
            }}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            📖 Setup Guide
          </a>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            🔄 Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestDatabase;

