const padNumber = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const secInMin = 60;
const minInHour = secInMin;

const centInSec = 100;
const centInMin = secInMin * centInSec;
const centInHour = minInHour * centInMin;

const hourInCent = (cent: number) => Math.floor(cent / centInHour);

export const timeToTimecode = (cent: number) => {
  const h = hourInCent(cent);
  const m = Math.floor(cent / centInMin) - h * 60;
  const s = Math.floor(cent / centInSec) - h * 3600 - m * 60;
  const c = cent - s * centInSec - m * centInMin - h * centInHour;
  return `${padNumber(h)}:${padNumber(m)}:${padNumber(s)}:${padNumber(c)}`;
};
