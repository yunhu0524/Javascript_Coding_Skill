const developer = [
  {
    name: "진호",
    language: "ios",
  },
  {
    name: "장원",
    language: "javascript",
  },
  {
    name: "윤후",
    language: "javascript",
  },
];

const aggregated = developer.reduce((aggregated, developer) => {
  const count = aggregated[developer.language] || 0;
  return {
    ...aggregated,
    [developer.language]: count + 1,
  };
}, {});

console.log(aggregated);

const firms = new Map()
  .set(10, '삼성')
  .set(20, 'LG')
  .set(30, '두산')

const entries = [...firms].find((firm) => {
  const [id] = firm;
  return id;
});

console.log(entries);