import React from 'react'
import axios from 'axios'

const MediaCard = ({ itemm }) => {
  const backendUrl = "http://localhost:8000"

  // Ensure the path is correctly formatted for the browser
  const fileUrl = `${backendUrl}/${itemm.path.replace(/\\/g, '/')}`

  return (
    <div className="border p-4 rounded shadow-md flex flex-col items-center">
      {itemm.type === 'image' ? (
        <img src={fileUrl} alt={itemm.name} className="w-full h-48 object-cover rounded mb-2" />
      ) : (
        <video src={fileUrl} controls className="w-full h-48 object-cover rounded mb-2" />
      )}
      <div className="flex flex-col items-start w-full">
        <h3 className="font-semibold truncate w-full">{itemm.name}</h3>
        <p className="text-sm text-gray-500 capitalize">{itemm.type}</p>
        <p className="text-xs text-gray-400">{(itemm.size / 1024).toFixed(2)} KB</p>
      </div>
    </div>
  )
}

export default MediaCard
