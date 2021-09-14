const canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext('2d');

c.fillRect(100, 100, 200, 200);
c.fillRect(320, 220, 100, 100);
c.fillRect(430, 330, 50, 50);
c.fillRect(540, 440, 10, 10);