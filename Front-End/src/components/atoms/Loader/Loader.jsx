import './Loader.css'

export default function Loader({ isLoading, location = "" }) {
    return(
        <div className={"loader " + ((location == "search") ? "loader-search" : "")} style={{
            display: (!isLoading && 'none')
        }}></div> 
    )
}