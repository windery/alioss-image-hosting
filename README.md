# Aliyun OSS image hosting   
A tool for uploading image from clipboard to aliyun oss service and save image url to clipboard.

## Requirements  
- MACOS
- nodejs >= 8.0.0 
- pngpaste
```bash
brew install pngpaste
```
- [Aliyun OSS](https://help.aliyun.com/product/31815.html) account
    
```shell
brew install pngpaste
```

## Install  
```bash
npm install alioss-image-hosting -g
```

## Usage  
1. configure  
    You just need to initialize configuration once, otherwise you want to change your aliyun oss identities.
```bash
~ ossih-config
~ ossih-config
? Input aliyun oss AccessKeyId: your_access_key_id
? Input aliyun oss AccessKeySecret: your_access_key_secret
? Choose a region:  your_regin
? Choose a bucket to save images:  your_bucket_name
? Choose image url output format:  url
config saved:
{
    "oss": {
        "accessKeyId": "your_access_key_id",
        "accessKeySecret": "your_access_key_secret",
        "region": "your_region",
        "bucket": "your_bucket_name"
    },
    "temp": "temp_dir",
    "output": "url"
}
```

2. upload  
Make sure you have taken screen shoot and save the image data to clipboard via a screenshoot tool, then run command
```bash
~ ossih-upload
Save clipboard content as image:  /your/tmp/folder/2019_1_16_2_7_13.png
Execute cmd: pngpaste /your/tmp/folder/2019_1_16_2_7_13.png
upload file /your/tmp/folder/2019_1_16_2_7_13.png aliyun oss
upload success
copy image url to clipboard success
```
The image url will replace the image data on clipboard, just paste it to wherever you like.
The output format will be url/markdown as you configured.

## License
MIT

