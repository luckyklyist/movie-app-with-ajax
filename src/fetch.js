const fetchData=async()=>{
    const data=await fetch("linl")
    const movieData=await data.json()
    return movieData;
}


console.log(movieData);