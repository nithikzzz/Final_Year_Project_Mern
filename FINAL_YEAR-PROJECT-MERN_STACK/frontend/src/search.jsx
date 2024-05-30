import React, { useEffect, useState } from "react";
import axios from "axios"
 export default function Search (){

    const [searchResult , setsearchResult] = useState([])
    const [key, setkey] = useState("")
    useEffect(()  => {
        const search = async () =>{
         try{

            if(!key.trim()){
                setsearchResult([])
                return
            }
            const res = await axios.get("/datas")
            console.log(res)
        }
        catch(error){
            console.log(error)
        }

         }
        } )

 return(

          <div>
              <input type="text" placeholder="search here..."/>
              <button>go</button>

          </div>

 )
}
