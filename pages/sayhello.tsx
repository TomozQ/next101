import { useState, useEffect } from 'react'

const SayHello = () => {
  const [data, setData] = useState({name: ''})

  useEffect(() => {
    fetch('api/hello')
    .then((res) => res.json())
    .then((profile) => {
      setData(profile)
    })
  },[])

  return <div>hello {data.name}</div>
}

export default SayHello