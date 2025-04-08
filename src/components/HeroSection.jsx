import { useState, useEffect } from "react";
import { Search, Database, Zap, RefreshCw, Globe, Code, Sparkles } from "lucide-react";

const HeroSection = () => {
  const [modelCount, setModelCount] = useState(0);
  const [targetCount] = useState(1286);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Animate counter
  useEffect(() => {
    const interval = setInterval(() => {
      setModelCount(prev => {
        if (prev < targetCount) {
          return Math.min(prev + Math.ceil((targetCount - prev) / 20), targetCount);
        }
        return prev;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [targetCount]);
  
  // Floating particles animation
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated background particles */}
      <Particles />
      
      {/* Glowing gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
      
      <div className="relative container mx-auto px-4 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-5xl mx-auto text-center mb-12">
          {/* Animated logo + title */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 animate-pulse rounded-full" />
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full inline-flex">
                <Database size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              AI Model Hub
            </h1>
          </div>
          
          {/* Tagline with animation */}
          <h2 className="text-2xl md:text-3xl font-medium text-gray-200 mb-6">
            Discover and track the latest AI models across platforms
          </h2>
          
          {/* Statistics counter */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center bg-gray-800/50 px-6 py-3 rounded-lg border border-gray-700">
              <Database className="text-blue-400 mr-3" />
              <div className="text-left">
                <div className="text-xl font-bold text-white">{modelCount.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Models tracked</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-800/50 px-6 py-3 rounded-lg border border-gray-700">
              <RefreshCw className="text-green-400 mr-3" />
              <div className="text-left">
                <div className="text-xl font-bold text-white">Hourly</div>
                <div className="text-sm text-gray-400">Auto-updates</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-800/50 px-6 py-3 rounded-lg border border-gray-700">
              <Globe className="text-purple-400 mr-3" />
              <div className="text-left">
                <div className="text-xl font-bold text-white">Multiple</div>
                <div className="text-sm text-gray-400">Sources</div>
              </div>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-lg" />
            <div className="relative flex items-center bg-gray-800/80 rounded-lg overflow-hidden border border-gray-700">
              <div className="pl-4">
                <Search className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for AI models..."
                className="w-full py-4 px-4 bg-transparent outline-none text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-2 px-6 mx-2 rounded-md font-medium transition-all duration-200 flex items-center">
                Search
                <Zap size={16} className="ml-2" />
              </button>
            </div>
          </div>
          
          {/* Featured categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Text Generation", icon: <Code size={20} /> },
              { name: "Image Models", icon: <Sparkles size={20} /> },
              { name: "Speech Recognition", icon: <Zap size={20} /> },
              { name: "Multimodal", icon: <Database size={20} /> }
            ].map((category, idx) => (
              <button
                key={idx}
                className="flex justify-center items-center bg-gray-800/50 hover:bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-700 transition-all duration-200 group"
              >
                <div className="mr-2 text-blue-400 group-hover:text-blue-300">
                  {category.icon}
                </div>
                <div className="text-sm font-medium text-gray-300 group-hover:text-white">
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0L60 10C120 20 240 40 360 48C480 56 600 52 720 46C840 40 960 32 1080 36C1200 40 1320 56 1380 64L1440 72V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="#111827"
            />
          </svg>
        </div>
      </div>
      
      {/* Animation keyframes - needs to be included */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;