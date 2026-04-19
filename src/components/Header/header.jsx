import { useEffect } from "react"

const Header = (props) => {

    return <div><h1>{props.title}</h1>
    <div><h1>Ciao {props.user.name}</h1></div>
    </div>
}
useEffect (() =>{
    console.log(color);
},[color])

export default Header 