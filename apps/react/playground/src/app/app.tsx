import React from 'react';
import { useViewportSize } from '@parm/react/use-viewport-size';
import './app.scss';
 
export const App = () => {
  const size = useViewportSize();
  return (
    <div className="app">
      {size.width}px / {size.height}px
    </div>
  );
};
 
export default App;