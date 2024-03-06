import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Footer() {
const Navigate= useNavigate('')
  
  return (
//     <div>
//         <footer class="flex flex-col space-y-10 justify-center m-10">

// <nav class="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
//    <Link to='/home' className='text-blue-400'>Home</Link>

//    <Link to='/about' className='text-blue-400'>About</Link>
// </nav>

// <div class="flex justify-center space-x-5">
    
//         <img onClick={()=>Navigate('/home')} src="https://www.shutterstock.com/image-vector/b-letter-eco-logo-blue-600nw-2326768567.jpg" height='40' width='40' alt='' />
    
   
// </div>
// <p class="text-center text-gray-700 font-medium">&copy; 2022 Company Ltd. All rights reservered.</p>
// </footer>
//     </div>
<footer class="flex flex-col space-y-10 justify-center m-10">

<nav class="flex justify-center flex-wrap gap-6 text-blue-600 font-medium">
    <Link to='/home'>Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/contact'>Contact</Link>
    
</nav>

<div class="flex justify-center space-x-5">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt='facebook' />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" alt='linkedin' />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt='instagram'/>
    </a>
    <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" alt='messenger' />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt='twitter' />
    </a>
</div>
<p class="text-center text-gray-700 font-medium">&copy; 2024 OMB Company Ltd. All rights reservered.</p>
</footer>  )
}

export default Footer