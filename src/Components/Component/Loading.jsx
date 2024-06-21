import '../CSS/Loading.css'

export default function Loading({ use }) {
  return (
    <section id="loadingPage" className={use}>
      <div id='loadingCont'>
        <span className='loadingBall redBall'></span>
        <span className='loadingBall yellowBall'></span>
        <span className='loadingBall greenBall'></span>
      </div>
    </section >
  )
}
