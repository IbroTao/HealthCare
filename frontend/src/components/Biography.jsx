import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sint incidunt reiciendis assumenda dolorum autem, 
          minima ut harum rem non ipsum praesentium fugiat, veniam deleniti quasi quibusdam inventore tempora voluptatum suscipit? 
          Numquam placeat quia, veritatis et, ullam vel consequatur iste repellat mollitia nostrum nihil eveniet ducimus molestias quas, suscipit repellendus!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> 
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla odit ratione voluptatum nam labore magnam iusto excepturi iste, 
          neque quidem! Odit ratione eligendi veniam ducimus! Ab nostrum quas quisquam unde non sed dignissimos corporis dolores?
        </p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, perferendis est. Officiis!</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography
