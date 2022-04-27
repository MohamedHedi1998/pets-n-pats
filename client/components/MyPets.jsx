import React, { useEffect } from 'react'
// import * as api from './apiClient'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserPets } from '../actions'

function MyPets() {
  const dispatch = useDispatch()
  const userId = 6

  const pets = useSelector((state) => state.pets)


  useEffect(() => {
    dispatch(fetchUserPets(userId))
  }, [])

  const userInfo = pets.map((pet, i) => {
    return (
      <li key={i}>
        {pet.id}
        <h2>{pet.name}</h2>
        <img
          src={pet.imageUrl}
          alt="picture of the pet we put here in the tag"
        />
        <p>{pets.bio}</p>
      </li>
    )
  })

  return (
    <div className="MyPets">
      <ul>{userInfo}</ul>
    </div>
  )
}

export default MyPets