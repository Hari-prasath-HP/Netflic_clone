import React, { useEffect, useRef, useState } from 'react'
import './titleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCard = ({title,category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzI4M2VlNTE3OWFlNTg1Y2VmMGMyYzAzMTJhZjE0ZiIsIm5iZiI6MTc1NDcxNTcxMS40NTYsInN1YiI6IjY4OTZkNjNmMmJjNzlkOWMxMjhkYTA3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MnFuKQsYaY4Yfg9T1yB8326h4Drtg7bqFMAsQxlFmec'
  }
};
const handleWheel = (e) => {
  e.preventDefault();
  cardsRef.current.scrollLeft += e.deltaY;
}
useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
}, []);
  return (
    <div className='title-card'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
          })}
      </div>
    </div>
  )
}

export default TitleCard
