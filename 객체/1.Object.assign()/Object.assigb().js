const defaulte = {
  author: "",
  title: "",
  year: 2017,
  rating: null,
};

const book = {
  author: "JoeMorgan",
  title: "Simplifying JavaScript",
};

function add(book, defaulte) {
  const fields = Object.keys(defaulte);
  const updated = {};
  console.log(`:::fields ${fields}`);
  for (let i = 0; i < fields.length; i++ ) {
    const field = fields[i];
    // 비어 있지 않은 객체 값을 찾아 넣어 준다.
    updated[field] = book[field] || defaulte[field];
  }
}

console.log(add(book, defaulte));