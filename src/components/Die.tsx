


export default function Die(props:any){

    const styles={
        backgroundColor : props.die.isHeld ? "#59E391":"white"
    }

    return (
        <div style={styles} className="die" onClick={()=>props.setHeld(props.die.id)}>
            {props.die.face}
        </div>
    )

}