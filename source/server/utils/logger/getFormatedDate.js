module.exports = () => {
  const currentDate = new Date();
  const rawTimeZone = currentDate.toString().split(' ')[5].substr(3);
  const timeZone = `${rawTimeZone.substr(0, 3)}:${rawTimeZone.substr(3)}`;
  const [ymd, timeWithZ] = currentDate.toISOString().split('T');
  const [time] = timeWithZ.split('Z');

  return `${ymd} ${time} ${timeZone}`;
};
