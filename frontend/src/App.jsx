import React from 'react'
import Upload from './components/Upload'
import MediaGallery from './components/MediaGallery'

const App = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white p-6 rounded shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload New Media</h2>
        <Upload />
      </div>
      <MediaGallery />
    </div>
  )
}

export default App