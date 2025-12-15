import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import ToDo from "./ToDo";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
            
			<h1 className="text-center mt-5">ToDo Fetch</h1>
			
			<ToDo/>
			
		</div>
	);
};

export default Home;