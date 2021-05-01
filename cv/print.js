window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('print-button');
  button.addEventListener('click', () => {
    window.print();
  });
});
