const div: HTMLElement | null = document.querySelector('div');

div!.onclick = function () {
  fetch('/api/user.php').then(res => res.json()).then(data => console.log(data))
};