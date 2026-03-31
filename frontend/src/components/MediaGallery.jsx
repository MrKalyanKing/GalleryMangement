import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Gallery from './Gallery'

const MediaGallery = () => {
  const [media, setMedia] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const url = "http://localhost:8000/api"

  const fetchmedia = async () => {
    try {
      const res = await axios.get(`${url}/media/`, {
        params: {
          search,
          page,
          limit: 6
        }
      })
      if (res.data && res.data.success) {
        setMedia(res.data.data || [])
        setTotal(res.data.total || 0)
      }
    } catch (error) {
      console.error("Error fetching media:", error)
    }
  }

  useEffect(() => {
    fetchmedia()
  }, [search, page])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Media Gallery</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search media..."
          className="p-2 border rounded w-full mb-4"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value)
          }}
        />

        <Gallery media={media} />

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="font-semibold">Page {page}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            disabled={media.length < 6 && (page * 6 >= total)}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default MediaGallery