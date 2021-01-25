import qs from "qs";

export default async function handler(req, res) {
  try {
    const host = req.headers.host;
    const { domain, ...queryParams } = req.query;

    const domainName = domain[0];
    const token = process.env.TOKEN;

    const baseUrl = `http://${host}/${domainName}`;
    const params = qs.stringify(queryParams);
    const url = encodeURIComponent(`${baseUrl}?${params}`);

    const apiUrl = `https://screenshotapi.net/api/v1/screenshot?token=${token}&url=${url}&width=1200&height=630`;

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
