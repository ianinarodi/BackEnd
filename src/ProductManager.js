import fs from 'fs'

export default class ProductManager {
  static globalId = 0 // product code number global tracker
  constructor(filename) {
    this.products = [] // initialize empty array
    this.path = './files'
    this.filename = this.path + filename
  }

  // Class Methods

  addProduct = async (title, desc, price, thumbnail, code, stock) => {
   // If path is not created,do so
    await fs.promises.mkdir(this.path, { recursive: true })

   // Read file and put it in a class array
     await this.getProducts((res) => {
     this.products = res
    })
    // Write the file
    if (!(title, desc, price, thumbnail, code, stock)) {
      // check params do exist
      console.log('A parameter is missing')
    } else if (this.products.find((prod) => prod.code == code)) {
      console.log('Product with that ID already exists')
    } else {
      const prodId = ProductManager.globalId++ // Adding 1 to the code static variable
      this.products.push({
        // adding items to array
        title,
        desc,
        price,
        thumbnail,
        code,
        stock,
        prodId,
      })
      await fs.promises.writeFile(this.filename, JSON.stringify(this.products))
      console.log('Product added succesfully')
    }
  }

  getProducts = async () => {
      // Read the file and convert it to JS Object
      let result = await fs.promises.readFile(this.filename)
      let parsedRes = await JSON.parse(result)
      console.log('Reading file')
     console.log(parsedRes)
      return parsedRes
    }

  getProductById = async (id) => {
    let result = await fs.promises.readFile(this.filename)
    let parsedResponse = await JSON.parse(result)

    const filteredArray = parsedResponse.find(
      // Compare ID param against ID from products array
      (product) => product.prodId == id
    )
    return filteredArray ? filteredArray : ''
  }

  
  updateProductById = async (id, updatedData) => {
    let result = await fs.promises.readFile(this.filename)
    let parsedResponse = await JSON.parse(result)

    if (await this.getProductById(id)) {
      const newArray = parsedResponse.map((item) => {
        return id == item.prodId ? { ...item, ...updatedData } : item;
        console.log('Product updated succesfully');
      })
      await fs.promises.writeFile(this.filename, JSON.stringify(newArray))
    } else {
      console.log(`Product ID ${id} does not exist`)
    }
  }


  deleteProductById = async (id) => {
    let result = await fs.promises.readFile(this.filename)
    let parsedResponse = await JSON.parse(result)

    if (await this.getProductById(id)) {
      const newArray = parsedResponse.filter((item) => item.prodId !== id)
      await fs.promises.writeFile(this.filename, JSON.stringify(newArray))
      console.log('Product deleted succesfully')
    } else {
      console.log(`Product ID ${id} does not exist`)
    }
  }
}


