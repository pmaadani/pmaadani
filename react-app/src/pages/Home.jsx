import { useCallback, useState } from 'react';
import IntroAnimation from '../components/IntroAnimation';
import Navbar from '../components/Navbar';
import Terminal from '../components/Terminal';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  const finishIntro = useCallback(() => {
    setIntroFinished(true);
  }, []);

  return (
    <div className="home-page">
      {!introFinished && <IntroAnimation onFinish={finishIntro} />}

      {introFinished && (
        <>
          <Navbar />

          <main className="frame">
            <Terminal />
          </main>
        </>
      )}
    </div>
  );
}