import react, {useState, useEffect} from "react"
//import Dropdown from 'react-bootstrap/Dropdown'
import "./DogsStyle.css"

const Dogs = () => {
	const [breeds, setBreeds] = useState()
	const [image, setImage] = useState("")

	const [breed, setBreed] = useState("affenpinscher")
	//const [dogNum, setDogNum] = useState(0)

	const allbreeds = []

	const fetchBreeds = async() => {
		const response = await fetch("https://dog.ceo/api/breeds/list/all")
		const result = await response.json()
		setBreeds(result.message)
		const dog_breeds = result.message

		for (let key of Object.keys(dog_breeds)) {
			if(dog_breeds[key].length == 0){
				allbreeds.push(key)
			}
			else {
				for(let i of Object.keys(dog_breeds[key])){
					allbreeds.push(key + "/" + dog_breeds[key][i])
				}
			}
		}
		setBreeds(allbreeds)
	}

	//console.log(breeds)

	const getDogImg = async(dog) => {
		console.log(dog)
		const imageResponse = await fetch(`https://dog.ceo/api/breed/${dog}/images/random`)
		const imageResult = await imageResponse.json()
		setImage(imageResult.message)
	}

	useEffect(() => {
		fetchBreeds,
		getDogImg
	}, [])



	const handleChange =(event) => {
		setBreed(event.target.value)
		console.log("change:" + breed)
		getDogImg(breed)
	}

	return <>
		<div className="container">
			<h1> Find A Dog </h1>

			<form onChange={(event) => handleChange(event)}>
				<select>
					{
						breeds?.map((b, index) => {
							return <option value={b} key={index}>{b}</option>
						})
					}
				</select>
			</form>

			<h2>Dog Breed: {breed}</h2>
			<img src={image} className="image"/>
		</div>
	</>
}

export default Dogs