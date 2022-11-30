import react, {useState, useEffect} from "react"
import "./DogsStyle.css"

const Dogs = () => {
	const [image, setImage] = useState("")
	const [breed, setBreed] = useState("")
	const [dogNum, setDogNum] = useState(0)

	const plus = () => {
		setDogNum(dogNum + 1)
	}
	const minus = () => {
		setDogNum(dogNum - 1)
	}
	const breeds = []
	const getDog = async() => {
		const response = await fetch("https://dog.ceo/api/breeds/list/all")
		const result = await response.json()
		const dog_breeds = result.message

		for (let key of Object.keys(dog_breeds)) {
			if(dog_breeds[key].length == 0){
				breeds.push(key)
			}
			else {
				for(let i of Object.keys(dog_breeds[key])){
					breeds.push(key + "/" + dog_breeds[key][i])
				}
			}
		}
	
		const dog = breeds[dogNum]
		const d = dog.replace("/", "-")
		setBreed(d)

		const imageResponse = await fetch(`https://dog.ceo/api/breed/${dog}/images/random`)
		const imageResult = await imageResponse.json()

		setImage(imageResult.message)
	}

	const formHelper = (event) => {
		setDogNum(Number(event.target.value))
	}

	useEffect(() => {
		getDog()
	}, [dogNum])


	return <>
		<div className="container">
			<h1> Find A Dog </h1>
			<form>
				<input type="number" onChange={(event) => formHelper(event)} placeholder="Choose a number"></input>
			</form>
			<div className="btn-wrap">
				<button onClick={plus}> + </button>
				<button onClick={minus}> - </button>
			</div>
			<h2>Dog Breed: {breed}</h2>
			<img src={image} className="image"/>
		</div>

	</>
}

export default Dogs