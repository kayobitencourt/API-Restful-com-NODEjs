const fs = require('fs');
//Modulo fs do node permite manipular arquivos
const path = require('path');
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file){
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),//Parametros de onde o arquivo esta
      path.resolve(uploadConfig.UPLOADS_FOLDER, file),//Para onde o arquivo ira
    )
      // a funcao de rename do fs ela permite renomear ou mover arquivo
    return file;
  }

  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try{
      await fs.promises.stat(filePath);
    } catch { 
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;