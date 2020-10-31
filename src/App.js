import React, { useState, useEffect, useRef } from "react";
import api from './services/api.js'
import "./styles.css";

function App() {

	const [repositories, setRepositories] = useState([]);
	var title = useRef(title);

	useEffect(() => {
		api.get('/repositories').then(response => {
			console.log(response.data);
			setRepositories(response.data);
		})
	}, []);


	async function handleAddRepository() {
		// TODO
		let newRepositorie = {
			title:title.current.value,
			url:"https://github.com/react",
			techs:["react"]
		}

		let response = await api.post('/repositories', newRepositorie);

		setRepositories([...repositories, response.data]);
	}

	async function handleRemoveRepository(id) {
		// TODO
		await api.delete(`/repositories/${id}`);

    let newRepositories = repositories.filter(rep=> rep.id !=  id);

    setRepositories(newRepositories);

	/*	api.get('/repositories').then(response=>{
			setRepositories(response.data);
    })
    */
	}


	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map(rep =>
					<li key={rep.id}>
						<h3>{rep.title}</h3>
						<button onClick={() => handleRemoveRepository(rep.id)}>
							Remover
                    </button>
					</li>
				)}
			</ul>

			<input type="text" name="title" ref={title} placeholder="title" />
			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
