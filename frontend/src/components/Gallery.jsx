import React from 'react'
import MediaCard from './MediaCard'

const Gallery = ({ media }) => {
  if (!media || media.length === 0) {
    return <div className="text-center py-10 text-gray-500">No media found. Upload some!</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {media.map((itemm) => (
        <MediaCard key={itemm.id} itemm={itemm} />
      ))}
    </div>
  )
}

export default Gallery