//For debugging
const WeightList = ({ weights, removeWeightHandler }: { weights: Weight[]; removeWeightHandler: any }) => {
    return (
        <div className="weightList">
            {weights.map((w: Weight) => {
                return <div key={w.index}>
                    <input className="weightListItem" value={"Question: " + w.index + " Weight: " + w.value} readOnly></input>
                    <button onClick={() => removeWeightHandler(w.index)}>Remove</button>
                </div>
            })}</div>
    )
}

export default WeightList