import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Connecting People</span>
              <span className="block text-indigo-600">Across Faiths & Interests</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connecting people of all faiths through events and community support. Join our vibrant community where diversity meets unity, creating meaningful connections and fostering understanding across different beliefs.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/events"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Explore Events
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
