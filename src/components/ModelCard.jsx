import { useState } from "react";
import { ExternalLink, BookOpen, Play, Code, Star, Calendar, Clock } from "lucide-react";

const ModelCard = ({ model }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Determine tag color based on tag content
  const getTagColor = (tag) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('text') || tagLower.includes('nlp')) {
      return 'bg-blue-100 text-blue-700';
    } else if (tagLower.includes('image') || tagLower.includes('vision')) {
      return 'bg-purple-100 text-purple-700';
    } else if (tagLower.includes('audio') || tagLower.includes('speech')) {
      return 'bg-green-100 text-green-700';
    } else if (tagLower.includes('multi') || tagLower.includes('ml')) {
      return 'bg-amber-100 text-amber-700';
    } else {
      return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Get icon based on model type
  const getModelTypeIcon = (type) => {
    const typeLower = type.toLowerCase();
    if (typeLower.includes('text')) return <Code size={16} />;
    if (typeLower.includes('image')) return <Play size={16} />;
    if (typeLower === 'unknown') return <Star size={16} />;
    return <Code size={16} />;
  };

  return (
    <div 
      className={`bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-all duration-300 ${isHovered ? 'transform -translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header with gradient based on model type */}
      <div className={`h-2 ${model.type.toLowerCase().includes('text') ? 'bg-gradient-to-r from-blue-500 to-blue-600' : model.type.toLowerCase().includes('image') ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'}`}></div>
      
      <div className="p-5">
        {/* Model Source Badge */}
        <div className="flex justify-between items-start mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${model.source === 'HuggingFace' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
            {model.source}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <Clock size={12} className="mr-1" />
            {formatDate(model.createdAt)}
          </span>
        </div>
        
        {/* Model Name */}
        <h2 className="text-lg font-bold text-gray-800 mb-1 truncate hover:text-clip">{model.name}</h2>
        
        {/* Model Type */}
        <p className="text-sm text-gray-600 flex items-center mb-3">
          {getModelTypeIcon(model.type)}
          <span className="ml-1">{model.type || "General Purpose"}</span>
        </p>
        
        {/* Tags */}
        <div className="mt-3 flex gap-2 flex-wrap">
          {model.tags && model.tags.slice(0, 4).map((tag, i) => (
            <span key={i} className={`${getTagColor(tag)} text-xs px-2 py-1 rounded-full font-medium`}>
              #{tag}
            </span>
          ))}
          {model.tags && model.tags.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
              +{model.tags.length - 4} more
            </span>
          )}
        </div>
        
        {/* Links with enhanced buttons */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
          {model.links.demo && (
            <a 
              href={model.links.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <Play size={14} className="mr-1" />
              Demo
            </a>
          )}
          
          {model.links.docs && (
            <a 
              href={model.links.docs} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <BookOpen size={14} className="mr-1" />
              Docs
            </a>
          )}
          
          {model.links.repo && (
            <a 
              href={model.links.repo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <Code size={14} className="mr-1" />
              Repo
            </a>
          )}
          
          <a 
            href={model.links.docs || model.links.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-auto flex items-center text-xs text-gray-500 hover:text-gray-700"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;