import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: "3599765af1ac4faf6cc9f988c65251e4",
    secretAccessKey: "4efbc2b179915e51639cb65750267ff4c70a3671e473e645433f286911d48352",
    endpoint: "https://a22a9614dd9ed8a047849a7f7f484c47.r2.cloudflarestorage.com",
    region: "auto",
    s3ForcePathStyle: true,
    signatureVersion: "v4",
    s3DisableBodySigning: true
})

const app = express();

app.get("/*", async (req, res) => {
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);