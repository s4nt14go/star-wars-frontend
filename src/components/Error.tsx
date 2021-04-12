import SyntaxHighlighter from "react-syntax-highlighter";

type Props = { error: any };
function Error ({ error }: Props) {
  return <>
    <p>Error received! The <a href="https://github.com/s4nt14go/star-wars-backend" target='_blank' rel="noreferrer" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>backend</a> actually is just an API proxy that GETs data from <a href="https://swapi.dev" target='_blank' rel="noreferrer" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>https://swapi.dev</a>, so maybe something is wrong in it:</p>
    <SyntaxHighlighter language='json'>
      {error}
    </SyntaxHighlighter>
  </>
}

export default Error;
