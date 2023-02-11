 const aws = require("aws-sdk")

aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1",
    }
)

let uploadFile = async function(file) {

    return new Promise(function(resolve, rejected){

        let s3 = new aws.S3({apiversion:"2006-03-01"});

        var uploadParams = {
            ACL: "public-read",
            Bucket:"classroom-training-bucket",
            key:"abc/" + file.originalname,
            Body: file.buffer,
        }
    

    s3.upload(uploadParams ,function(err, data){
        if(err){
            return reject({error: err})
        }
        return resolve(data.Loction)
    })
})
}

module.exports = {uploadFile}