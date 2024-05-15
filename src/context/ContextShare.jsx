import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext()
export const editProjectResponsecontext = createContext()

function ContextShare({children}) {
  const [addProjectResponse, setAddProjectResponse] = useState({})
  const [editProjectResponse, setEditProjectResponse] = useState({})
  
  return (
    <>
    <addProjectResponseContext.Provider value = {{addProjectResponse,setAddProjectResponse}}>

      <editProjectResponsecontext.Provider value={{editProjectResponse, setEditProjectResponse}}>
      {children}
      </editProjectResponsecontext.Provider>

    </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare