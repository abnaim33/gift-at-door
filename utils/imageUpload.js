export const imageUpload = async (images) => {
    let imgArr = []
    for (const item of images) {
        const formData = new FormData()
        formData.append("file", item)
        // formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET)
        // formData.append("cloud_name", process.env.CLOUD_NAME)
        // const res = await fetch(process.env.CLOUD_API, {
        //     method: "POST",
        //     body: formData
        // })

        formData.append("upload_preset", "nextjs_ecommerce")
        formData.append("cloud_name", "dsuh9ww6d")

        console.log(images, 'before image upload')
        const res = await fetch("https://api.cloudinary.com/v1_1/dsuh9ww6d/upload", {
            method: "POST",
            body: formData
        })
        console.log(res, 'from image upload')
        const data = await res.json()

        imgArr.push({ public_id: data.public_id, url: data.secure_url })
    }
    return imgArr;
}