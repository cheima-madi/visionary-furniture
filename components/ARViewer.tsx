
import React from 'react';

interface ARViewerProps {
  modelUrl: string;
  altText: string;
  autoRotate?: boolean;
}

// Fix: Use a type-casted constant for the custom element to avoid JSX intrinsic element errors
// that occur when global namespace merging fails in certain TypeScript/React environments.
const ModelViewer = 'model-viewer' as any;

const ARViewer: React.FC<ARViewerProps> = ({ modelUrl, altText, autoRotate = true }) => {
  return (
    <div className="relative w-full h-[350px] md:h-[500px] bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
      {/* Fixed: Using the casted component name to bypass intrinsic element check */}
      <ModelViewer
        src={modelUrl}
        alt={altText}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate={autoRotate ? 'true' : undefined}
        shadow-intensity="1"
        style={{ width: '100%', height: '100%' }}
      >
        <button 
          slot="ar-button" 
          className="absolute bottom-6 right-6 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-xl hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          View in Your Space
        </button>
      </ModelViewer>
      
      <div className="absolute top-4 left-4 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-700 uppercase tracking-widest pointer-events-none">
        3D Interactive Model
      </div>
    </div>
  );
};

export default ARViewer;
