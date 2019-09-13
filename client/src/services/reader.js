const fileReader = (file)=>{

	return new Promise( ( resolve , reject ) =>{
        try{

        	let reader = new FileReader();
        	
  			reader.onloadend = (ev) =>{
  				resolve( reader.result );
  			};

  			reader.readAsDataURL(file);
	
        }catch(err) {
            reject("error")
        }
    })


  
}

export default fileReader;