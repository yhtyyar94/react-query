import React, { useEffect, useState } from 'react'
import {useQuery} from 'react-query'
import Character from './Character'

const Characters = () => {

    const [page, setPage] = useState(1)
    const fetchCharacters = async({queryKey}) => {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
      return response.json()
  }

    const {data, status, isPreviousData} = useQuery(['characters', page], fetchCharacters, {
      keepPreviousData:true
    })
console.log(data)
    if(status =='loading') {
      return <div>Loading...</div>
    }

    if(status =='error') {
      return <div>Error</div>
    }

  

  return (
    <div className='characters'>
      {data.results?.map(character => <Character character={character}/>)}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
      <button disabled={!data.info.next} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  )
}

export default Characters