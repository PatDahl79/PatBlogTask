import React from 'react'
import HeroSection from '../componenets/HeroSection'
import Layout from '../componenets/Layout'
import AllBlogs from './AllBlogsSection'


const Home = () => {
  return (
    <Layout>
        <HeroSection/>
        <AllBlogs/>
    </Layout>
  )
}

export default Home
