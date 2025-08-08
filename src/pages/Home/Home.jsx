import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCard from '../../components/TitleCards/TitleCard'

const Home = () => {
  return (
    <div className='Home'>
        <Navbar />
        <div className="hero">
          <img src={hero_banner} alt="" className='banner-img'/>
          <div className="hero-caption">
            <img src={hero_title} alt="" className='caption-img'/>
            <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
            <div className="hero-btns">
              <button className="btn">
                <img src={play_icon} alt="" /> Play
              </button>
              <button className="btn dark-btn">
                <img src={info_icon} alt="" /> More Info
              </button>
            </div>
            <TitleCard />
          </div>
        </div>
        <div className="more-cards">
          <TitleCard title={"Blockbuster Movies"}/>
          <TitleCard title={"Only on Netflix"}/>
          <TitleCard title={"Upcoming"}/>
          <TitleCard title={"Top Pics for You"}/>
        </div>
        <Footer />
    </div>
  )
}

export default Home
