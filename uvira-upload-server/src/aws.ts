import { S3 } from "aws-sdk";
import fs from "fs";

// replace with your own credentials
const s3 = new S3({
    accessKeyId: "e10a7664dec0567a201d3892dcac328d",
    secretAccessKey: "d9eaec487bef6fc594958ecde88638b6f1067ec3bd79b1fd9228be8cd3a0586a",
    endpoint: "https://a22a9614dd9ed8a047849a7f7f484c47.r2.cloudflarestorage.com"
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(response);
}