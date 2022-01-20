import axios from 'axios';

export const getCanvas = async (ctx, canvas, canvasId) => {
  await axios.get(`http://localhost:5000/image?id=${canvasId}`)
  .then(async response => {
      const img = new Image();
      img.src = response.data;
      img.onload = async () => {
        await ctx.clearRect(0, 0, canvas.width, canvas.height);
        await ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
  });
}

export const postCanvas = async (canvasImg, canvasId) => {
  axios.post(`http://localhost:5000/image?id=${canvasId}`, {img: canvasImg});
}
