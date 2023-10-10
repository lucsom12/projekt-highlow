export default function Players() {

  function Items() {
    return (

      <div className="flex" >
        <div className="item">
          <div className="info">
            <h3 className='name text-dark'>Player 1</h3>
            <span></span>
          </div>
        </div>
        <div className="item">
          <span>Score</span>
        </div>
      </div>
    )

  }

  return (
    <div id="profile">
      <Items />
    </div>
  )
}