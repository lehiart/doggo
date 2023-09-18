import React from 'react'

function MexFlagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="15"
      viewBox="0 0 21 15"
    >
      <defs>
        <linearGradient
          id="linearGradient-1"
          x1="50%"
          x2="50%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFF"></stop>
          <stop offset="100%" stopColor="#F0F0F0"></stop>
        </linearGradient>
        <linearGradient
          id="linearGradient-2"
          x1="50%"
          x2="50%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#E3283E"></stop>
          <stop offset="100%" stopColor="#CC162C"></stop>
        </linearGradient>
        <linearGradient
          id="linearGradient-3"
          x1="50%"
          x2="50%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#128A60"></stop>
          <stop offset="100%" stopColor="#0B6848"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g>
          <path fill="url(#linearGradient-1)" d="M0 0H21V15H0z"></path>
          <path fill="url(#linearGradient-2)" d="M10 0H21V15H10z"></path>
          <path fill="url(#linearGradient-3)" d="M0 0H7V15H0z"></path>
          <path fill="url(#linearGradient-1)" d="M7 0H14V15H7z"></path>
          <path
            fill="#8C9157"
            fillRule="nonzero"
            d="M8 7c0 .901.482 1.72 1.247 2.164a.5.5 0 00.502-.865A1.499 1.499 0 019 7a.5.5 0 00-1 0zm3.846 2.107A2.498 2.498 0 0013 7a.5.5 0 10-1 0c0 .518-.264.99-.693 1.265a.5.5 0 10.539.842z"
          ></path>
          <ellipse cx="10.5" cy="6.5" fill="#C59262" rx="1" ry="1.5"></ellipse>
        </g>
      </g>
    </svg>
  )
}

export default MexFlagIcon
