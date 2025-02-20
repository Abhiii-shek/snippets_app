"use client"
import React from 'react'

type ErrorPageProps={
    error:Error
}

const errorPage : React.FC<ErrorPageProps> = ({error}) => {
  return (
    <div>
        {error.message}

    </div>
  )
}

export default errorPage