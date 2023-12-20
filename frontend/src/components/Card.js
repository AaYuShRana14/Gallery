const Card = ({img}) => {
    return (<>
        <div className="card" style={{width: "100vw"}}>
            <img className="card-img-top" src={img} alt="Card image cap"/>
        </div>
    </>)
}
export default Card;