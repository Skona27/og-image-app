import qs from "qs";

export default async function handler(req, res) {
  try {
    const { domain, ...queryParams } = req.query;

    const domainName = domain[0];
    const token = process.env.TOKEN;
    const host = process.env.HOST;

    const baseUrl = `${host}/${domainName}`;
    const params = qs.stringify(queryParams);
    const url = encodeURIComponent(encodeURIComponent(`${baseUrl}?${params}`));

    const apiUrl = `https://screenshotapi.net/api/v1/screenshot?token=${token}&url=${url}&width=1200&height=630&delay=2000&ttl=2500000`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const screenshot = data.screenshot;

    const imageResponse = await fetch(screenshot);
    const imageAB = await imageResponse.arrayBuffer();
    const image = Buffer.from(imageAB);

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.end(image);
  } catch (error) {
    res.statusCode = 500;
    res.end(error);
  }
}
