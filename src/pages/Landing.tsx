import * as preact from 'preact';
import { useState } from 'preact/hooks';

export const Landing: preact.FunctionComponent = () => {
  const [value, setValue] = useState(12);

  return (
    <div>
      <a href="http://www.exemple.com">
        A working link, with a functional href
      </a>
      <p>{value}</p>
      <button onClick={() => setValue((v) => v + 1)}>Increment</button>
    </div>
  );
};
