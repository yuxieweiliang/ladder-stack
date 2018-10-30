
try {
  setTimeout(function () {
    throw new Error('here');
  }, 10);
} catch (e) { }
