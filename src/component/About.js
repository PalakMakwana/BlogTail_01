import React from "react";

function About() {
  return (
    <div>
      <div class="sm:flex items-center max-w-screen-xl">
        <div class="sm:w-1/2 p-10">
          <div class="image object-center text-center">
            <img
              src="https://media.istockphoto.com/id/1841814134/photo/social-media-app-press-the-button-like-images-hand-holding-mobile-smart-phone-smartphone-with.jpg?s=612x612&w=0&k=20&c=ePyAsI-blvxpm6OP850cuUBUKdRkVrN-7baz5_yznLc="
              alt=""
            />
          </div>
        </div>
        <div class="sm:w-1/2 p-5">
          <div class="text">
            <span class="text-gray-500 border-b-2 border-indigo-600 uppercase">
              About us
            </span>
            <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">
              About <span class="text-indigo-600">Our Website</span>
            </h2>
            <p class="text-gray-700 text-justify">
          
              
              At (OMB!) Oh My Blog !, our aim is to offer you
              an Interactive Website show you that we really care! Not
              only have we got the trendiest Web Design.Our aim is to continue 
              providing our client a satisfying UI,keep them happy. Our clients are
              our top priority and through our service we work hard towards
              building long-lasting and meaningful relations with them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
