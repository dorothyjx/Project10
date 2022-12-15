import react, {useState, useEffect} from "react"
import "./DogsStyle.css"

const Dogs = () => {
	const [breeds, setBreeds] = useState([])  //all breeds
	const [image, setImage] = useState("")

	const [breed, setBreed] = useState("affenpinscher")  //selected breed

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

	const getDogImg = async(dog) => {
		const imageResponse = await fetch(`https://dog.ceo/api/breed/${dog}/images/random`)
		const imageResult = await imageResponse.json()
		setImage(imageResult.message)
	}

	const handleChange = (dog) => {
		setBreed(dog)
		getDogImg(dog)
	}

	useEffect(() => {
		getDogImg(breed)
	}, [breed])

	fetchBreeds()

	return <>
		<div className="container">
			<h1> Find A Dog </h1>

			<form onChange={(event) => handleChange(event.target.value)}>
				<select className="dropdown">
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