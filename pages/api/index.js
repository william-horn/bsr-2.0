
console.log('index of route api');

export default async function handler(req, res) {
  res.status(200).json({ message: 'testing index' });
}