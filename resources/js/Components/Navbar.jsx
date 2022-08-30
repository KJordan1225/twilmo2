import React from 'react'

const Navbar = props => {
  return (
    <>
      <nav
        className={
          (props.transparent
            ? "top-0 absolute z-50 w-full"
            : "relative shadow-lg bg-white") +
          " flex flex-wrap items-center justify-between px-2 py-3 "
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={
                (props.transparent ? "text-white" : "text-gray-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              }
              href={route('dashboard')} method='get'
            >
              Demp P2P Payment System
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
