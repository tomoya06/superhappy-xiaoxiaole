import SoccerBall from '../../img/soccerball.png';
import './index.css';

export function LoadingSoccer(props: {size?: string}) {
  const { size = '16px' } = props;

  return (
    <div className="loading-container" style={{
      ['--loadingsoccer-size']: size,
    }}>
      <img src={SoccerBall} alt="X" className='loading-icon'/>
    </div>
  )
}
