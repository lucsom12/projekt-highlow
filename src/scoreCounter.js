import { useOutletContext, useLoaderData } from 'react-router-dom';

function ScoreCounter() {
  const score = useLoaderData();

  return (
    <div>
      Hello
      Score : {score}
    </div>

  )


} export default ScoreCounter;
