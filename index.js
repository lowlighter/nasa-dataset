//Dependancies
  const fs = require("fs")
  const fse = require("fs-extra")
  const sharp = require("sharp")
  const argv = require("minimist")(process.argv.slice(2), {alias:{s:"size", o:"overlap", r:"rotate"}, default:{size:256, overlap:0, rotate:true}})
  const progress = require("cli-progress")
  
//Generate images
  if (fs.existsSync("raw2")) {
    //Init
      let { size, overlap, rotate } = argv
      console.log(`size: ${size}x${size}\noverlap: ${overlap*100}%\nrotate: ${rotate}`)
      let bar = new progress.Bar({}, progress.Presets.shades_classic)

    //UUID generator
      const uuid = () => "xxxxxxxx".replace(/x/g, () => (Math.random()*16|0).toString(16))

    //Check if output directory exists
      if (!fs.existsSync("computed"))
        fs.mkdirSync("computed")

    //Clean output directory
      fse.emptyDirSync("computed")

    //Generate images
      let files = fs.readdirSync("raw2")
      console.log(`files: ${files.length}`)
      bar.start(files.length, 0)
      files.forEach(async file => {
        //Prepare image
          let image = sharp(`raw2/${file}`)
          let {width, height} = await image.metadata()

        //Generate sub-images
          for (let x = 0; x + size < width; x = Math.floor(x + size * (1 - overlap)))
            for (let y = 0; y + size < height; y = Math.floor(y + size * (1 - overlap))) {
              let output = `computed/${file.replace(/\.(.+?$)/, (m, a) => `-${uuid()}.${a}`)}`
              await image.extract({left:x, top:y, width:size, height:size}).jpeg({quality:100, chromaSubsampling:"4:4:4"}).toFile(output)
              //Rotations
                for (let r = 1; r < (rotate ? 4 : 1); r++)
                  await sharp(output).rotate(r*90).toFile(output.replace(/-[0-9a-f]+\.(.+?$)/, (m, a) => `-${uuid()}.${a}`))
            } 
              
        //Update bar
          bar.increment()
          if (bar.value === files.length)
            bar.stop()
      })
  }