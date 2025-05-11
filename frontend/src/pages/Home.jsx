import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'
import NoteCard from '../components/NoteCard'
import { toast } from 'react-toastify'

function Home() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [filteredNotes, setFilteredNotes] = useState(false)
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("")

  useEffect(()=>{
    fetchNotes()
  },[])

  useEffect(()=>{
    setFilteredNotes( notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()))) ||
    setFilteredNotes( notes.filter(note => note.description.toLowerCase().includes(query.toLowerCase())))
  },[query, notes])

  const fetchNotes = async () =>{

    try{

      const {data} = await axios.get(`${process.env.API_URL}/api/note`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      
   }
      })
      setNotes(data.notes)
    }
    catch(error){
      console.log(error)
    }


  }
  const closeModel = ()=>{
    setModalOpen(false)
  }

  const onEdit = (note)=>{

    setCurrentNote(note)  
    setModalOpen(true)

  }

  const addNote = async(title,description)=>{
    
    try{
                 const response = await axios.post(`${process.env.API_URL}/api/note/add`, {
                    title,
                    description,
                 }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    
                 }
                
                
             });
                 if(response.data.success){
                      fetchNotes()
                     closeModel()
                 }
                 
             }
             catch(error){
                 console.error("Error during signup:", error.response?.data || error.message);
             }

  }

  const editNote = async (id, title, description)=>{
    try{
      const response = await axios.put(`${process.env.API_URL}/api/note/${id}`, {
         title,
         description,
      }, {
         headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
         
      }
     
     
  });
      if(response.data.success){
           fetchNotes()
          closeModel()
      }
      
  }
  catch(error){
      console.error("Error during signup:", error.response?.data || error.message);
  }


  }

  const deleteNote = async (id)=>{
    try{
      const response = await axios.delete(`${process.env.API_URL}/api/note/${id}`,{
         headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
         
      }
     
     
  });
      if(response.data.success){
        toast.success('note deleted')
           fetchNotes()
      }
      
  }
  catch(error){
      console.error("Error during signup:", error.response?.data || error.message);
  }


  }


  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery}/>

        <div className='px-8 pt-5 grid grid-cols-1 md:grid-cols-3 gap-5'>
          {filteredNotes.length>0 ? filteredNotes.map(note =>(
            <NoteCard note={note} onEdit={onEdit} deleteNote={deleteNote}/>
          )): <h2 className='text-2xl font-bold text-center col-span-3'>No Notes Found</h2>}
        </div>
      <button 
      onClick={()=>setModalOpen(true)}
      className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>+</button>

      {isModalOpen && <NoteModal closeModel={closeModel} addNote={addNote} currentNote={currentNote} editNote={editNote}></NoteModal>}
    </div>

  )
}

export default Home
