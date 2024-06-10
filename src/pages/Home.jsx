import React from 'react'
import HeroSection from '../componenets/HeroSection'
import AllBlogsSection from './AllBlogsSection'
import Layout from '../componenets/Layout'

const Home = () => {
  return (
    <Layout>
        <HeroSection/>
        <AllBlogsSection/>
    </Layout>
  )
}

export default Home
