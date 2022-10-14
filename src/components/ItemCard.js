function ItemCard({name, description, image_url}){
    return (<div>
        <img 
            src={image_url === "" ? "https://protkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg" : image_url} 
            alt={name}/>
        <p>{name}</p> 
        <p>{description}</p>
    </div>)
}

export default ItemCard