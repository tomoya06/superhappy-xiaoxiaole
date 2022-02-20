import { useEffect, useMemo, useState } from "preact/hooks";

let localLooper = 3;

interface Props {
  text: string;
}

export function Indicator(props: Props) {
  const [idcLooper, setIdcLooper] = useState(3);
  let idcLooperInt: number = 0;

  useEffect(() => {
    idcLooperInt = setInterval(() => {
      localLooper = (localLooper + 1) % 4;
      setIdcLooper(localLooper);
    }, 500);

    return () => {
      clearInterval(idcLooperInt);
    };
  }, []);

  const idcLooperArrow = useMemo(() => {
    return [">".repeat(idcLooper), "<".repeat(idcLooper)];
  }, [idcLooper]);

  return <>{idcLooperArrow[1] + " " + props.text + " " + idcLooperArrow[0]}</>;
}
