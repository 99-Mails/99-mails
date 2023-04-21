import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Switch, useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

type Props = PropsWithChildren;

TopBarProgress.config({
  barThickness: 8
});

const CustomSwitch = ({ children }: Props ) => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  const bar = useRef()

  useEffect(() => {
    setProgress(true);
    if (location.pathname != prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setTimeout(() => setProgress(false), 0);
  }, [prevLoc]);

  return (
    <>
      {progress ? <TopBarProgress ref={bar.current} /> : null}
      <Switch>{children}</Switch>
    </>
  );
};

export { CustomSwitch };
