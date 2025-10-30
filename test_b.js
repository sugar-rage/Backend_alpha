const bcrypt = require('bcrypt');


(async () => {
  const match = await bcrypt.hash('admin123', 10);
  console.log('Does it match?', match);
})();
