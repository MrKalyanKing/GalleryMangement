import React from 'react'
import axios from "axios"
import { useState } from 'react'
const Upload = () => {
    const [files, setFiles] = useState([])
    const api="http://localhost:8000/api"

    const handleOnChange=(e)=>{
        setFiles([...e.target.files])
    }
    const handleUpload=async()=>{
        if(files.length === 0){
            alert("selcet the file ")
            return
        }

        try {
            for(let file  of files){
                const form=new FormData()
                form.append("file",file)

                const res=await axios.post(`${api}/upload`,form)
                setFiles([])
                alert("Upload Success")

            }
        } catch (error) {
            console.log(error.response?.data || error.message)
        }




    }
  return (
    <div>
        <div className='flex flex-col'>
        <label htmlFor="">Image Upload</label>
        <input className="p-2" type="file" name="" id="" onChange={handleOnChange}  />
        </div>

        <button onClick={handleUpload} >Upload</button>
    </div>
  )
}

export default Upload